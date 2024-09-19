import React from 'react';
import { cva } from 'class-variance-authority';

const buttonVariants = cva(
  'font-semibold py-2 px-4 rounded focus:outline-none',
  {
    variants: {
      variant: {
        primary: 'bg-yellow-400 text-white hover:bg-yellow-500',
        ghost: 'hover:bg-yellow-500',
      },
      size: {
        small: 'text-sm py-1 px-2',
        medium: 'text-base py-2 px-4',
        large: 'text-lg py-3 px-6',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'medium',
    },
  }
);

const Button = ({ variant, size, disabled, children, className, ...props }) => {
  return (
    <button
      className={buttonVariants({ variant, size, disabled,className})}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
