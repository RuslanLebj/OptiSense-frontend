import dayjs from "dayjs";
import localeData from "dayjs/plugin/localeData"; // Подключаем плагин для работы с локалями
import localizedFormat from "dayjs/plugin/localizedFormat"; // Плагин для форматирования
import "dayjs/locale/ru"; // Подключаем русскую локализацию
import isoWeek from "dayjs/plugin/isoWeek"; // Плагин для ISO-недель

// Настройка плагинов и локали
dayjs.extend(localeData);
dayjs.extend(localizedFormat);
dayjs.locale("ru");
dayjs.extend(isoWeek);

export default dayjs;
