# Тема приложения Egg Cooker

Этот модуль содержит централизованное управление цветовой схемой приложения.

## Структура

- `colors.js` - Основной файл с цветами, градиентами и утилитами
- `typography.js` - Настройки шрифтов и типографики
- `index.js` - Экспорт всех элементов темы
- `README.md` - Документация по использованию

## Использование

### Импорт цветов и шрифтов

```javascript
import { colors, colorUtils, textStyles, fonts } from '../theme';

// Или импорт конкретных элементов
import { colors, gradients, darkColors, textStyles, typographyUtils } from '../theme';
```

### Основные цвета

```javascript
// Основные цвета
colors.primary        // #FF6B35 - оранжевый
colors.secondary      // #4CAF50 - зеленый
colors.accent         // #FFC107 - желтый

// Нейтральные цвета
colors.white          // #FFFFFF
colors.black          // #000000
colors.gray100        // #F5F5F5 - фон
colors.gray300        // #E0E0E0 - границы
```

### Семантические цвета

```javascript
colors.success        // #4CAF50 - успех
colors.warning        // #FF9800 - предупреждение
colors.error          // #F44336 - ошибка
colors.info           // #2196F3 - информация
```

### Цвета для состояний яйца

```javascript
colors.eggSoft        // #FFE0B2 - мягкое яйцо
colors.eggMedium      // #FFCC02 - среднее яйцо
colors.eggHard        // #FF8F00 - крутое яйцо
```

### Цвета для таймера

```javascript
colors.timerActive    // #FF6B35 - активный таймер
colors.timerPaused    // #9E9E9E - приостановленный
colors.timerFinished  // #4CAF50 - завершенный
```

### Утилиты для работы с цветами

```javascript
// Добавление прозрачности
colorUtils.withOpacity(colors.primary, 0.5)  // rgba(255, 107, 53, 0.5)

// Осветление цвета
colorUtils.lighten(colors.primary, 20)       // на 20% светлее

// Затемнение цвета
colorUtils.darken(colors.primary, 20)        // на 20% темнее
```

### Градиенты

```javascript
gradients.primary     // ['#FF6B35', '#FF8A65']
gradients.secondary   // ['#4CAF50', '#81C784']
gradients.accent      // ['#FFC107', '#FFD54F']
gradients.sunset      // ['#FF6B35', '#FFC107']
gradients.ocean       // ['#2196F3', '#4CAF50']
```

### Шрифты

```javascript
// Семейства шрифтов
fonts.family.primary     // 'Helvetica'
fonts.family.bold        // 'Helvetica-Bold'
fonts.family.light       // 'Helvetica-Light'

// Размеры шрифтов
fonts.sizes.sm           // 12
fonts.sizes.md           // 14 (по умолчанию)
fonts.sizes.lg           // 16
fonts.sizes.xl           // 18

// Веса шрифтов
fonts.weights.normal     // '400'
fonts.weights.medium     // '500'
fonts.weights.bold       // '700'
```

### Готовые стили текста

```javascript
// Заголовки
textStyles.h1            // Заголовок 1
textStyles.h2            // Заголовок 2
textStyles.h3            // Заголовок 3
textStyles.h4            // Заголовок 4

// Основной текст
textStyles.body          // Основной текст
textStyles.bodyLarge     // Большой текст
textStyles.bodySmall     // Маленький текст

// Кнопки
textStyles.button        // Текст кнопки
textStyles.buttonLarge   // Большая кнопка
textStyles.buttonSmall   // Маленькая кнопка

// Навигация
textStyles.tabLabel      // Метка таба
textStyles.tabLabelActive // Активная метка таба

// Формы
textStyles.label         // Метка поля
textStyles.input         // Текст ввода
textStyles.placeholder   // Плейсхолдер

// Специальные
textStyles.timer         // Текст таймера
textStyles.display       // Большой заголовок
textStyles.caption       // Подпись
```

### Утилиты для работы с шрифтами

```javascript
// Создание кастомного стиля текста
typographyUtils.createTextStyle({
  fontSize: 20,
  fontWeight: 'bold',
  color: colors.primary
});

// Получение размера шрифта
typographyUtils.getFontSize('lg'); // 16

// Получение семейства шрифта
typographyUtils.getFontFamily('bold'); // 'Helvetica-Bold'
```

## Примеры использования в компонентах

### StyleSheet

```javascript
import { colors, textStyles } from '../theme';

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.backgroundSecondary,
    borderColor: colors.borderLight,
  },
  button: {
    backgroundColor: colors.primary,
    borderColor: colors.primaryDark,
  },
  text: {
    ...textStyles.body,
    color: colors.textPrimary,
  },
  title: {
    ...textStyles.h2,
    color: colors.textPrimary,
  },
  activeText: {
    ...textStyles.button,
    color: colors.primary,
  },
});
```

### Условные стили

```javascript
const getButtonStyle = (isActive) => ({
  backgroundColor: isActive ? colors.primary : colors.buttonSecondary,
  borderColor: isActive ? colors.primaryDark : colors.borderLight,
});

const getTextStyle = (isActive) => ({
  ...textStyles.button,
  color: isActive ? colors.textInverse : colors.textPrimary,
});
```

### С прозрачностью

```javascript
const overlayStyle = {
  backgroundColor: colorUtils.withOpacity(colors.black, 0.5),
};

const lightBackgroundStyle = {
  backgroundColor: colorUtils.withOpacity(colors.primary, 0.1),
};
```

## Темная тема

Для будущего использования доступна темная тема:

```javascript
import { darkColors } from '../theme';

const darkStyles = StyleSheet.create({
  container: {
    backgroundColor: darkColors.backgroundPrimary,
    borderColor: darkColors.borderLight,
  },
});
```

## Рекомендации

1. **Всегда используйте цвета из темы** - не хардкодите цвета в компонентах
2. **Используйте готовые стили текста** - `textStyles.h1` вместо ручного создания
3. **Используйте семантические цвета** - `colors.success` вместо `colors.green`
4. **Применяйте утилиты** - `colorUtils.withOpacity()` для прозрачности
5. **Следуйте принципам доступности** - обеспечивайте достаточный контраст
6. **Используйте Helvetica** - все шрифты должны быть из семейства Helvetica
7. **Документируйте новые элементы** - добавляйте комментарии при расширении темы

## Расширение темы

При добавлении новых цветов:

1. Добавьте цвет в соответствующий раздел `colors.js`
2. Обновите документацию в этом файле
3. Рассмотрите добавление в темную тему
4. Протестируйте контрастность и доступность

При добавлении новых шрифтов:

1. Добавьте семейство шрифта в `fonts.family` в `typography.js`
2. Создайте готовый стиль в `textStyles` если необходимо
3. Обновите документацию в этом файле
4. Убедитесь, что используется Helvetica или совместимый шрифт
