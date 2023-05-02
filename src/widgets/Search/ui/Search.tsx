import { memo, useState } from 'react';
import { classNames } from '../../../shared/lib/classNames/classNames';
import { SearchIcon } from '../assets/SearchIcon';
import { Input } from '../../../shared/ui/Input/Input';
import cls from './Search.module.scss';

interface SearchProps {
  className?: string;
  onSubmit: (value: string) => void;
}

const Search = memo(({ className, onSubmit }: SearchProps) => {
  const [value, setValue] = useState<string>('');

  return (
    <div
      className={classNames(
        cls.Search,
        { },
        [className ?? '']
      )}
    >
      <SearchIcon onClick={() => onSubmit(value)} />
      <Input placeholder='Festival Yuki Matsuri is coming...' className={cls.searchInput} value={value} onChange={(value) => setValue(value)} />
    </div>
  );
});

Search.displayName = 'Search';

export { Search };
