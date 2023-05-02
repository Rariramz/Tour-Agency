import { ReactNode, memo } from 'react';
import cls from './Heading.module.scss';
import { classNames } from '../../lib/classNames/classNames';

export enum HeadingVariant {
    H1 = 'h1',
    H2 = 'h2',
    H3 = 'h3',
}

export enum HeadingAlign {
    RIGHT = 'right',
    LEFT = 'left',
    CENTER = 'center',
}

interface HeadingProps {
    className?: string;
    children?: ReactNode;
    align?: HeadingAlign;
    variant?: HeadingVariant;
}

export const Heading = memo((props: HeadingProps) => {
    const {
        className,
        align = HeadingAlign.LEFT,
        variant = HeadingVariant.H2,
        children,
    } = props;
    return (
        <p className={classNames(cls.Heading, { }, [className ?? '', cls[align]])}>
            {children}
        </p>
    );
});