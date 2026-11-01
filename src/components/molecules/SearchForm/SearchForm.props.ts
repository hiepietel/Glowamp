import type { Ref } from 'react';

export interface SearchFormProps {
  onSearch: (query: string) => void;
  /** Lets the field be focused from outside (L key, eject button). */
  inputRef?: Ref<HTMLInputElement>;
  disabled?: boolean;
}
