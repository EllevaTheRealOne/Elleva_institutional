export interface IAllLangs {
  label: string;
  value: string;
  icon: string;
  currency: string;
  symbol: string;
  valueWhithCurrrency: string;
  nativeLabel?: string;
  shortLabel?: string;
}

export interface TranslationDictionary {
  [key: string]: string | TranslationDictionary;
}
