/**
 * Фирменные цвета приложения Egg Cooker
 * Централизованное управление цветовой схемой
 */

export const colors = {
  // Основные цвета
  primary: 'rgb(234 212 143)',        // Оранжевый - основной цвет приложения
  primaryLight: '#f8f8f8',   // Светлый оранжевый
  primaryDark: '#f8a220',    // Темный оранжевый
  
  // Вторичные цвета
  secondary: '#4CAF50',      // Зеленый - для успешных действий
  secondaryLight: '#81C784', // Светлый зеленый
  secondaryDark: '#388E3C',  // Темный зеленый
  
  // Акцентные цвета
  accent: '#FFC107',         // Желтый - для предупреждений
  accentLight: '#FFD54F',    // Светлый желтый
  accentDark: '#F57F17',     // Темный желтый
  
  // Нейтральные цвета
  white: '#FFFFFF',
  black: '#000000',
  
  // Серые оттенки
  gray50: '#FAFAFA',         // Очень светлый серый
  gray100: '#F5F5F5',        // Светлый серый (фон)
  gray200: '#EEEEEE',        // Светло-серый
  gray300: '#E0E0E0',        // Серый (границы)
  gray400: '#BDBDBD',        // Средне-серый
  gray500: '#9E9E9E',        // Серый
  gray600: '#757575',        // Темно-серый
  gray700: '#616161',        // Очень темно-серый
  gray800: '#424242',        // Почти черный
  gray900: '#212121',        // Черно-серый
  
  // Семантические цвета
  success: '#4CAF50',        // Успех
  warning: '#FF9800',        // Предупреждение
  error: '#F44336',          // Ошибка
  info: '#2196F3',           // Информация
  
  // Цвета для состояний яйца
  eggSoft: '#FFE0B2',        // Мягкое яйцо
  eggMedium: '#FFCC02',      // Среднее яйцо
  eggHard: '#FF8F00',        // Крутое яйцо
  
  // Цвета для таймера
  timerActive: '#FF6B35',    // Активный таймер
  timerPaused: '#9E9E9E',    // Приостановленный таймер
  timerFinished: '#f8a220',  // Завершенный таймер
  
  // Цвета для кнопок
  buttonPrimary: '#FF6B35',  // Основная кнопка
  buttonSecondary: '#FFFFFF', // Вторичная кнопка
  buttonDisabled: '#E0E0E0', // Отключенная кнопка
  
  // Цвета для текста
  textPrimary: '#212121',    // Основной текст
  textSecondary: '#757575',  // Вторичный текст
  textDisabled: '#BDBDBD',   // Отключенный текст
  textInverse: '#FFFFFF',    // Инверсный текст
  
  // Цвета для фона
  backgroundPrimary: '#FFFFFF',   // Основной фон
  backgroundSecondary: '#F5F5F5', // Вторичный фон
  backgroundOverlay: 'rgba(0, 0, 0, 0.5)', // Наложение
  
  // Цвета для границ
  borderLight: '#E0E0E0',    // Светлая граница
  borderMedium: '#BDBDBD',   // Средняя граница
  borderDark: '#757575',     // Темная граница
  
  // Цвета для теней
  shadowLight: 'rgba(0, 0, 0, 0.1)',  // Светлая тень
  shadowMedium: 'rgba(0, 0, 0, 0.2)', // Средняя тень
  shadowDark: 'rgba(0, 0, 0, 0.3)',   // Темная тень
};

/**
 * Градиенты для использования в приложении
 */
export const gradients = {
  primary: ['#FF6B35', '#FF8A65'],
  secondary: ['#4CAF50', '#81C784'],
  accent: ['#FFC107', '#FFD54F'],
  sunset: ['#FF6B35', '#FFC107'],
  ocean: ['#2196F3', '#4CAF50'],
};

/**
 * Темная тема (для будущего использования)
 */
export const darkColors = {
  ...colors,
  backgroundPrimary: '#121212',
  backgroundSecondary: '#1E1E1E',
  textPrimary: '#FFFFFF',
  textSecondary: '#B3B3B3',
  borderLight: '#333333',
  borderMedium: '#555555',
  borderDark: '#777777',
};

/**
 * Утилиты для работы с цветами
 */
export const colorUtils = {
  /**
   * Добавляет прозрачность к цвету
   * @param {string} color - HEX цвет
   * @param {number} opacity - Прозрачность от 0 до 1
   * @returns {string} Цвет с прозрачностью
   */
  withOpacity: (color, opacity) => {
    // Убираем # если есть
    const hex = color.replace('#', '');
    // Конвертируем в RGB
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);
    // Возвращаем rgba
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  },

  /**
   * Осветляет цвет
   * @param {string} color - HEX цвет
   * @param {number} percent - Процент осветления (0-100)
   * @returns {string} Осветленный цвет
   */
  lighten: (color, percent) => {
    const hex = color.replace('#', '');
    const r = Math.min(255, parseInt(hex.substr(0, 2), 16) + (255 * percent / 100));
    const g = Math.min(255, parseInt(hex.substr(2, 2), 16) + (255 * percent / 100));
    const b = Math.min(255, parseInt(hex.substr(4, 2), 16) + (255 * percent / 100));
    return `#${Math.round(r).toString(16).padStart(2, '0')}${Math.round(g).toString(16).padStart(2, '0')}${Math.round(b).toString(16).padStart(2, '0')}`;
  },

  /**
   * Затемняет цвет
   * @param {string} color - HEX цвет
   * @param {number} percent - Процент затемнения (0-100)
   * @returns {string} Затемненный цвет
   */
  darken: (color, percent) => {
    const hex = color.replace('#', '');
    const r = Math.max(0, parseInt(hex.substr(0, 2), 16) - (255 * percent / 100));
    const g = Math.max(0, parseInt(hex.substr(2, 2), 16) - (255 * percent / 100));
    const b = Math.max(0, parseInt(hex.substr(4, 2), 16) - (255 * percent / 100));
    return `#${Math.round(r).toString(16).padStart(2, '0')}${Math.round(g).toString(16).padStart(2, '0')}${Math.round(b).toString(16).padStart(2, '0')}`;
  },
};

export default colors;
