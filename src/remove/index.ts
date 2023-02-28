type Key = string

type Keys = Array<Key>

type Object = {
  [key: string | number]: unknown
}

/**
 * Remove a key or multiple keys from object
 * @param object - An object
 * @param keys - A single key or an array of keys
 * @returns A new object without the given keys
 */
export default function remove<T extends Object>(object: T, keys: Key | Keys): T {
  if (typeof keys === 'string') {
    return withString(object, keys)
  }

  return withArray(object, keys)
}

function withString(object: Object, key: Key) {
  const regex = new RegExp(`"${key}":[^,}]+,?`, 'g')
  return withRegex(object, regex)
}

function withArray(object: Object, keys: Keys) {
  const regex = new RegExp(`"(${keys.join('|')})":[^,}]+,?`, 'g')
  return withRegex(object, regex)
}

function withRegex(object: Object, regex: RegExp) {
  const stringify = JSON.stringify(object).replace(regex, '')
  return JSON.parse(stringify)
}