type State = {
  id: number | undefined;
  tag: string | undefined;
  keyword: string | undefined;
};

export function toState(locationSearch: string, locationHash?: string): State {
  const searchParams = new URLSearchParams(locationSearch);
  const id = searchParams.get('id');
  const tag = searchParams.get('tag');

  return {
    id: id ? parseInt(id, 10) : undefined,
    tag: tag ?? undefined,
    keyword:
      locationHash !== undefined && locationHash !== ''
        ? decodeURIComponent(locationHash.slice(1))
        : undefined,
  };
}
