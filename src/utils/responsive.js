import { Dimensions, PixelRatio } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

/**
 * Утилиты для адаптивной верстки
 * Помогают создавать компоненты, которые корректно отображаются на разных размерах экранов
 */

/**
 * Получить ширину экрана
 */
export const getScreenWidth = () => SCREEN_WIDTH;

/**
 * Получить высоту экрана
 */
export const getScreenHeight = () => SCREEN_HEIGHT;

/**
 * Нормализовать размер относительно ширины экрана
 * @param {number} size - размер в пикселях
 * @returns {number} нормализованный размер
 */
export const normalizeWidth = (size) => {
  // Базовое разрешение для расчетов (iPhone 12 Pro)
  const baseWidth = 390;
  return (size * SCREEN_WIDTH) / baseWidth;
};

/**
 * Нормализовать размер относительно высоты экрана
 * @param {number} size - размер в пикселях
 * @returns {number} нормализованный размер
 */
export const normalizeHeight = (size) => {
  // Базовое разрешение для расчетов (iPhone 12 Pro)
  const baseHeight = 844;
  return (size * SCREEN_HEIGHT) / baseHeight;
};

/**
 * Нормализовать размер относительно диагонали экрана
 * @param {number} size - размер в пикселях
 * @returns {number} нормализованный размер
 */
export const normalizeSize = (size) => {
  const scale = Math.min(SCREEN_WIDTH / 390, SCREEN_HEIGHT / 844);
  return Math.round(PixelRatio.roundToNearestPixel(size * scale));
};

/**
 * Получить размер шрифта с учетом плотности пикселей
 * @param {number} size - размер шрифта
 * @returns {number} адаптивный размер шрифта
 */
export const normalizeFontSize = (size) => {
  return normalizeSize(size);
};

/**
 * Получить отступы с учетом размера экрана
 * @param {number} size - размер отступа
 * @returns {number} адаптивный размер отступа
 */
export const normalizePadding = (size) => {
  return normalizeSize(size);
};

/**
 * Получить размеры для круглых элементов (таймеры, кнопки)
 * @param {number} baseSize - базовый размер
 * @returns {number} адаптивный размер
 */
export const normalizeCircularSize = (baseSize) => {
  // Для круглых элементов учитываем минимальную сторону экрана
  const minDimension = Math.min(SCREEN_WIDTH, SCREEN_HEIGHT);
  const scale = minDimension / 844; // Базовое разрешение
  return Math.round(baseSize * scale);
};

/**
 * Получить размеры для изображений
 * @param {number} width - ширина изображения
 * @param {number} height - высота изображения
 * @returns {object} адаптивные размеры
 */
export const normalizeImageSize = (width, height) => {
  const scale = Math.min(SCREEN_WIDTH / 390, SCREEN_HEIGHT / 844);
  return {
    width: Math.round(width * scale),
    height: Math.round(height * scale),
  };
};

/**
 * Проверить, является ли устройство планшетом
 * @returns {boolean} true если планшет
 */
export const isTablet = () => {
  const minDimension = Math.min(SCREEN_WIDTH, SCREEN_HEIGHT);
  const maxDimension = Math.max(SCREEN_WIDTH, SCREEN_HEIGHT);
  const aspectRatio = maxDimension / minDimension;
  
  // Планшет если минимальная сторона больше 600px или соотношение сторон меньше 1.6
  return minDimension > 600 || aspectRatio < 1.6;
};

/**
 * Получить размеры для планшетов
 * @param {number} size - размер для телефона
 * @returns {number} размер для планшета
 */
export const getTabletSize = (size) => {
  return isTablet() ? size * 1.2 : size;
};

/**
 * Получить размеры контейнеров с учетом устройства
 * @param {number} baseWidth - базовая ширина
 * @param {number} baseHeight - базовая высота
 * @returns {object} адаптивные размеры
 */
export const getResponsiveDimensions = (baseWidth, baseHeight) => {
  const scale = Math.min(SCREEN_WIDTH / 390, SCREEN_HEIGHT / 844);
  
  return {
    width: Math.round(baseWidth * scale),
    height: Math.round(baseHeight * scale),
    scale,
  };
};

/**
 * Получить размеры для модальных окон
 * @param {number} widthPercent - процент от ширины экрана (0-1)
 * @param {number} heightPercent - процент от высоты экрана (0-1)
 * @returns {object} размеры модального окна
 */
export const getModalDimensions = (widthPercent = 0.9, heightPercent = 0.8) => {
  return {
    width: SCREEN_WIDTH * widthPercent,
    height: SCREEN_HEIGHT * heightPercent,
  };
};

/**
 * Получить размеры для сеток и списков
 * @param {number} columns - количество колонок
 * @param {number} spacing - отступ между элементами
 * @returns {object} размеры элементов сетки
 */
export const getGridItemSize = (columns = 2, spacing = 16) => {
  const totalSpacing = spacing * (columns + 1);
  const itemWidth = (SCREEN_WIDTH - totalSpacing) / columns;
  
  return {
    width: Math.round(itemWidth),
    spacing: normalizePadding(spacing),
  };
};

/**
 * Адаптивные размеры для различных типов экранов
 */
export const screenSizes = {
  // Малые экраны (iPhone SE, старые Android)
  small: {
    width: 320,
    height: 568,
  },
  // Средние экраны (iPhone 12, большинство Android)
  medium: {
    width: 390,
    height: 844,
  },
  // Большие экраны (iPhone 12 Pro Max, большие Android)
  large: {
    width: 428,
    height: 926,
  },
  // Планшеты
  tablet: {
    width: 768,
    height: 1024,
  },
};

/**
 * Определить размер экрана
 * @returns {string} размер экрана
 */
export const getScreenSize = () => {
  if (isTablet()) return 'tablet';
  if (SCREEN_WIDTH <= screenSizes.small.width) return 'small';
  if (SCREEN_WIDTH <= screenSizes.medium.width) return 'medium';
  return 'large';
};

export default {
  normalizeWidth,
  normalizeHeight,
  normalizeSize,
  normalizeFontSize,
  normalizePadding,
  normalizeCircularSize,
  normalizeImageSize,
  isTablet,
  getTabletSize,
  getResponsiveDimensions,
  getModalDimensions,
  getGridItemSize,
  getScreenSize,
  getScreenWidth,
  getScreenHeight,
};
