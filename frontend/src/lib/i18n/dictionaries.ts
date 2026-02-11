import "server-only";
import type { Locale } from "./config";

const dictionaries = {
  es: () => import("./locales/es.json").then((module) => module.default),
  en: () => import("./locales/en.json").then((module) => module.default),
};

export const getDictionary = async (locale: Locale) => {
  return dictionaries[locale]();
};
