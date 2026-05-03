type State = {
  id: number | undefined;
  legacyId: number | undefined;
  tag: string | undefined;
  keyword: string | undefined;
};

export function toState(
  locationSearch: string,
  locationPathname: string,
  locationHash?: string
): State {
  const idStr = /\/posts\/(\d+)/.exec(locationPathname)?.[1];
  const id = idStr ? Number(idStr) : undefined;

  const searchParams = new URLSearchParams(locationSearch);
  const tag = searchParams.get('tag');
  const legacyIdStr = searchParams.get('id');
  const legacyId =
    legacyIdStr && /^\d+$/.test(legacyIdStr) ? Number(legacyIdStr) : undefined;

  return {
    id: id ?? legacyId,
    legacyId,
    tag: tag ?? undefined,
    keyword:
      locationHash === undefined || locationHash === ''
        ? undefined
        : decodeURIComponent(locationHash.replace('#', '')),
  };
}
