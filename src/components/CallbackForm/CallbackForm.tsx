import React, { useState } from 'react';
import CallToAction from '../CallToAction/CallToAction';
import { submitContactForm } from '../../../lib/sanity';
import styles from './CallbackForm.module.css';

const CallbackForm = () => {
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      await submitContactForm({
        name: name || 'Не указано',
        phone,
        source: 'contact',
      });
      
      setSubmitStatus('success');
      setPhone('');
      setName('');
      setTimeout(() => setSubmitStatus('idle'), 3000);
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus('idle'), 3000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="callback" className={styles.section}>
      <div className={styles.wrapper} data-aos="fade-up">
        <h2 className={styles.heading}>Оставьте номер — мы перезвоним!</h2>
        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ваше имя"
            className={styles.input}
          />
          <input
            type="tel"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+7 (___) ___-__-__"
            className={styles.input}
          />
          <CallToAction 
            label={isSubmitting ? "Отправляем..." : "Перезвоните мне"} 
            className={styles.button}
            type="submit"
          />
        </form>
        
        {submitStatus === 'success' && (
          <div className="mt-4 p-3 bg-green-100 text-green-700 rounded-lg text-center">
            Спасибо! Мы свяжемся с вами в ближайшее время.
          </div>
        )}
        
        {submitStatus === 'error' && (
          <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-lg text-center">
            Произошла ошибка. Попробуйте еще раз.
          </div>
        )}
      </div>
    </section>
  );
};

export default CallbackForm;
