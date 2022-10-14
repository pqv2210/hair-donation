import { MMKV } from "react-native-mmkv"

const mmkvStorage = new MMKV()

/**
 * Loads a string from storage.
 *
 * @param key The key to fetch.
 */
export function loadString(key: string): string {
  try {
    return mmkvStorage.getString(key)
  } catch {
    return null
  }
}

/**
 * Saves a string to storage.
 *
 * @param key The key to fetch.
 * @param value The value to store.
 */
export function saveString(key: string, value: string): void {
  try {
    return mmkvStorage.set(key, value)
  } catch {}
}

/**
 * Loads something from storage and runs it thru JSON.parse.
 *
 * @param key The key to fetch.
 */
 export function loadObject(key: string): any {
  try {
    const almostThere = mmkvStorage.getString(key)
    return JSON.parse(almostThere)
  } catch {
    return null
  }
}

/**
 * Saves an object to storage.
 *
 * @param key The key to fetch.
 * @param value The value to store.
 */
export function saveObject(key: string, value: any): void {
  try {
    return mmkvStorage.set(key, JSON.stringify(value))
  } catch {}
}

/**
 * Removes something from storage.
 *
 * @param key The key to kill.
 */
export function removeKey(key: string): void {
  try {
    return mmkvStorage.delete(key)
  } catch {}
}

/**
 * Burn it all to the ground.
 */
export function clearStorage(): void {
  try {
    return mmkvStorage.clearAll()
  } catch {}
}
