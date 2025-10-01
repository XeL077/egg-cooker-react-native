import React, { createContext, useContext, useReducer, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ACTIVE_TAB_TYPE = {
  TIMER: 'timer',
  EGG: 'egg',
}

// Ключи для AsyncStorage
const STORAGE_KEYS = {
  ACTIVE_TAB: 'active_tab',
  COUNTRY: 'egg_timer_country',
  SIZE: 'egg_timer_size',
  TEMPERATURE: 'egg_timer_temperature',
  DONENESS: 'egg_timer_doneness',
  NOTIFICATIONS: 'egg_timer_notifications',
  LANGUAGE: 'egg_timer_language',
};

// Начальное состояние настроек
const initialState = {
  activeTab: ACTIVE_TAB_TYPE.TIMER,
  selectedCountry: 'CIS',
  selectedSize: null,
  isHotWater: false,
  selectedDoneness: 'soft',
  notifications: {
    sound: true,
    vibration: true,
  },
  language: 'ru',
  isLoading: true,
};

// Типы действий
const ActionTypes = {
  SET_ACTIVE_TAB: 'SET_ACTIVE_TAB',
  SET_LOADING: 'SET_LOADING',
  SET_COUNTRY: 'SET_COUNTRY',
  SET_SIZE: 'SET_SIZE',
  SET_TEMPERATURE: 'SET_TEMPERATURE',
  SET_DONENESS: 'SET_DONENESS',
  SET_NOTIFICATIONS: 'SET_NOTIFICATIONS',
  SET_LANGUAGE: 'SET_LANGUAGE',
  RESET_SETTINGS: 'RESET_SETTINGS',
};

// Редьюсер для управления состоянием
const settingsReducer = (state, action) => {
  switch (action.type) {
    case ActionTypes.SET_ACTIVE_TAB:
      return { ...state, activeTab: action.payload };
    
    case ActionTypes.SET_LOADING:
      return { ...state, isLoading: action.payload };
    
    case ActionTypes.SET_COUNTRY:
      return { 
        ...state, 
        selectedCountry: action.payload,
        selectedSize: null // Сбрасываем размер при смене страны
      };
    
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
        country,
        activeTab,
        size,
        temperature,
        doneness,
        notifications,
        language
      ] = await Promise.all([
        AsyncStorage.getItem(STORAGE_KEYS.COUNTRY),
        AsyncStorage.getItem(STORAGE_KEYS.ACTIVE_TAB),
        AsyncStorage.getItem(STORAGE_KEYS.SIZE),
        AsyncStorage.getItem(STORAGE_KEYS.TEMPERATURE),
        AsyncStorage.getItem(STORAGE_KEYS.DONENESS),
        AsyncStorage.getItem(STORAGE_KEYS.NOTIFICATIONS),
        AsyncStorage.getItem(STORAGE_KEYS.LANGUAGE),
      ]);

      // Применяем загруженные настройки
      if (country) dispatch({ type: ActionTypes.SET_COUNTRY, payload: country });
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
        AsyncStorage.setItem(STORAGE_KEYS.COUNTRY, state.selectedCountry),
        AsyncStorage.setItem(STORAGE_KEYS.SIZE, state.selectedSize || ''),
        AsyncStorage.setItem(STORAGE_KEYS.TEMPERATURE, state.isHotWater.toString()),
        AsyncStorage.setItem(STORAGE_KEYS.DONENESS, state.selectedDoneness),
        AsyncStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(state.notifications)),
        AsyncStorage.setItem(STORAGE_KEYS.LANGUAGE, state.language),
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
    setCountry: (country) => {
      dispatch({ type: ActionTypes.SET_COUNTRY, payload: country });
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
      dispatch({ type: ActionTypes.SET_COUNTRY, payload: 'CIS' });
      dispatch({ type: ActionTypes.SET_SIZE, payload: null });
      dispatch({ type: ActionTypes.SET_TEMPERATURE, payload: false });
      dispatch({ type: ActionTypes.SET_DONENESS, payload: 'soft' });
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

export default SettingsContext;
