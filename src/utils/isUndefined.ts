export function isNotUndefined<T extends {}>(value: T | undefined): value is T {
  if (value === undefined || value === null) {
    return false;
  }
  return true;
}
