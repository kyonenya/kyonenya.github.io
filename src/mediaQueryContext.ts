const mobileMediaQueryList = window.matchMedia('(max-width: 559px)');

let isMobile = mobileMediaQueryList.matches;

export function mediaQueryContextProvider(reroute: () => void): void {
  mobileMediaQueryList.addListener((mobileMediaQueryList) => {
    isMobile = mobileMediaQueryList.matches;
    reroute();
  });
}

export function useMediaQueryContext(): { isMobile: boolean } {
  return { isMobile };
}
