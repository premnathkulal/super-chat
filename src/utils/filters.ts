export function sliceText(value: string, limit: number): string {
  let result = value.slice(0, limit);
  if (value.length > limit) {
    result += '...';
  }
  return result;
}
