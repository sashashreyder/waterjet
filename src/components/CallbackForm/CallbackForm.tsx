import React, { useState } from "react";
import { db } from "../../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

// ===========================
// ФОРМАТИРОВАНИЕ ТЕЛЕФОНА
// ===========================
const formatPhoneForView = (value: string) => {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  const normalized = digits.startsWith("8") ? "7" + digits.slice(1) : digits;
  const with7 = normalized.startsWith("7") ? normalized : normalized ? "7" + normalized : "";
  let out = "+7";
  if (with7.length > 1) out += " (" + with7.slice(1, 4);
  if (with7.length > 4) out += ") " + with7.slice(4, 7);
  if (with7.length > 7) out += "-" + with7.slice(7, 9);
  if (with7.length > 9) out += "-" + with7.slice(9, 11);
  return out;
};

const toE164 = (viewValue: string) => {
  const digits = viewValue.replace(/\D/g, "");
  let d = digits.slice(0, 11);
  if (d.startsWith("8")) d = "7" + d.slice(1);
  if (!d.startsWith("7") && d.length > 0) d = "7" + d;
  return d ? `+${d.slice(0, 11)}` : "";
};

const isValidEmail = (email: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

// ===========================
// КОМПОНЕНТ ФОРМЫ
// ===========================
const CallbackForm: React.FC = () => {
  const [phoneView, setPhoneView] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] =
    useState<"idle" | "success" | "error">("idle");

  const [phoneError, setPhoneError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [nameError, setNameError] = useState("");

  // 👉 ТВОЙ ВЕБХУК ДЛЯ CRM BITRIX24
  const BITRIX_WEBHOOK =
    "https://inox.bitrix24.ru/rest/180/89lbbb6qk8namq6u/crm.lead.add.json";

  // ===========================
  // ОБРАБОТКА ВВОДА
  // ===========================
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneForView(e.target.value);
    setPhoneView(formatted);

    const onlyDigits = formatted.replace(/\D/g, "");
    setPhoneError(
      formatted && onlyDigits.length < 11
        ? "Введите полный номер телефона"
        : ""
    );
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value;
    setName(v);
    setNameError(v.trim() ? "" : "Введите ваше имя");
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value.trim();
    setEmail(v);
    setEmailError(v && !isValidEmail(v) ? "Введите корректный email" : "");
  };

  const resetForm = () => {
    setPhoneView("");
    setName("");
    setEmail("");
    setComment("");
    setPhoneError("");
    setEmailError("");
    setNameError("");
  };

  // ===========================
  // ОТПРАВКА В FIREBASE + BITRIX
  // ===========================
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Валидация перед отправкой
    if (!name.trim()) {
      setNameError("Введите ваше имя");
      return;
    }

    const digits = phoneView.replace(/\D/g, "");
    if (!digits || digits.length < 11) {
      setPhoneError("Введите полный номер телефона");
      return;
    }

    if (email && !isValidEmail(email)) {
      setEmailError("Введите корректный email");
      return;
    }

    setIsSubmitting(true);

    try {
      // ----------------------------
      // 1️⃣ Отправляем в Firestore
      // ----------------------------
      const phoneE164 = toE164(phoneView);

      await addDoc(collection(db, "requests"), {
        name: name.trim(),
        phone: phoneE164,
        phoneRaw: phoneView,
        email: email || "",
        message: comment || "",
        status: "new",
        submittedAt: serverTimestamp(),
      });

      // ----------------------------
      // 2️⃣ Отправляем в Bitrix24 CRM
      // ----------------------------
      await fetch(BITRIX_WEBHOOK, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fields: {
            TITLE: "Заявка на обратный звонок (React)",
            NAME: name.trim(),
            EMAIL: email || "",
            PHONE: [{ VALUE: phoneE164, VALUE_TYPE: "WORK" }],
            COMMENTS: comment || "",
          },
        }),
      });

      // ----------------------------
      // 3️⃣ Успешно
      // ----------------------------
      setSubmitStatus("success");
      resetForm();
      setTimeout(() => setSubmitStatus("idle"), 3000);
    } catch (err) {
      console.error(err);
      setSubmitStatus("error");
      setTimeout(() => setSubmitStatus("idle"), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  // ===========================
  // JSX
  // ===========================
  return (
    <div className="w-full">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Оставьте заявку</h2>
        <p className="text-slate-600 text-sm">Мы свяжемся с вами в ближайшее время</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Имя */}
        <div>
          <input
            type="text"
            required
            value={name}
            onChange={handleNameChange}
            placeholder="Ваше имя"
            className={`w-full px-4 py-3 border rounded-lg ${
              nameError ? "border-red-300" : "border-slate-200"
            }`}
          />
          {nameError && <p className="mt-1 text-red-500 text-sm">{nameError}</p>}
        </div>

        {/* Телефон */}
        <div>
          <input
            type="tel"
            required
            value={phoneView}
            onChange={handlePhoneChange}
            placeholder="+7 (___) ___-__-__"
            className={`w-full px-4 py-3 border rounded-lg ${
              phoneError ? "border-red-300" : "border-slate-200"
            }`}
          />
          {phoneError && (
            <p className="mt-1 text-red-500 text-sm">{phoneError}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="Email (необязательно)"
            className={`w-full px-4 py-3 border rounded-lg ${
              emailError ? "border-red-300" : "border-slate-200"
            }`}
          />
          {emailError && (
            <p className="mt-1 text-red-500 text-sm">{emailError}</p>
          )}
        </div>

        {/* Комментарий */}
        <div>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Сообщение (необязательно)"
            rows={3}
            className="w-full px-4 py-3 border border-slate-200 rounded-lg resize-none"
          />
        </div>

        {/* Кнопка */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-sky-600 text-white py-3 rounded-lg"
        >
          {isSubmitting ? "Отправляем..." : "Отправить заявку"}
        </button>
      </form>

      {/* Успешно */}
      {submitStatus === "success" && (
        <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-green-700 text-sm">
            Спасибо! Мы свяжемся с вами в ближайшее время.
          </p>
        </div>
      )}

      {/* Ошибка */}
      {submitStatus === "error" && (
        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-700 text-sm">Произошла ошибка. Попробуйте еще раз.</p>
        </div>
      )}
    </div>
  );
};

export default CallbackForm;



