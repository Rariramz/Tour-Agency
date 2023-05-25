import { ChangeEvent, memo, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import cls from './Select.module.scss';
import { classNames } from '../../lib/classNames/classNames';

export interface SelectOption {
  value: string | number;
  content: string | number;
}

interface SelectProps {
  className?: string;
  placeholder?: string;
  options: SelectOption[];
  value: string | number;
  onChange?: (value: string | number) => void;
  readonly?: boolean;
}

export const Select = memo((props: SelectProps) => {
  const { className, options, value, onChange, readonly, placeholder } = props;
  const { t } = useTranslation();

  const optionsList = useMemo(
    () =>
      options.map((opt) => (
        <option
          key={opt.value}
          className={cls.option}
          value={opt.value}
        >
          {opt.content}
        </option>
      )),
    [options]
  );

  const onChangeHandler = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      onChange?.(e.target.value);
    },
    [onChange]
  );

  return (
    <div className={classNames(cls.SelectWrapper, {}, [className ?? ''])}>
      <select
        onChange={onChangeHandler}
        className={cls.Select}
        value={value}
        disabled={readonly}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {optionsList}
      </select>
    </div>
  );
});
