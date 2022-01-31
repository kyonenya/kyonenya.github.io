export async function fetcher<T>(url: string): Promise<T> {
  const response = await fetch(url);
  if (!response.ok) throw new Error(response.statusText);
  return (await response.json()) as T;
}

export function isDevelopment(locationHref: string): boolean {
  return /localhost:\d+/.test(locationHref);
}
