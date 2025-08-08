import React, { useState } from 'react';

// Phone number formatting function
const formatPhoneNumber = (value: string) => {
  // Remove all non-digits
  const phoneNumber = value.replace(/\D/g, '');
  
  // If empty, return empty
  if (!phoneNumber) return '';
  
  // If it starts with 8, replace with 7
  let formatted = phoneNumber;
  if (formatted.startsWith('8')) {
    formatted = '7' + formatted.slice(1);
  }
  
  // Add +7 prefix if not present
  if (!formatted.startsWith('7')) {
    formatted = '7' + formatted;
  }
  
  // Format with dashes: +7 (XXX) XXX-XX-XX
  let result = '+7';
  
  if (formatted.length > 1) {
    result += ' (' + formatted.slice(1, 4);
  }
  if (formatted.length > 4) {
    result += ') ' + formatted.slice(4, 7);
  }
  if (formatted.length > 7) {
    result += '-' + formatted.slice(7, 9);
  }
  if (formatted.length > 9) {
    result += '-' + formatted.slice(9, 11);
  }
  
  return result;
};

// Email validation function
const isValidEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const CallbackForm = () => {
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [phoneError, setPhoneError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [nameError, setNameError] = useState('');

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const formatted = formatPhoneNumber(value);
    setPhone(formatted);
    
    // Validate phone number (should be +7 (XXX) XXX-XX-XX format)
    const digitsOnly = formatted.replace(/\D/g, '');
    if (formatted.length > 0 && digitsOnly.length < 11) {
      setPhoneError('Введите полный номер телефона');
    } else {
      setPhoneError('');
    }
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setName(value);
    
    // Validate name (should not be empty)
    if (value.trim().length === 0) {
      setNameError('Введите ваше имя');
    } else {
      setNameError('');
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    
    // Validate email if not empty
    if (value && !isValidEmail(value)) {
      setEmailError('Введите корректный email');
    } else {
      setEmailError('');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!name.trim()) {
      setNameError('Введите ваше имя');
      return;
    }
    
    const phoneDigits = phone.replace(/\D/g, '');
    if (!phone || phoneDigits.length < 11) {
      setPhoneError('Введите полный номер телефона');
      return;
    }
    
    if (email && !isValidEmail(email)) {
      setEmailError('Введите корректный email');
      return;
    }
    
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Save to localStorage for now
      const submissions = JSON.parse(localStorage.getItem('contactSubmissions') || '[]');
      const newSubmission = {
        id: Date.now(),
        name: name || 'Не указано',
        phone,
        email: email || '',
        message: message || '',
        source: 'contact',
        submittedAt: new Date().toISOString(),
      };
      
      submissions.push(newSubmission);
      localStorage.setItem('contactSubmissions', JSON.stringify(submissions));
      
      setSubmitStatus('success');
      setPhone('');
      setName('');
      setEmail('');
      setMessage('');
      setPhoneError('');
      setEmailError('');
      setNameError('');
      setTimeout(() => setSubmitStatus('idle'), 3000);
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus('idle'), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-slate-800 mb-2">
          Оставьте заявку
        </h2>
        <p className="text-slate-600 text-sm">
          Мы свяжемся с вами в ближайшее время
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="text"
            required
            value={name}
            onChange={handleNameChange}
            placeholder="Ваше имя"
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all duration-200 ${
              nameError ? 'border-red-300 focus:ring-red-500' : 'border-slate-200'
            }`}
          />
          {nameError && (
            <p className="mt-1 text-red-500 text-sm">{nameError}</p>
          )}
        </div>

        <div>
          <input
            type="tel"
            required
            value={phone}
            onChange={handlePhoneChange}
            placeholder="+7 (___) ___-__-__"
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all duration-200 ${
              phoneError ? 'border-red-300 focus:ring-red-500' : 'border-slate-200'
            }`}
          />
          {phoneError && (
            <p className="mt-1 text-red-500 text-sm">{phoneError}</p>
          )}
        </div>

        <div>
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="Email (необязательно)"
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all duration-200 ${
              emailError ? 'border-red-300 focus:ring-red-500' : 'border-slate-200'
            }`}
          />
          {emailError && (
            <p className="mt-1 text-red-500 text-sm">{emailError}</p>
          )}
        </div>

        <div>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
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

      {submitStatus === 'success' && (
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

      {submitStatus === 'error' && (
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
