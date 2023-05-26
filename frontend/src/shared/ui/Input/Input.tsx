import React, {
  InputHTMLAttributes,
  memo,
  useEffect,
  useMemo,
  useRef,
  useState
} from 'react';
import { classNames, Mods } from '../../lib/classNames/classNames';
import CrossIcon from '../../assets/cross.svg';
import { Row, RowAlign } from '../Row/Row';
import cls from './Input.module.scss';

type HTMLInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'value' | 'onChange' | 'readOnly'
>;

interface InputProps extends HTMLInputProps {
  className?: string;
  value: string | number;
  onChange?: (value: string) => void;
  reset?: () => void;
  autofocus?: boolean;
  readonly?: boolean;
  error?: boolean;
}

export const Input = memo((props: InputProps) => {
  const {
    className,
    value,
    onChange,
    reset,
    type = 'text',
    autofocus,
    readonly,
    error,
    ...otherProps
  } = props;

  const ref = useRef<HTMLInputElement>(null);
  const [isFocused, setIsFocused] = useState(false);

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value);
  };

  useEffect(() => {
    if (autofocus) {
      setIsFocused(true);
      ref.current?.focus();
    }
  }, [autofocus]);

  const mods = useMemo(() => ({ [cls.readonly]: readonly, [cls.error]: error }), [readonly, error]);

  return (
    <Row className={classNames(cls.InputWrapper, mods, [className ?? ''])} align={RowAlign.BETWEEN}>
      <input
        className={cls.Input}
        ref={ref}
        value={value}
        onChange={onChangeHandler}
        type={type}
        readOnly={readonly}
        {...otherProps}
      />
      {value && <CrossIcon onClick={reset} />}
    </Row>
  );
});
