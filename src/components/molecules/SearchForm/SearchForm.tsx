import { useState } from 'react';
import { TextInput } from '../../atoms/TextInput';
import { ToggleButton } from '../../atoms/ToggleButton';
import type { SearchFormProps } from './SearchForm.props';
import { searchFormStyles } from './SearchForm.styles';

export function SearchForm({ onSearch, inputRef, disabled }: SearchFormProps) {
  const [query, setQuery] = useState('');

  return (
    <form
      role="search"
      className={searchFormStyles.root}
      onSubmit={(e) => {
        e.preventDefault();
        onSearch(query);
      }}
    >
      <TextInput
        ref={inputRef}
        type="search"
        value={query}
        placeholder="Szukaj w Spotify..."
        autoComplete="off"
        aria-label="Szukaj w Spotify"
        disabled={disabled}
        onChange={(e) => setQuery(e.target.value)}
      />
      <ToggleButton type="submit" size="lg" disabled={disabled}>
        SZUKAJ
      </ToggleButton>
    </form>
  );
}
