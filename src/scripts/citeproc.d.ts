declare module 'citeproc' {
  export type Item = Partial<import('csl-json').Data> & {
    id: string;
  };

  export type Bibliography = [
    params: Record<string, unknown>,
    entries: string[],
  ];

  export type Sys = {
    retrieveLocale: (lang: string) => string;
    retrieveItem: (id: string) => Item;
    variableWrapper?: (...args: unknown[]) => unknown;
    stringCompare?: (a: string, b: string) => number;
  };

  export class Engine {
    constructor(sys: Sys, style: string, lang?: string, forceLang?: boolean);
    setOutputFormat: (mode: string) => void;
    updateItems: (
      idList: string[],
      nosort?: boolean,
      rerunAmbigs?: boolean,
      implicitUpdate?: boolean,
    ) => void;
    makeBibliography: (
      bibsection?: Record<string, unknown>,
    ) => false | Bibliography;
  }

  const Citeproc: {
    Engine: typeof Engine;
  };

  export default Citeproc;
}
