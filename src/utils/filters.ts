export function sliceText(value: string, limit: number): string {
  let result = value.slice(0, limit);
  if (value.length > limit) {
    result += '...';
  }
  return result;
}

export function timeDate(value: string, option: string): string {
  let result = '';
  if (option === 'time') {
    result = value.slice(16, 21);
  } else if (option === 'date') {
    result = value.slice(0, 15);
  }
  return result;
}
