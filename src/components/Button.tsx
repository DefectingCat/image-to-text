import clsx from 'clsx';
import { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from 'react';

type ButtonProps = {
  children?: ReactNode;
} & DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;

const Button = ({ children, className, ...rest }: ButtonProps) => {
  return (
    <>
      <button
        className={clsx(
          'bg-white border border-transparent hover:border-gray-200',
          'outline-none hover:bg-gray-50 focus:ring-4 dark:border-transparent',
          'focus:ring-cyan-200 font-medium rounded-lg text-sm',
          'px-5 py-2.5 dark:bg-gray-800 dark:text-white ',
          'dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:ring-cyan-800',
          'transition-all disabled:hover:bg-gray-200',
          'disabled:cursor-not-allowed disabled:dark:hover:bg-gray-700',
          'disabled:hover:border-transparent',
          'text-lg disabled:bg-gray-200 disabled:text-gray-500',
          'dark:disabled:bg-gray-700 dark:disabled:text-gray-300',
          'disabled:dark:hover:border-transparent',
          className
        )}
        {...rest}
      >
        {children}
      </button>
    </>
  );
};

export default Button;
