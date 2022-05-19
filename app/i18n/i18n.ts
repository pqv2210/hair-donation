import i18n from "i18n-js"
// import en from "./translations/en.json"
import vi from "./translations/vi.json"

i18n.fallbacks = true
i18n.translations = { vi }
// i18n.translations = { vi, en }

i18n.locale = "vi"

type DefaultLocale = typeof en
export type TxKeyPath = RecursiveKeyOf<DefaultLocale>

type RecursiveKeyOf<TObj extends Record<string, any>> = {
  [TKey in keyof TObj & string]: TObj[TKey] extends Record<string, any>
    ? `${TKey}` | `${TKey}.${RecursiveKeyOf<TObj[TKey]>}`
    : `${TKey}`
}[keyof TObj & string]
