type State = {
  id: number | undefined;
  tag: string | undefined;
  keyword: string | undefined;
};

export function toState(
  locationSearch: string,
  locationPathname: string,
  locationHash?: string
): State {
  const searchParams = new URLSearchParams(locationSearch);
  const id = searchParams.get('id');
  const id2 = locationPathname.match(/\/posts\/(\d+)/)?.[1];
  const tag = searchParams.get('tag');

  return {
    id: id ? parseInt(id, 10) : id2 ? parseInt(id2, 10) : undefined,
    tag: tag ?? undefined,
    keyword:
      locationHash === undefined || locationHash === ''
        ? undefined
        : decodeURIComponent(locationHash.replace('#', '')),
  };
}
