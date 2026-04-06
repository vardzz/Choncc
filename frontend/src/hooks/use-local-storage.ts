export function useLocalStorage<T>(key: string, fallback: T): [T, (value: T) => void] {
  return [fallback, () => undefined];
}

