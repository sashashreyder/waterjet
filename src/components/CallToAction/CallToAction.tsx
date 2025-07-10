
import styles from './CallToAction.module.css';

interface CallToActionProps {
  label: string;
  href?: string;
  onClick?: () => void;
  className?: string;
  type?: 'button' | 'submit';
}

const CallToAction = ({
  label,
  href,
  onClick,
  className = '',
  type = 'button',
}: CallToActionProps) => {
  const common = `inline-block text-white font-medium px-6 py-3 rounded-full shadow-lg transition duration-300 ${styles.buttonGlow} ${className}`;

  if (href) {
    return <a href={href} className={common}>{label}</a>;
  }

  return <button onClick={onClick} className={common} type={type}>{label}</button>;
};

export default CallToAction;