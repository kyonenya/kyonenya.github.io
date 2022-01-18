export async function fetcher<T>(url: string): Promise<T> {
  const response = await fetch(url);
  if (!response.ok) throw new Error(response.statusText);
  return (await response.json()) as T;
}

export function toClassName(...classes: (string | false | undefined)[]): string {
  return classes.map((c) => (typeof c === 'string' ? c : '')).join(' ');
}
