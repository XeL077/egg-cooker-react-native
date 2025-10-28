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
  activeTab: 'egg',                 // Активная вкладка (egg/timer)
  selectedSize: null,               // Выбранный размер яйца
  isHotWater: false,                // Температура воды
  selectedDoneness: 'soft',         // Степень готовности
  notifications: {                  // Настройки уведомлений
    sound: true,
    vibration: true,
  },
  language: 'ru',                   // Язык интерфейса
  isLoading: true,                  // Состояние загрузки
  timerState: {                     // Состояние таймера
    state: 'idle',                  // idle/running/paused/stopped
    startTime: null,                // Timestamp начала отсчета
    totalTime: 300,                 // Общее время в секундах
    timeLeft: 300,                  // Оставшееся время в секундах
    pausedAt: null,                 // Timestamp паузы
  }
}
```

### Ключи AsyncStorage
```javascript
const STORAGE_KEYS = {
  ACTIVE_TAB: 'active_tab',
  SIZE: 'egg_timer_size',
  TEMPERATURE: 'egg_timer_temperature',
  DONENESS: 'egg_timer_doneness',
  NOTIFICATIONS: 'egg_timer_notifications',
  LANGUAGE: 'egg_timer_language',
  TIMER_STATE: 'egg_timer_state',
};
```

## API

### Действия (Actions)
```javascript
// Основные настройки
setActiveTab(tab)             // Установить активную вкладку
setSize(size)                 // Установить размер яйца
setTemperature(isHot)         // Установить температуру воды
setDoneness(doneness)         // Установить степень готовности

// Дополнительные настройки
setNotifications(settings)    // Настройки уведомлений
setLanguage(language)         // Язык интерфейса

// Управление таймером
startTimer(totalTime)         // Запустить таймер с заданным временем
pauseTimer()                  // Поставить таймер на паузу
resumeTimer()                 // Возобновить таймер после паузы
resetTimer(totalTime)         // Сбросить таймер
updateTimeLeft(timeLeft)      // Обновить оставшееся время
setTimerState(state)          // Установить состояние таймера

// Утилиты
resetSettings()               // Сбросить все настройки
resetEggSettings()            // Сбросить только настройки яиц
```

### Использование в компонентах
```javascript
import { useSettings } from '../context/SettingsContext';

// Пример использования настроек
const SettingsComponent = () => {
  const { 
    selectedSize, 
    setSize, 
    isLoading 
  } = useSettings();
  
  // Использование настроек...
};

// Пример использования таймера
const TimerComponent = () => {
  const {
    timerState,
    startTimer,
    pauseTimer,
    resumeTimer,
    resetTimer,
  } = useSettings();
  
  const handleStart = () => {
    startTimer(300); // Запустить таймер на 300 секунд (5 минут)
  };
  
  const handlePause = () => {
    if (timerState.state === 'running') {
      pauseTimer();
    } else if (timerState.state === 'paused') {
      resumeTimer();
    }
  };
  
  return (
    <View>
      <Text>Осталось: {timerState.timeLeft} сек</Text>
      <Text>Состояние: {timerState.state}</Text>
      <Button onPress={handleStart} title="Старт" />
      <Button onPress={handlePause} title="Пауза" />
      <Button onPress={() => resetTimer(300)} title="Сброс" />
    </View>
  );
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

### Управление таймером через контекст
Состояние таймера хранится в контексте и автоматически сохраняется в AsyncStorage. Это позволяет:
- **Сохранять время начала отсчета** - даже при закрытии и перезапуске приложения таймер продолжит отсчет
- **Восстанавливать состояние таймера** - при загрузке приложения вычисляется актуальное оставшееся время
- **Синхронизировать таймер** - между разными компонентами таймер всегда показывает одно и то же время

При загрузке приложения, если таймер был запущен:
1. Вычисляется прошедшее время: `elapsed = Date.now() - startTime`
2. Рассчитывается новое оставшееся время: `timeLeft = totalTime - elapsed`
3. Если время истекло, таймер переводится в состояние 'stopped'

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
