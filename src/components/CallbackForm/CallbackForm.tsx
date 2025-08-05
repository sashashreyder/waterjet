import React, { useState } from 'react';
import CallToAction from '../CallToAction/CallToAction';
import styles from './CallbackForm.module.css';


const CallbackForm = () => {
  const [phone, setPhone] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Отправлен номер: ${phone}`);
    setPhone('');
  };

  return (
    <section id="callback" className={styles.section}>
      <div className={styles.wrapper} data-aos="fade-up">
        <h2 className={styles.heading}>Оставьте номер — мы перезвоним!</h2>
        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            type="tel"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+7 (___) ___-__-__"
            className={styles.input}
          />
          <CallToAction label="Перезвоните мне" className={styles.button} />
        </form>
      </div>
    </section>
  );
};

export default CallbackForm;
