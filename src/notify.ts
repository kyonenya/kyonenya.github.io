import dayjs from 'dayjs';
import 'dayjs/locale/ja';

// modified at
const dateStr = '2021-11-22';

export const notifyUpdate = (): void => {
  const limitDate = dayjs(dateStr).add(1, 'month');
  if (dayjs().isAfter(limitDate)) {
    return;
  }

  const aboutElement = document.getElementById('about')!;
  aboutElement.addEventListener('click', () => {
    localStorage.setItem(dateStr, 'true');
  });
  if (localStorage.getItem(dateStr) !== 'true') {
    aboutElement.classList.add('el_badge');
  }
};
