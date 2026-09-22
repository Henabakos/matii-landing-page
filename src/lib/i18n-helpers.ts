/**
 * Dynamic Content Localization Helpers
 * Provides utilities to extract localized fields with fallback to default locale (en).
 */

export type LocaleCode = "en" | "om" | "am" | "de" | "pl";

export interface LocalizedEntity {
  translations?: Record<string, Record<string, any>>;
  [key: string]: any;
}

/**
 * Returns the localized value of a given field on an entity.
 * If the translation for the current locale doesn't exist, it falls back to the default field on the entity.
 */
export function getLocalizedField<T extends LocalizedEntity>(
  entity: T | null | undefined,
  field: keyof T,
  locale: string,
  fallbackLocale: string = "en"
): any {
  if (!entity) return "";

  // 1. Check if entity has specific locale translation
  if (entity.translations && entity.translations[locale]) {
    const val = entity.translations[locale][field as string];
    if (val !== undefined && val !== null && val !== "") {
      return val;
    }
  }

  // 2. Check fallback locale translation if specified and not same as current
  if (fallbackLocale && fallbackLocale !== locale && entity.translations && entity.translations[fallbackLocale]) {
    const val = entity.translations[fallbackLocale][field as string];
    if (val !== undefined && val !== null && val !== "") {
      return val;
    }
  }

  // 3. Fallback to the root property of the entity
  const defaultVal = entity[field];
  return defaultVal !== undefined && defaultVal !== null ? defaultVal : "";
}

/**
 * Helper to translate dynamic array of items
 */
export function localizeEntities<T extends LocalizedEntity>(
  entities: T[],
  locale: string,
  fieldsToLocalize: (keyof T)[]
): T[] {
  if (!entities || !Array.isArray(entities)) return [];

  return entities.map((item) => {
    const localizedItem = { ...item };
    for (const field of fieldsToLocalize) {
      localizedItem[field] = getLocalizedField(item, field, locale);
    }
    return localizedItem;
  });
}
