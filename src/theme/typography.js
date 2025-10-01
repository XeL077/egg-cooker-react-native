/**
 * Типографика приложения Egg Cooker
 * Централизованное управление шрифтами
 */

export const fonts = {
  // Основные семейства шрифтов
  family: {
    primary: 'Helvetica',
    secondary: 'Helvetica-Bold',
    light: 'Helvetica-Light',
    medium: 'Helvetica-Medium',
    bold: 'Helvetica-Bold',
    condensed: 'Helvetica-Condensed',
  },

  // Размеры шрифтов
  sizes: {
    xs: 10,      // Очень маленький
    sm: 12,      // Маленький
    md: 14,      // Средний (по умолчанию)
    lg: 16,      // Большой
    xl: 18,      // Очень большой
    xxl: 20,     // Огромный
    xxxl: 24,    // Супер огромный
    display: 32, // Заголовок экрана
  },

  // Веса шрифтов
  weights: {
    light: '300',
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    heavy: '800',
  },

  // Высота строк
  lineHeights: {
    tight: 1.2,    // Плотная
    normal: 1.4,   // Нормальная
    relaxed: 1.6,  // Расслабленная
    loose: 1.8,    // Свободная
  },

  // Межбуквенные интервалы
  letterSpacings: {
    tight: -0.5,
    normal: 0,
    wide: 0.5,
    wider: 1,
  },
};

/**
 * Готовые стили текста для различных случаев использования
 */
export const textStyles = {
  // Заголовки
  h1: {
    fontFamily: fonts.family.bold,
    fontSize: fonts.sizes.xxxl,
    fontWeight: fonts.weights.bold,
    lineHeight: fonts.sizes.xxxl * fonts.lineHeights.tight,
    letterSpacing: fonts.letterSpacings.tight,
  },
  h2: {
    fontFamily: fonts.family.bold,
    fontSize: fonts.sizes.xxl,
    fontWeight: fonts.weights.bold,
    lineHeight: fonts.sizes.xxl * fonts.lineHeights.tight,
    letterSpacing: fonts.letterSpacings.tight,
  },
  h3: {
    fontFamily: fonts.family.bold,
    fontSize: fonts.sizes.xl,
    fontWeight: fonts.weights.semibold,
    lineHeight: fonts.sizes.xl * fonts.lineHeights.normal,
    letterSpacing: fonts.letterSpacings.normal,
  },
  h4: {
    fontFamily: fonts.family.medium,
    fontSize: fonts.sizes.lg,
    fontWeight: fonts.weights.medium,
    lineHeight: fonts.sizes.lg * fonts.lineHeights.normal,
    letterSpacing: fonts.letterSpacings.normal,
  },

  // Основной текст
  body: {
    fontFamily: fonts.family.primary,
    fontSize: fonts.sizes.md,
    fontWeight: fonts.weights.normal,
    lineHeight: fonts.sizes.md * fonts.lineHeights.normal,
    letterSpacing: fonts.letterSpacings.normal,
  },
  bodyLarge: {
    fontFamily: fonts.family.primary,
    fontSize: fonts.sizes.lg,
    fontWeight: fonts.weights.normal,
    lineHeight: fonts.sizes.lg * fonts.lineHeights.normal,
    letterSpacing: fonts.letterSpacings.normal,
  },
  bodySmall: {
    fontFamily: fonts.family.primary,
    fontSize: fonts.sizes.sm,
    fontWeight: fonts.weights.normal,
    lineHeight: fonts.sizes.sm * fonts.lineHeights.normal,
    letterSpacing: fonts.letterSpacings.normal,
  },

  // Кнопки
  button: {
    fontFamily: fonts.family.medium,
    fontSize: fonts.sizes.md,
    fontWeight: fonts.weights.medium,
    lineHeight: fonts.sizes.md * fonts.lineHeights.tight,
    letterSpacing: fonts.letterSpacings.wide,
  },
  buttonLarge: {
    fontFamily: fonts.family.medium,
    fontSize: fonts.sizes.lg,
    fontWeight: fonts.weights.medium,
    lineHeight: fonts.sizes.lg * fonts.lineHeights.tight,
    letterSpacing: fonts.letterSpacings.wide,
  },
  buttonSmall: {
    fontFamily: fonts.family.medium,
    fontSize: fonts.sizes.sm,
    fontWeight: fonts.weights.medium,
    lineHeight: fonts.sizes.sm * fonts.lineHeights.tight,
    letterSpacing: fonts.letterSpacings.wide,
  },

  // Навигация
  tabLabel: {
    fontFamily: fonts.family.medium,
    fontSize: fonts.sizes.sm,
    fontWeight: fonts.weights.medium,
    lineHeight: fonts.sizes.sm * fonts.lineHeights.tight,
    letterSpacing: fonts.letterSpacings.normal,
  },
  tabLabelActive: {
    fontFamily: fonts.family.bold,
    fontSize: fonts.sizes.sm,
    fontWeight: fonts.weights.bold,
    lineHeight: fonts.sizes.sm * fonts.lineHeights.tight,
    letterSpacing: fonts.letterSpacings.normal,
  },

  // Формы
  label: {
    fontFamily: fonts.family.medium,
    fontSize: fonts.sizes.sm,
    fontWeight: fonts.weights.medium,
    lineHeight: fonts.sizes.sm * fonts.lineHeights.normal,
    letterSpacing: fonts.letterSpacings.normal,
  },
  input: {
    fontFamily: fonts.family.primary,
    fontSize: fonts.sizes.md,
    fontWeight: fonts.weights.normal,
    lineHeight: fonts.sizes.md * fonts.lineHeights.normal,
    letterSpacing: fonts.letterSpacings.normal,
  },
  placeholder: {
    fontFamily: fonts.family.primary,
    fontSize: fonts.sizes.md,
    fontWeight: fonts.weights.normal,
    lineHeight: fonts.sizes.md * fonts.lineHeights.normal,
    letterSpacing: fonts.letterSpacings.normal,
  },

  // Специальные случаи
  caption: {
    fontFamily: fonts.family.primary,
    fontSize: fonts.sizes.xs,
    fontWeight: fonts.weights.normal,
    lineHeight: fonts.sizes.xs * fonts.lineHeights.normal,
    letterSpacing: fonts.letterSpacings.normal,
  },
  overline: {
    fontFamily: fonts.family.medium,
    fontSize: fonts.sizes.xs,
    fontWeight: fonts.weights.medium,
    lineHeight: fonts.sizes.xs * fonts.lineHeights.normal,
    letterSpacing: fonts.letterSpacings.wider,
    textTransform: 'uppercase',
  },
  display: {
    fontFamily: fonts.family.bold,
    fontSize: fonts.sizes.display,
    fontWeight: fonts.weights.bold,
    lineHeight: fonts.sizes.display * fonts.lineHeights.tight,
    letterSpacing: fonts.letterSpacings.tight,
  },

  // Таймер
  timer: {
    fontFamily: fonts.family.bold,
    fontSize: fonts.sizes.xxxl,
    fontWeight: fonts.weights.bold,
    lineHeight: fonts.sizes.xxxl * fonts.lineHeights.tight,
    letterSpacing: fonts.letterSpacings.tight,
  },
  timerLabel: {
    fontFamily: fonts.family.medium,
    fontSize: fonts.sizes.sm,
    fontWeight: fonts.weights.medium,
    lineHeight: fonts.sizes.sm * fonts.lineHeights.normal,
    letterSpacing: fonts.letterSpacings.normal,
  },
};

/**
 * Утилиты для работы с типографикой
 */
export const typographyUtils = {
  /**
   * Создает стиль текста с кастомными параметрами
   * @param {Object} options - Параметры стиля
   * @returns {Object} Стиль текста
   */
  createTextStyle: (options = {}) => ({
    fontFamily: options.fontFamily || fonts.family.primary,
    fontSize: options.fontSize || fonts.sizes.md,
    fontWeight: options.fontWeight || fonts.weights.normal,
    lineHeight: options.lineHeight || (options.fontSize || fonts.sizes.md) * fonts.lineHeights.normal,
    letterSpacing: options.letterSpacing || fonts.letterSpacings.normal,
    ...options,
  }),

  /**
   * Получает размер шрифта по ключу
   * @param {string} sizeKey - Ключ размера
   * @returns {number} Размер шрифта
   */
  getFontSize: (sizeKey) => fonts.sizes[sizeKey] || fonts.sizes.md,

  /**
   * Получает семейство шрифта по ключу
   * @param {string} familyKey - Ключ семейства
   * @returns {string} Семейство шрифта
   */
  getFontFamily: (familyKey) => fonts.family[familyKey] || fonts.family.primary,

  /**
   * Получает вес шрифта по ключу
   * @param {string} weightKey - Ключ веса
   * @returns {string} Вес шрифта
   */
  getFontWeight: (weightKey) => fonts.weights[weightKey] || fonts.weights.normal,
};

export default fonts;

