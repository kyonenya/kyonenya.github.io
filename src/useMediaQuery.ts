const mediaQuery = '(max-width: 559px)';

const mediaQueryList = window.matchMedia(mediaQuery);

export let isMobile = mediaQueryList.matches; // init

export function activateMediaQuery(invokeRoute: () => void): void {
  mediaQueryList.addListener((mql) => {
    isMobile = mql.matches;
    invokeRoute(); // re-render
    console.log(isMobile);
  });
}

console.log(isMobile);
