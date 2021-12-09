export const getItem = <T>(key: string) => {
  const data = window.localStorage.getItem(key)
  if (!data) return null
  try {
    return JSON.parse(data) as T // 指定一个泛型
  } catch (error) {
    return null
  }
}

export const setItem = (key: string, value: object | string | null) => {
  // typescript的object类型需要是小写的，大写不行,ts会报错
  if (typeof value === 'object') {
    value = JSON.stringify(value)
  }
  window.localStorage.setItem(key, value)
}

export const removeItem = (key: string) => {
  window.localStorage.removeItem(key)
}
