import { ReactNode, memo } from 'react';
import cls from './Paragraph.module.scss';
import { classNames } from '../../lib/classNames/classNames';

export enum ParagraphAlign {
    RIGHT = 'right',
    LEFT = 'left',
    CENTER = 'center',
}

interface ParagraphProps {
    className?: string;
    children?: ReactNode;
    align?: ParagraphAlign;
}

export const Paragraph = memo((props: ParagraphProps) => {
    const {
        className,
        align = ParagraphAlign.LEFT,
        children,
    } = props;
    return (
        <p className={classNames(cls.Paragraph, { }, [className ?? '', cls[align]])}>
            {children}
        </p>
    );
});