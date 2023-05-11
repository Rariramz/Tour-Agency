import { memo, useState } from 'react';
import { classNames } from '../../../../shared/lib/classNames/classNames';
import SearchIcon from '../../../../shared/assets/search.svg';
import { Input } from '../../../../shared/ui/Input/Input';
import cls from './Search.module.scss';

interface SearchProps {
  className?: string;
  value: string;
  onChange: (value: string) => void;
  onSubmit?: (value: string) => void;
}

const Search = memo(({ className, value, onChange, onSubmit }: SearchProps) => {
  return (
    <div className={classNames(cls.Search, {}, [className ?? ''])}>
      {onSubmit && <SearchIcon onClick={() => onSubmit(value)} />}
      <Input
        placeholder='Throne Beach Resort & SPA...'
        className={cls.searchInput}
        value={value}
        onChange={onChange}
      />
    </div>
  );
});

Search.displayName = 'Search';

export { Search };
