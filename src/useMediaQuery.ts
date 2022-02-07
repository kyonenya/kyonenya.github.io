const mobileMediaQueryList = window.matchMedia('(max-width: 559px)');

export let isMobile = mobileMediaQueryList.matches; // init

export function watchMediaQuery(reRoute: () => void): void {
  mobileMediaQueryList.addListener((mql) => {
    isMobile = mql.matches;
    reRoute();
  });
}
