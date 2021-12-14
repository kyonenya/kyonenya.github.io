const tagged =
  (modifier: (s: string) => string) =>
  (strings: TemplateStringsArray, ...placeholders: unknown[]) =>
    strings.reduce(
      (acc, string, i) => acc + placeholders[i - 1] + modifier(string)
    );

export const html = tagged((s: string) => s.replaceAll(/\n\s+/g, '\n'));

export const css = tagged((s: string) => s.replaceAll(/\n\s+/g, '\n'));
