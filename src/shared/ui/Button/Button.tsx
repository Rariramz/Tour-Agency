import { ButtonHTMLAttributes, FC, memo, ReactNode } from 'react';
import cls from './Button.module.scss';
import { classNames, Mods } from '../../../shared/lib/classNames/classNames';

export enum ButtonTheme {
    TEXT = 'text',
    OUTLINE = 'outline',
    CONTAIN = 'contain',
}

export enum ButtonSize {
    M = 'size_m',
    L = 'size_l',
    XL = 'size_xl',
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
    theme?: ButtonTheme;
    square?: boolean;
    size?: ButtonSize;
    disabled?: boolean;
    children?: ReactNode;
}

const Button = memo((props: ButtonProps) => {
    const {
        className,
        children,
        theme = ButtonTheme.OUTLINE,
        square,
        disabled,
        size = ButtonSize.M,
        ...otherProps
    } = props;

    const mods: Mods = {
        [cls.square]: square,
        [cls.disabled]: disabled,
    };

  return (
    <button
        type="button"
        disabled={disabled}
        className={classNames(cls.Button, mods, [className ?? '', cls[theme], cls[size]])}
        {...otherProps}
    >
        {children}
    </button>
  );
});

Button.displayName = 'Button';

export { Button };
