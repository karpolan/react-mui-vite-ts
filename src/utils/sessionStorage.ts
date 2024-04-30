import { IS_SERVER } from "./environment";

type StorageValue = string | number | boolean | object | bigint;

/**
 * Smartly reads value from sessionStorage
 */
export function sessionStorageGet(
  name: string,
  defaultValue: unknown = "",
): StorageValue {
  if (IS_SERVER) {
    return defaultValue as StorageValue; // We don't have access to sessionStorage on the server
  }

  const valueFromStore = sessionStorage.getItem(name);
  if (valueFromStore === null) return defaultValue as StorageValue; // No value in store, return default one

  try {
    const jsonParsed = JSON.parse(valueFromStore);
    if (
      ["string", "number", "boolean", "boolean", "bigint", "object"].includes(
        typeof jsonParsed,
      )
    ) {
      return jsonParsed; // We successfully parse JS value from the store
    }
  } catch (error) {
    // Do nothing, we will return string value as it is
  }

  return valueFromStore; // Return string value as it is
}

/**
 * Smartly writes value into sessionStorage
 */
export function sessionStorageSet(name: string, value: unknown) {
  if (IS_SERVER) {
    return; // Do nothing on server side
  }
  if (typeof value === "undefined") {
    return; // Do not store undefined values
  }
  let valueAsString: string;
  if (typeof value === "object") {
    valueAsString = JSON.stringify(value);
  } else {
    valueAsString = String(value);
  }

  sessionStorage.setItem(name, valueAsString);
}

/**
 * Deletes value by name from sessionStorage, if specified name is empty entire sessionStorage is cleared.
 */
export function sessionStorageDelete(name: string) {
  if (IS_SERVER) {
    return; // Do nothing on server side
  }
  if (name) {
    sessionStorage.removeItem(name);
  } else {
    sessionStorage.clear();
  }
}
