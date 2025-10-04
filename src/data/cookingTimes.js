/**
 * Таблица времени варки яиц (в секундах)
 * Зависит от: размера яйца и степени готовности
 */

/**
 * Время варки в секундах для разных комбинаций параметров
 * 
 * Структура:
 * - Первый уровень: степень готовности (soft, medium, hard)
 * - Второй уровень: размер яйца (C0, C1, C2)
 */
export const COOKING_TIMES = {
  // Всмятку (жидкий желток)
  soft: {
    C0: 270,  // 4.5 мин - очень крупные
    C1: 240,  // 4 мин - крупные
    C2: 210,  // 3.5 мин - средние
  },
  // В мешочек (густой желток)
  medium: {
    C0: 390,  // 6.5 мин - очень крупные
    C1: 360,  // 6 мин - крупные
    C2: 330,  // 5.5 мин - средние
  },
  // Вкрутую (твердый желток)
  hard: {
    C0: 600,  // 10 мин - очень крупные
    C1: 540,  // 9 мин - крупные
    C2: 480,  // 8 мин - средние
  },
};

/**
 * Время по умолчанию, если размер не выбран (в секундах)
 */
export const DEFAULT_COOKING_TIMES = {
  soft: 240,    // 4 мин
  medium: 360,  // 6 мин
  hard: 540,    // 9 мин
};

/**
 * Получить время варки яйца в секундах
 * @param {string} doneness - Степень готовности: 'soft', 'medium', 'hard'
 * @param {string} size - Размер яйца: 'C0', 'C1', 'C2', или null
 * @returns {number} Время варки в секундах
 */
export const getCookingTime = (doneness = 'soft', size = null) => {
  // Если размер указан, используем точное время
  if (size && COOKING_TIMES[doneness] && COOKING_TIMES[doneness][size]) {
    return COOKING_TIMES[doneness][size];
  }
  
  // Если размер не указан, используем время по умолчанию
  if (DEFAULT_COOKING_TIMES[doneness]) {
    return DEFAULT_COOKING_TIMES[doneness];
  }
  
  // Fallback на средние значения
  return 360; // 6 минут
};

/**
 * Получить человекочитаемое описание времени варки
 * @param {number} seconds - Время в секундах
 * @returns {string} Описание времени (например, "4 мин 30 сек")
 */
export const formatCookingTime = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  
  if (remainingSeconds === 0) {
    return `${minutes} мин`;
  }
  
  return `${minutes} мин ${remainingSeconds} сек`;
};

/**
 * Получить диапазон времени для отображения в UI
 * @param {string} doneness - Степень готовности
 * @param {string} size - Размер яйца (опционально)
 * @returns {string} Диапазон времени (например, "4 мин")
 */
export const getCookingTimeRange = (doneness, size = null) => {
  if (size && COOKING_TIMES[doneness] && COOKING_TIMES[doneness][size]) {
    const seconds = COOKING_TIMES[doneness][size];
    const minutes = seconds / 60;
    
    // Если целое количество минут
    if (minutes % 1 === 0) {
      return `${minutes} мин`;
    }
    
    // Если есть половина минуты
    return `${minutes} мин`;
  }
  
  // Для случаев без размера показываем общий диапазон
  const ranges = {
    soft: '3.5-4.5 мин',
    medium: '5.5-6.5 мин',
    hard: '8-10 мин',
  };
  
  return ranges[doneness] || '6 мин';
};

export default {
  COOKING_TIMES,
  DEFAULT_COOKING_TIMES,
  getCookingTime,
  formatCookingTime,
  getCookingTimeRange,
};

