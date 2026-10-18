type State = {
  id: number | null;
  tag: string | null;
  keyword: string | null;
};

export function toState(
  locationSearch: string,
  locationPathname: string,
  locationHash?: string,
): State {
  const idStr = /\/posts\/(\d+)/.exec(locationPathname)?.[1];
  const id = idStr ? Number(idStr) : null;

  const searchParams = new URLSearchParams(locationSearch);
  const tag = searchParams.get('tag');

  const keyword =
    locationHash === undefined || locationHash === ''
      ? null
      : decodeURIComponent(locationHash.replace('#', ''));

  return {
    id,
    tag,
    keyword,
  };
}
