import dayjs from 'dayjs';
import arraySupport from 'dayjs/plugin/arraySupport';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/ja';

dayjs.extend(arraySupport);
dayjs.extend(relativeTime);
dayjs.locale('ja');

export default dayjs;
