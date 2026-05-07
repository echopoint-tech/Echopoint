import React from 'react';
import Link from 'next/link';
import styles from './Button.module.css';

interface ButtonProps {
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  className?: string;
  title?: string;
  type?: 'button' | 'submit' | 'reset';
  fullWidth?: boolean;
  disabled?: boolean;
  isLoading?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  href,
  onClick,
  children,
  variant = 'primary',
  className = '',
  title,
  type = 'button',
  fullWidth = false,
  disabled = false,
  isLoading = false,
}) => {
  const combinedClasses = `
    ${styles.btn} 
    ${variant === 'primary' ? styles.btnPrimary : styles.btnSecondary} 
    ${fullWidth ? styles.fullWidth : ''} 
    ${isLoading ? styles.loading : ''}
    ${className}
  `.trim();

  if (href) {
    return (
      <Link href={href} className={combinedClasses} title={title}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={combinedClasses} title={title} disabled={disabled || isLoading}>
      {isLoading ? (
        <span className={styles.spinner}></span>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
