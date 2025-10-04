import React, { useCallback, useMemo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SettingsProvider, useSettings } from './context/SettingsContext';
import Layout from './Layout';
import SplashScreen from './components/SplashScreen';
import DonenessSelector from './components/DonenessSelector';
import CircularTimer from './components/CircularTimer';
import EggSizeSelector from './components/EggSizeSelector';
import AnimatedCollapse from './components/AnimatedCollapse';
import TabNavigation from './components/TabNavigation';
import WeatherView from './views/WeatherView';
import { colors, textStyles } from './theme';
import { getCookingTime } from './data/cookingTimes';
import { normalizePadding, normalizeFontSize } from './utils/responsive';

/**
 * Egg Timer View Component
 * Компонент таймера для варки яиц
 */
const EggTimerView = () => {
  const { 
    isLoading,
    timerState,
    startTimer,
    pauseTimer,
    resumeTimer,
    resetTimer,
    selectedDoneness,
    setDoneness,
    selectedSize,
  } = useSettings();

  // Вычисляем время варки на основе выбранных параметров
  const cookingTime = useMemo(() => {
    return getCookingTime(selectedDoneness, selectedSize);
  }, [selectedDoneness, selectedSize]);

  // Callback когда таймер заканчивается
  const handleTimeEnd = useCallback(() => {
    console.log('Яйцо готово!');
  }, []);

  // Переключение между запуском и паузой
  const handleStartStop = useCallback(() => {
    if (timerState.state === 'idle') {
      startTimer(cookingTime);
    } else if (timerState.state === 'paused') {
      resumeTimer();
    } else if (timerState.state === 'running') {
      pauseTimer();
    } else if (timerState.state === 'stopped') {
      resetTimer(cookingTime);
      startTimer(cookingTime);
    }
  }, [timerState.state, cookingTime, startTimer, resumeTimer, pauseTimer, resetTimer]);

  const handleReset = useCallback(() => {
    resetTimer(cookingTime);
  }, [cookingTime, resetTimer]);

  // Определяем текст и стиль кнопки старт/пауза
  const startStopButtonText = timerState.state === 'running' 
    ? 'Пауза' 
    : timerState.state === 'stopped' 
      ? 'Заново' 
      : 'Старт';
  
  const startStopButtonStyle = timerState.state === 'running' 
    ? styles.pauseButton 
    : styles.startButton;

  return (
    <View style={styles.container}>
      {/* Содержимое EggView */}
      <View style={styles.eggViewContainer}>
        {/* Выбор размера яйца с анимацией скрытия */}
        <AnimatedCollapse visible={timerState.state === 'idle'}>
          <EggSizeSelector />
        </AnimatedCollapse>

        {/* Выбор степени готовности с анимацией скрытия */}
        <AnimatedCollapse visible={timerState.state === 'idle'}>
          <DonenessSelector 
            selectedDoneness={selectedDoneness} 
            onSelect={setDoneness} 
          />
        </AnimatedCollapse>

        {/* Таймер - показываем только когда начат отсчет */}
        <AnimatedCollapse visible={timerState.state !== 'idle'}>
          <View style={styles.timerSection}>
            <CircularTimer 
              initTime={cookingTime} 
              onTimeEnd={handleTimeEnd}
            />
          </View>
        </AnimatedCollapse>
      </View>
      
      {/* Кнопки управления таймером */}
      <View style={styles.timerControls}>
        <TouchableOpacity 
          style={startStopButtonStyle} 
          onPress={handleStartStop}
        >
          <Text style={styles.buttonText}>{startStopButtonText}</Text>
        </TouchableOpacity>
        
        {/* Кнопка сброса только в режиме паузы */}
        {timerState.state === 'paused' && (
          <TouchableOpacity style={styles.resetButton} onPress={handleReset}>
            <Text style={styles.resetButtonText}>Сброс</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

/**
 * Main App Content Component
 * Управляет переключением между табами
 */
const AppContent = () => {
  const { isLoading, activeTab } = useSettings();

  if (isLoading) {
    return <SplashScreen isLoading={true} />;
  }

  return (
    <Layout>
      <TabNavigation />
      {activeTab === 'egg' && <EggTimerView />}
      {activeTab === 'weather' && <WeatherView />}
    </Layout>
  );
};

const App = () => (
  <SettingsProvider>
    <AppContent />
  </SettingsProvider>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  eggViewContainer: {
    flex: 1,
    backgroundColor: colors.backgroundSecondary,
  },
  timerSection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  timerControls: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: normalizePadding(15),
    backgroundColor: colors.backgroundPrimary,
    borderTopWidth: 1,
    borderTopColor: colors.borderLight,
    paddingVertical: normalizePadding(16),
  },
  startButton: {
    backgroundColor: colors.secondary,
    paddingHorizontal: normalizePadding(30),
    paddingVertical: normalizePadding(15),
    borderRadius: normalizePadding(25),
    shadowColor: colors.shadowMedium,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  pauseButton: {
    backgroundColor: colors.accent,
    paddingHorizontal: normalizePadding(30),
    paddingVertical: normalizePadding(15),
    borderRadius: normalizePadding(25),
    shadowColor: colors.shadowMedium,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonText: {
    ...textStyles.button,
    color: colors.textInverse,
    fontSize: normalizeFontSize(16),
    fontWeight: '600',
  },
  resetButton: {
    backgroundColor: colors.error,
    paddingHorizontal: normalizePadding(24),
    paddingVertical: normalizePadding(15),
    borderRadius: normalizePadding(25),
    shadowColor: colors.shadowMedium,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  resetButtonText: {
    ...textStyles.button,
    color: colors.textInverse,
    fontSize: normalizeFontSize(16),
    fontWeight: '600',
  },
});

export default App;
