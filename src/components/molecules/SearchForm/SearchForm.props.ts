import type { Ref } from 'react';

export interface SearchFormProps {
  onSearch: (query: string) => void;
  /** Pozwala ustawić kursor w polu z zewnątrz (klawisz L, przycisk eject). */
  inputRef?: Ref<HTMLInputElement>;
  disabled?: boolean;
}
