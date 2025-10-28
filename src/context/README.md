# 🗄️ Settings Store - Система управления настройками

## Обзор

Система управления настройками приложения Egg Timer+ с автоматическим сохранением в AsyncStorage и восстановлением при запуске.

## Архитектура

### SettingsContext
- **Файл**: `src/context/SettingsContext.jsx`
- **Назначение**: React Context для глобального управления состоянием настроек
- **Провайдер**: `SettingsProvider` - оборачивает приложение
- **Хук**: `useSettings()` - для доступа к настройкам в компонентах

### AsyncStorage
- **Библиотека**: `@react-native-async-storage/async-storage`
- **Назначение**: Постоянное хранение настроек между сессиями
- **Ключи**: Префикс `egg_timer_` для всех настроек

## Структура данных

### Состояние настроек
```javascript
{
  selectedCountry: 'CIS',           // Выбранная страна
  selectedSize: null,               // Выбранный размер яйца
  isHotWater: false,                // Температура воды
  selectedDoneness: 'soft',         // Степень готовности
  notifications: {                  // Настройки уведомлений
    sound: true,
    vibration: true,
  },
  language: 'ru',                   // Язык интерфейса
  isLoading: true,                  // Состояние загрузки
}
```

### Ключи AsyncStorage
```javascript
const STORAGE_KEYS = {
  COUNTRY: 'egg_timer_country',
  SIZE: 'egg_timer_size',
  TEMPERATURE: 'egg_timer_temperature',
  DONENESS: 'egg_timer_doneness',
  NOTIFICATIONS: 'egg_timer_notifications',
  LANGUAGE: 'egg_timer_language',
};
```

## API

### Действия (Actions)
```javascript
// Основные настройки
setCountry(country)           // Установить страну
setSize(size)                 // Установить размер яйца
setTemperature(isHot)         // Установить температуру воды
setDoneness(doneness)         // Установить степень готовности

// Дополнительные настройки
setNotifications(settings)    // Настройки уведомлений
setLanguage(language)         // Язык интерфейса

// Утилиты
resetSettings()               // Сбросить все настройки
resetEggSettings()            // Сбросить только настройки яиц
```

### Использование в компонентах
```javascript
import { useSettings } from '../context/SettingsContext';

const MyComponent = () => {
  const { 
    selectedCountry, 
    setCountry, 
    isLoading 
  } = useSettings();
  
  // Использование настроек...
};
```

## Жизненный цикл

### 1. Инициализация
1. Приложение запускается
2. `SettingsProvider` монтируется
3. `loadSettings()` загружает данные из AsyncStorage
4. `isLoading` устанавливается в `false`
5. Компоненты получают доступ к настройкам

### 2. Изменение настроек
1. Пользователь изменяет настройку
2. Вызывается соответствующее действие (например, `setCountry`)
3. Состояние обновляется через reducer
4. `useEffect` автоматически сохраняет изменения в AsyncStorage

### 3. Сохранение
- Автоматическое сохранение при каждом изменении
- Асинхронная запись в AsyncStorage
- Обработка ошибок с логированием

## Особенности

### Автоматический сброс размера
При смене страны размер яйца автоматически сбрасывается, так как разные страны имеют разные системы классификации.

### Обработка ошибок
- Ошибки загрузки/сохранения логируются в консоль
- При ошибке загрузки используются значения по умолчанию
- Приложение продолжает работать даже при проблемах с хранилищем

### Производительность
- Использование `useReducer` для эффективного управления состоянием
- Батчинг операций AsyncStorage
- Минимальные ре-рендеры компонентов

## Расширение

### Добавление новой настройки
1. Добавить ключ в `STORAGE_KEYS`
2. Добавить поле в `initialState`
3. Создать действие в `ActionTypes`
4. Добавить case в reducer
5. Создать функцию в `actions`
6. Обновить `loadSettings()` и `saveSettings()`

### Пример добавления настройки "автозапуск"
```javascript
// 1. Ключ
AUTO_START: 'egg_timer_auto_start',

// 2. Начальное состояние
autoStart: false,

// 3. Действие
SET_AUTO_START: 'SET_AUTO_START',

// 4. Case в reducer
case ActionTypes.SET_AUTO_START:
  return { ...state, autoStart: action.payload };

// 5. Функция
setAutoStart: (autoStart) => {
  dispatch({ type: ActionTypes.SET_AUTO_START, payload: autoStart });
},

// 6. Загрузка/сохранение
const autoStart = await AsyncStorage.getItem(STORAGE_KEYS.AUTO_START);
if (autoStart !== null) {
  dispatch({ type: ActionTypes.SET_AUTO_START, payload: autoStart === 'true' });
}
```

## Тестирование

### Проверка сохранения
1. Изменить настройки в приложении
2. Закрыть приложение
3. Перезапустить приложение
4. Убедиться, что настройки восстановились

### Проверка сброса
1. Выбрать страну в настройках
2. Выбрать размер яйца
3. Сменить страну
4. Убедиться, что размер сбросился

## Отладка

### Логирование
Все операции с AsyncStorage логируются в консоль:
- Успешная загрузка настроек
- Ошибки загрузки/сохранения
- Изменения настроек

### Проверка хранилища
```javascript
// В консоли разработчика
import AsyncStorage from '@react-native-async-storage/async-storage';

// Просмотр всех ключей
AsyncStorage.getAllKeys().then(keys => console.log(keys));

// Просмотр конкретной настройки
AsyncStorage.getItem('egg_timer_country').then(value => console.log(value));
```
