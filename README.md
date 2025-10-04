# 🥚 Egg Cooker

Приложение-таймер для варки яиц с погодными эффектами.

## 🚀 Быстрый старт

### Web разработка
```bash
npm run dev
```
Откройте http://localhost:5173

### React Native разработка
```bash
npm run start:dev
```

### Тестирование на Android планшете

**Вариант 1: Локальная сборка (быстрее)** ⚡

**📱 См.: [LOCAL_BUILD_QUICK_START.md](LOCAL_BUILD_QUICK_START.md)**

```bash
# 1. Настройте переменные окружения (один раз)
.\setup-android-env.ps1

# 2. Подключите планшет через USB

# 3. Соберите и запустите
npm run android
```

**Вариант 2: Облачная сборка (проще)** ☁️

**📱 См.: [BUILD_INSTRUCTIONS.md](BUILD_INSTRUCTIONS.md)**

```bash
# 1. Создать development build (один раз)
eas build --profile development --platform android

# 2. Установить APK на планшет

# 3. Запустить dev сервер
npm run start:dev
```

## 📖 Документация

### Android разработка
- ⚡ **[LOCAL_BUILD_QUICK_START.md](LOCAL_BUILD_QUICK_START.md)** - Локальная сборка (быстрый старт)
- 🖥️ **[LOCAL_BUILD_SETUP.md](LOCAL_BUILD_SETUP.md)** - Локальная сборка (полная инструкция)
- ☁️ **[BUILD_INSTRUCTIONS.md](BUILD_INSTRUCTIONS.md)** - Облачная сборка EAS
- ✅ **[ANDROID_CHECKLIST.md](ANDROID_CHECKLIST.md)** - Быстрая памятка
- 🤖 **[ANDROID_TESTING.md](ANDROID_TESTING.md)** - Детальное руководство
- 🚀 **[QUICK_START_ANDROID.md](QUICK_START_ANDROID.md)** - Быстрый старт EAS

### Готовая настройка
- 🎉 **[SETUP_COMPLETE.md](SETUP_COMPLETE.md)** - Обзор настройки проекта

## ✨ Возможности

- ⏱️ Таймер для разных степеней варки яиц
- 📏 Поддержка разных размеров яиц
- 🌡️ Переключение температуры (°C / °F)
- 🌤️ Погодные эффекты с эмодзи
- 📱 Кросс-платформа: Web + iOS + Android
- 🔥 Hot Reload для быстрой разработки

## 🛠️ Технологии

- **React Native** - мобильная разработка
- **Expo** - инструменты и сервисы
- **Vite** - web сборка
- **EAS Build** - облачная сборка

## 📦 Установка

```bash
# Установка зависимостей
npm install

# Для iOS/Android также нужен Expo CLI
npm install -g eas-cli
```

## 🎯 Доступные скрипты

### Web
```bash
npm run dev          # Vite dev сервер
npm run build        # Сборка для production
npm run preview      # Предпросмотр production сборки
```

### React Native
```bash
npm run start        # Expo dev сервер (Expo Go)
npm run start:dev    # Dev сервер (development build)
npm run start:tunnel # Dev сервер с tunnel (удаленный доступ)
npm run android      # Локальная сборка и запуск Android
npm run ios          # Локальная сборка и запуск iOS
```

### EAS Build
```bash
npm run android:build  # Development build для Android
npm run ios:sim        # Development build для iOS simulator
```

## 🏗️ Структура проекта

```
egg-cooker/
├── src/
│   ├── components/      # React компоненты
│   │   ├── CircularTimer.jsx
│   │   ├── DonenessSelector.jsx
│   │   └── ...
│   ├── views/           # Экраны приложения
│   │   ├── EggView.jsx
│   │   ├── TimerView.jsx
│   │   └── WeatherView.jsx
│   ├── utils/           # Утилиты
│   │   ├── responsive.js
│   │   └── utils.js
│   ├── theme/           # Стили и цвета
│   └── context/         # React Context
├── public/              # Статические файлы для web
├── android/             # Android проект
├── docs/                # Документация
└── package.json
```

## 🔧 Разработка

### Hot Reload

- **Web**: Автоматически через Vite
- **Native**: Автоматически с development build

### Отладка

**Web:**
- Chrome DevTools (F12)

**Native:**
- Встряхните устройство → Dev Menu
- Chrome DevTools (j в терминале Metro)
- React Native Debugger

### Добавление новых зависимостей

После добавления нативных модулей:
```bash
# Пересоберите development build
eas build --profile development --platform android
```

## 📱 Тестирование

### На Web
```bash
npm run dev
```

### На Android планшете
См. [ANDROID_CHECKLIST.md](ANDROID_CHECKLIST.md)

### На iOS симуляторе
```bash
npm run ios:sim  # Создаст build для симулятора
```

## 🐛 Решение проблем

| Проблема | Решение |
|----------|---------|
| Не подключается к серверу | Попробуйте `npm run start:tunnel` |
| Белый экран | Очистите кеш: `--clear` |

См. полный troubleshooting в [ANDROID_TESTING.md](ANDROID_TESTING.md#решение-проблем)

## 📄 Лицензия

ISC

## 👤 Автор

XeL077

## 🔗 Полезные ссылки

- [Expo Documentation](https://docs.expo.dev)
- [React Native](https://reactnative.dev)
- [EAS Build](https://docs.expo.dev/build/introduction/)
