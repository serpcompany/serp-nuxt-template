export function isNonNullable<T>(v: T | null | undefined): v is T {
  return v !== null && v !== undefined;
}

export function isTruthy<T>(v: T | '' | 0 | null | undefined): v is T {
  return Boolean(v);
}

export function toUrl(str: string | URL): URL | null {
  try {
    return new URL(str);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (e) {
    return null;
  }
}

export function toDate(str: string | Date): Date | null {
  try {
    return new Date(str);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (e) {
    return null;
  }
}

export type WithOptional<T, K extends keyof T> = Omit<T, K> &
  Partial<Pick<T, K>>;

export type WithRequired<T, K extends keyof T> = T & Required<Pick<T, K>>;

export type WithNonNullable<T, K extends keyof T> = T &
  Record<K, NonNullable<T[K]>>;

export function hasProps<T extends object, K extends keyof T>(
  obj: T,
  props: K[],
): obj is WithRequired<T, K> {
  return props.every((p) => p in obj);
}

export function mapBy<T, G>(
  array: T[],
  getGroup: (item: T) => G,
  map = new Map<G, T[]>(),
): Map<G, T[]> {
  return array.reduce((mapped, item) => {
    const group = getGroup(item);
    const grouped = mapped.get(group) || [];
    grouped.push(item);
    return mapped.set(group, grouped);
  }, map);
}

export function capitalize(str: string): string {
  return str
    .split(' ')
    .map(
      (word) =>
        `${word.slice(0, 1).toUpperCase()}${word.slice(1).toLowerCase()}`,
    )
    .join(' ');
}
