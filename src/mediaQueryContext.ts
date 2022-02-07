const mobileMediaQueryList = window.matchMedia('(max-width: 559px)');

let isMobile = mobileMediaQueryList.matches; // init

export function mediaQueryContextProvider(reRoute: () => void): void {
  mobileMediaQueryList.addListener((mobileMediaQueryList) => {
    isMobile = mobileMediaQueryList.matches;
    reRoute();
  });
}

export function useMediaQueryContext(): { isMobile: boolean } {
  return { isMobile };
}
