import type { Locale } from "./types";

type TranslationValue = string | Record<string, unknown>;
type Translations = Record<string, TranslationValue>;

let translations: Record<Locale, Translations> = {
  en: {},
  cz: {},
};

export async function loadTranslations(): Promise<void> {
  const [en, cz] = await Promise.all([
    import("@i18n/en.json"),
    import("@i18n/cz.json"),
  ]);
  translations = {
    en: en.default as Translations,
    cz: cz.default as Translations,
  };
}

export function t(locale: Locale, key: string): string {
  const keys = key.split(".");
  let value: unknown = translations[locale];

  for (const k of keys) {
    if (value && typeof value === "object" && k in value) {
      value = (value as Record<string, unknown>)[k];
    } else {
      return key;
    }
  }

  return typeof value === "string" ? value : key;
}

export function getLocaleFromPath(pathname: string): Locale {
  if (pathname.startsWith("/cz")) return "cz";
  return "en";
}

export function getLocalizedPath(path: string, locale: Locale): string {
  if (locale === "cz") {
    return `/cz${path === "/" ? "" : path}`;
  }
  return path;
}

export function getAlternateLocale(locale: Locale): Locale {
  return locale === "en" ? "cz" : "en";
}
