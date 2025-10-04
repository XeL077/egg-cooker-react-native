import React, { createContext, useContext, useReducer, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ACTIVE_TAB_TYPE = {
  TIMER: 'timer',
  EGG: 'egg',
  WEATHER: 'weather',
}

// Ключи для AsyncStorage
const STORAGE_KEYS = {
  ACTIVE_TAB: 'active_tab',
  SIZE: 'egg_timer_size',
  TEMPERATURE: 'egg_timer_temperature',
  DONENESS: 'egg_timer_doneness',
  NOTIFICATIONS: 'egg_timer_notifications',
  LANGUAGE: 'egg_timer_language',
  TIMER_STATE: 'egg_timer_state',
};

// Начальное состояние настроек
const initialState = {
  activeTab: ACTIVE_TAB_TYPE.EGG,
  selectedSize: null,
  isHotWater: false,
  selectedDoneness: 'soft',
  notifications: {
    sound: true,
    vibration: true,
  },
  language: 'ru',
  isLoading: true,
  // Состояние таймера
  timerState: {
    state: 'idle', // idle, running, paused, stopped
    startTime: null, // время начала отсчета (timestamp)
    totalTime: 300, // общее время в секундах
    timeLeft: 300, // оставшееся время в секундах
    pausedAt: null, // время паузы (timestamp)
  },
};

// Типы действий
const ActionTypes = {
  SET_ACTIVE_TAB: 'SET_ACTIVE_TAB',
  SET_LOADING: 'SET_LOADING',
  SET_SIZE: 'SET_SIZE',
  SET_TEMPERATURE: 'SET_TEMPERATURE',
  SET_DONENESS: 'SET_DONENESS',
  SET_NOTIFICATIONS: 'SET_NOTIFICATIONS',
  SET_LANGUAGE: 'SET_LANGUAGE',
  RESET_SETTINGS: 'RESET_SETTINGS',
  SET_TIMER_STATE: 'SET_TIMER_STATE',
  START_TIMER: 'START_TIMER',
  PAUSE_TIMER: 'PAUSE_TIMER',
  RESUME_TIMER: 'RESUME_TIMER',
  RESET_TIMER: 'RESET_TIMER',
  UPDATE_TIME_LEFT: 'UPDATE_TIME_LEFT',
};

// Редьюсер для управления состоянием
const settingsReducer = (state, action) => {
  switch (action.type) {
    case ActionTypes.SET_ACTIVE_TAB:
      return { ...state, activeTab: action.payload };
    
    case ActionTypes.SET_LOADING:
      return { ...state, isLoading: action.payload };
    
    case ActionTypes.SET_SIZE:
      return { ...state, selectedSize: action.payload };
    
    case ActionTypes.SET_TEMPERATURE:
      return { ...state, isHotWater: action.payload };
    
    case ActionTypes.SET_DONENESS:
      return { ...state, selectedDoneness: action.payload };
    
    case ActionTypes.SET_NOTIFICATIONS:
      return { 
        ...state, 
        notifications: { ...state.notifications, ...action.payload }
      };
   
    case ActionTypes.SET_LANGUAGE:
      return { ...state, language: action.payload };
    
    case ActionTypes.RESET_SETTINGS:
      return { ...initialState, isLoading: false };
    
    case ActionTypes.SET_TIMER_STATE:
      return {
        ...state,
        timerState: { ...state.timerState, ...action.payload }
      };
    
    case ActionTypes.START_TIMER:
      return {
        ...state,
        timerState: {
          ...state.timerState,
          state: 'running',
          startTime: Date.now(),
          totalTime: action.payload,
          timeLeft: action.payload,
          pausedAt: null,
        }
      };
    
    case ActionTypes.PAUSE_TIMER:
      return {
        ...state,
        timerState: {
          ...state.timerState,
          state: 'paused',
          pausedAt: Date.now(),
        }
      };
    
    case ActionTypes.RESUME_TIMER:
      const pausedDuration = state.timerState.pausedAt 
        ? Date.now() - state.timerState.pausedAt 
        : 0;
      return {
        ...state,
        timerState: {
          ...state.timerState,
          state: 'running',
          startTime: state.timerState.startTime + pausedDuration,
          pausedAt: null,
        }
      };
    
    case ActionTypes.RESET_TIMER:
      return {
        ...state,
        timerState: {
          state: 'idle',
          startTime: null,
          totalTime: action.payload || state.timerState.totalTime,
          timeLeft: action.payload || state.timerState.totalTime,
          pausedAt: null,
        }
      };
    
    case ActionTypes.UPDATE_TIME_LEFT:
      return {
        ...state,
        timerState: {
          ...state.timerState,
          timeLeft: action.payload,
          state: action.payload <= 0 ? 'stopped' : state.timerState.state,
        }
      };
    
    default:
      return state;
  }
};

// Создание контекста
const SettingsContext = createContext();

// Провайдер контекста
export const SettingsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(settingsReducer, initialState);

  // Загрузка настроек при инициализации
  useEffect(() => {
    loadSettings();
  }, []);

  // Сохранение настроек при изменении
  useEffect(() => {
    if (!state.isLoading) {
      saveSettings();
    }
  }, [state]);

  // Загрузка настроек из AsyncStorage
  const loadSettings = async () => {
    try {
      const [
        activeTab,
        size,
        temperature,
        doneness,
        notifications,
        language,
        timerState
      ] = await Promise.all([
        AsyncStorage.getItem(STORAGE_KEYS.ACTIVE_TAB),
        AsyncStorage.getItem(STORAGE_KEYS.SIZE),
        AsyncStorage.getItem(STORAGE_KEYS.TEMPERATURE),
        AsyncStorage.getItem(STORAGE_KEYS.DONENESS),
        AsyncStorage.getItem(STORAGE_KEYS.NOTIFICATIONS),
        AsyncStorage.getItem(STORAGE_KEYS.LANGUAGE),
        AsyncStorage.getItem(STORAGE_KEYS.TIMER_STATE),
      ]);

      // Применяем загруженные настройки
      if (activeTab) dispatch({ type: ActionTypes.SET_ACTIVE_TAB, payload: activeTab });
      if (size) dispatch({ type: ActionTypes.SET_SIZE, payload: size });
      if (temperature !== null) {
        dispatch({ type: ActionTypes.SET_TEMPERATURE, payload: temperature === 'true' });
      }
      if (doneness) dispatch({ type: ActionTypes.SET_DONENESS, payload: doneness });
      if (notifications) {
        dispatch({ 
          type: ActionTypes.SET_NOTIFICATIONS, 
          payload: JSON.parse(notifications) 
        });
      }
      if (language) dispatch({ type: ActionTypes.SET_LANGUAGE, payload: language });
      if (timerState) {
        const parsedTimerState = JSON.parse(timerState);
        // Если таймер был запущен, вычисляем новое оставшееся время
        if (parsedTimerState.state === 'running' && parsedTimerState.startTime) {
          const elapsed = Math.floor((Date.now() - parsedTimerState.startTime) / 1000);
          const newTimeLeft = Math.max(0, parsedTimerState.totalTime - elapsed);
          parsedTimerState.timeLeft = newTimeLeft;
          if (newTimeLeft <= 0) {
            parsedTimerState.state = 'stopped';
          }
        }
        dispatch({ type: ActionTypes.SET_TIMER_STATE, payload: parsedTimerState });
      }

      dispatch({ type: ActionTypes.SET_LOADING, payload: false });
    } catch (error) {
      console.error('Ошибка загрузки настроек:', error);
      dispatch({ type: ActionTypes.SET_LOADING, payload: false });
    }
  };

  // Сохранение настроек в AsyncStorage
  const saveSettings = async () => {
    try {
      await Promise.all([
        AsyncStorage.setItem(STORAGE_KEYS.ACTIVE_TAB, state.activeTab),
        AsyncStorage.setItem(STORAGE_KEYS.SIZE, state.selectedSize || ''),
        AsyncStorage.setItem(STORAGE_KEYS.TEMPERATURE, state.isHotWater.toString()),
        AsyncStorage.setItem(STORAGE_KEYS.DONENESS, state.selectedDoneness),
        AsyncStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(state.notifications)),
        AsyncStorage.setItem(STORAGE_KEYS.LANGUAGE, state.language),
        AsyncStorage.setItem(STORAGE_KEYS.TIMER_STATE, JSON.stringify(state.timerState)),
      ]);
    } catch (error) {
      console.error('Ошибка сохранения настроек:', error);
    }
  };

  // FC для изменения настроек
  const actions = {
    setActiveTab: (activeTab) => {
      dispatch({ type: ActionTypes.SET_ACTIVE_TAB, payload: activeTab });
    },
    setSize: (size) => {
      dispatch({ type: ActionTypes.SET_SIZE, payload: size });
    },
    setTemperature: (isHot) => {
      dispatch({ type: ActionTypes.SET_TEMPERATURE, payload: isHot });
    },
    setDoneness: (doneness) => {
      dispatch({ type: ActionTypes.SET_DONENESS, payload: doneness });
    },
    setNotifications: (notifications) => {
      dispatch({ type: ActionTypes.SET_NOTIFICATIONS, payload: notifications });
    },
    setLanguage: (language) => {
      dispatch({ type: ActionTypes.SET_LANGUAGE, payload: language });
    },
    resetSettings: () => {
      dispatch({ type: ActionTypes.RESET_SETTINGS });
    },
    
    // Сброс только настроек яиц
    resetEggSettings: () => {
      dispatch({ type: ActionTypes.SET_SIZE, payload: null });
      dispatch({ type: ActionTypes.SET_TEMPERATURE, payload: false });
      dispatch({ type: ActionTypes.SET_DONENESS, payload: 'soft' });
    },
    
    // Управление таймером
    startTimer: (totalTime) => {
      dispatch({ type: ActionTypes.START_TIMER, payload: totalTime });
    },
    pauseTimer: () => {
      dispatch({ type: ActionTypes.PAUSE_TIMER });
    },
    resumeTimer: () => {
      dispatch({ type: ActionTypes.RESUME_TIMER });
    },
    resetTimer: (totalTime) => {
      dispatch({ type: ActionTypes.RESET_TIMER, payload: totalTime });
    },
    updateTimeLeft: (timeLeft) => {
      dispatch({ type: ActionTypes.UPDATE_TIME_LEFT, payload: timeLeft });
    },
    setTimerState: (timerState) => {
      dispatch({ type: ActionTypes.SET_TIMER_STATE, payload: timerState });
    },
  };

  const value = {
    ...state,
    ...actions,
  };

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
};

// Хук для использования контекста
export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings должен использоваться внутри SettingsProvider');
  }
  return context;
};

export { ACTIVE_TAB_TYPE };
export default SettingsContext;
