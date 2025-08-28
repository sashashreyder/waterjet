// src/components/CallbackForm.tsx
import React, { useState } from "react";
import { db } from "../../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

// Маска отображения: +7 (XXX) XXX-XX-XX
const formatPhoneForView = (value: string) => {
  const digits = value.replace(/\D/g, "");

  // заменяем ведущую 8 на 7
  const normalized = digits.startsWith("8") ? "7" + digits.slice(1) : digits;

  // добавляем 7, если номер начинается не с 7
  const with7 = normalized.startsWith("7") ? normalized : (normalized ? "7" + normalized : "");

  let out = "+7";
  if (with7.length > 1) out += " (" + with7.slice(1, 4);
  if (with7.length > 4) out += ") " + with7.slice(4, 7);
  if (with7.length > 7) out += "-" + with7.slice(7, 9);
  if (with7.length > 9) out += "-" + with7.slice(9, 11);
  return out;
};

// Нормализация для БД: E.164  -> +7XXXXXXXXXX (11 цифр)
const toE164 = (viewValue: string) => {
  const digits = viewValue.replace(/\D/g, "");
  // приводим к 7xxxxxxxxxx
  let d = digits;
  if (d.startsWith("8")) d = "7" + d.slice(1);
  if (!d.startsWith("7") && d.length > 0) d = "7" + d;
  // итог: +7XXXXXXXXXX, берём только первые 11 цифр (если вдруг лишние)
  return d ? `+${d.slice(0, 11)}` : "";
};

const isValidEmail = (email: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const CallbackForm: React.FC = () => {
  const [phoneView, setPhoneView] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [comment, setComment] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">(
    "idle"
  );

  const [phoneError, setPhoneError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [nameError, setNameError] = useState("");

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneForView(e.target.value);
    setPhoneView(formatted);

    const onlyDigits = formatted.replace(/\D/g, "");
    // ожидаем 11 цифр (7 + 10 цифр)
    if (formatted && onlyDigits.length < 11) {
      setPhoneError("Введите полный номер телефона");
    } else {
      setPhoneError("");
    }
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // базовая валидация
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
    setSubmitStatus("idle");

    try {
      const phoneE164 = toE164(phoneView);

      await addDoc(collection(db, "requests"), {
        name: name.trim(),
        phoneRaw: phoneView,      // как ввёл пользователь (для удобства)
        phoneE164,                // нормализованный для поиска/звонка
        email: email || "",
        comment: comment || "",
        source: "contact",
        status: "new",            // можно менять потом на "in_progress" / "done"
        createdAt: serverTimestamp(),
      });

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

  return (
    <div className="w-full">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Оставьте заявку</h2>
        <p className="text-slate-600 text-sm">Мы свяжемся с вами в ближайшее время</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name */}
        <div>
          <input
            type="text"
            required
            value={name}
            onChange={handleNameChange}
            placeholder="Ваше имя"
            autoComplete="name"
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all duration-200 ${
              nameError ? "border-red-300 focus:ring-red-500" : "border-slate-200"
            }`}
          />
          {nameError && <p className="mt-1 text-red-500 text-sm">{nameError}</p>}
        </div>

        {/* Phone */}
        <div>
          <input
            type="tel"
            required
            value={phoneView}
            onChange={handlePhoneChange}
            placeholder="+7 (___) ___-__-__"
            autoComplete="tel"
            inputMode="tel"
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all duration-200 ${
              phoneError ? "border-red-300 focus:ring-red-500" : "border-slate-200"
            }`}
          />
          {phoneError && <p className="mt-1 text-red-500 text-sm">{phoneError}</p>}
        </div>

        {/* Email (optional) */}
        <div>
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="Email (необязательно)"
            autoComplete="email"
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all duration-200 ${
              emailError ? "border-red-300 focus:ring-red-500" : "border-slate-200"
            }`}
          />
          {emailError && <p className="mt-1 text-red-500 text-sm">{emailError}</p>}
        </div>

        {/* Comment (optional) */}
        <div>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Сообщение (необязательно)"
            rows={3}
            className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all duration-200 resize-none"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-sky-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-sky-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
        >
          {isSubmitting ? "Отправляем..." : "Отправить заявку"}
        </button>
      </form>

      {submitStatus === "success" && (
        <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-center">
            <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center mr-3">
              <span className="text-white text-xs">✓</span>
            </div>
            <p className="text-green-700 text-sm font-medium">
              Спасибо! Мы свяжемся с вами в ближайшее время.
            </p>
          </div>
        </div>
      )}

      {submitStatus === "error" && (
        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-center">
            <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center mr-3">
              <span className="text-white text-xs">✕</span>
            </div>
            <p className="text-red-700 text-sm font-medium">
              Произошла ошибка. Попробуйте еще раз.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CallbackForm;

