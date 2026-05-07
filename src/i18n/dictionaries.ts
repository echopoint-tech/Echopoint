import { ES } from './es';
import { EN } from './en';
import { FR } from './fr';
import { PT } from './pt';

export const dictionaries = { ES, EN, FR, PT };

export type Dictionary = typeof ES;
export type DictionaryKey = keyof typeof dictionaries;

export const getDictionary = (lang: string): Dictionary => {
  const upper = lang.toUpperCase() as DictionaryKey;
  return dictionaries[upper] || dictionaries.ES;
};
