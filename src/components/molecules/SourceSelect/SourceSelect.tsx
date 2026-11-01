import { SOURCE_LIKED, SOURCE_SEARCH, playlistValue } from '../../../hooks/useLibrary';
import { Select } from '../../atoms/Select';
import type { SourceSelectProps } from './SourceSelect.props';
import { sourceSelectStyles } from './SourceSelect.styles';

export function SourceSelect({ playlists, value, onChange, disabled }: SourceSelectProps) {
  return (
    <Select
      aria-label="Źródło"
      className={sourceSelectStyles.root}
      value={value}
      disabled={disabled}
      onChange={(e) => onChange(e.target.value)}
    >
      <option value={SOURCE_LIKED}>♥ Polubione utwory</option>
      <optgroup label="Moje playlisty">
        {playlists.map((p) => (
          <option key={p.id} value={playlistValue(p.id)}>
            {p.name}
          </option>
        ))}
      </optgroup>
      <option value={SOURCE_SEARCH}>» Wyniki wyszukiwania</option>
    </Select>
  );
}
