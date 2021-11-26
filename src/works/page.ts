import { Bibliography } from './bibliography';

const rootElement = <HTMLDivElement>document.getElementById('root');

const Work = (text: string): string => `<li>${text}</li>`;

const Works = (bibs: Bibliography[]): string => `
  <section class="ly_cont">
  <div class="bl_text">
    <h2>業績一覧</h2>
    <ol>
      ${bibs.map((bib) => Work(bib.text)).join('')}
    </ol>
  </div>
`;

export function render(bibs: Bibliography[]) {
  rootElement.innerHTML = Works(bibs);
}
