import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors, textStyles } from '../theme';

import Svg, { Path } from "react-native-svg"

/**
 * SVG компонент яйца с настраиваемыми параметрами
 */
const SvgComponent = ({ 
  width = 200, 
  height = 280, 
  fillColor = '#000000', 
  showGradient = true,
  ...props 
}) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    viewBox="0 0 1008 1280"
    {...props}
  >
    <Path 
      d="M469.9 46.5c-14.2 2-45.8 10.7-58.3 16-26.8 11.4-35.9 17-65.6 40.2-23.6 18.4-60 53.7-75.7 73.3-20.9 26.2-39.7 52.5-50 70-2.8 4.7-10.9 18.4-18.1 30.5-25.1 42.5-34.2 60.1-54.8 106.7-18.8 42.5-35.1 88.2-57.4 160.3-6.8 21.9-16.2 56.9-17.4 64.6-.3 2-3 16-6.1 31.2-5 25-11.4 63.8-12 72.7-.2 1.9-.6 8-.9 13.5-.4 5.5-1.1 16.5-1.6 24.5-2.1 31.4-.7 77.2 3.1 106.5 1.6 12.4 6.7 38.8 9.5 49.4 3.7 13.8 19.2 58.7 25.9 75.2 6.1 14.8 22.1 46.5 31.4 62.2 7.9 13.2 25 36.9 39.5 54.7 13 15.9 24.2 27.6 38.6 40 7.5 6.5 17.6 15.5 22.4 19.9 14.2 13.1 42.2 32.8 63.2 44.4 21.6 11.9 55.5 26.9 76.9 33.9 20.8 6.8 51.4 14 67.5 15.8 5.2.6 15.1 1.8 22 2.5 16.5 1.9 56.7 1.9 72.5 0 40-4.8 62.8-9.2 85.5-16.6 22.6-7.4 62.4-23.8 76.5-31.5 9.9-5.4 60.2-39.3 70-47.1 5.5-4.4 20.6-18.8 33.6-31.9 26.5-26.9 38-41.4 60.3-75.7 10.4-16.1 15.6-25.6 27.6-50.5 19.5-40.3 26.2-59.3 37.9-106.5 13.3-53.5 15.5-71 15.5-124.2 0-48.7-2.6-80.9-9.9-119-2.5-13.2-4.7-25.8-4.9-28-.1-2.2-.5-4.7-.9-5.5-.3-.8-1.8-7.6-3.2-15-5.9-30.4-9.6-43.7-24.2-89-10-31.2-26.8-78.1-37.3-104.5-9.3-23.4-54.5-115.8-65.5-134-16.9-27.8-47.7-72.3-65.7-94.6-16.9-21.1-47.5-52.9-66.1-68.7-10.5-9-52.3-37.5-62.2-42.5-13.4-6.7-37.1-15.2-53.8-19.2-18.1-4.4-51.1-6.4-67.8-4z" 
      fill={fillColor}
    />
  </Svg>
)


/**
 * Компонент круглого таймера с обратным отсчетом
 * @param {number} initialTime - Начальное время в секундах
 * @param {function} onTimeEnd - Callback когда время истекает
 * @param {boolean} autoStart - Автоматически запускать таймер
 */
const CircularTimer = ({ 
  initialTime = 300, // 5 минут по умолчанию
  onTimeEnd = () => {},
  autoStart = false 
}) => {
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const [isRunning, setIsRunning] = useState(autoStart);
  const [isPaused, setIsPaused] = useState(false);

  // Форматирование времени в MM:SS
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  // Расчет процента оставшегося времени (от 100% до 0%)
  const getProgressPercentage = () => {
    if (initialTime === 0) return 0;
    return (timeLeft / initialTime) * 100;
  };

  // Расчет размеров прогресс-яйца
  const getProgressDimensions = () => {
    const percentage = getProgressPercentage();
    
    // Если время истекло, прогресс-яйцо полностью исчезает
    if (percentage <= 0) {
      return { width: 0, height: 0 };
    }
    
    const maxWidth = 180;  // Максимальная ширина яйца
    const minWidth = 30;   // Минимальная ширина яйца
    const maxHeight = 250; // Максимальная высота яйца
    const minHeight = 40;  // Минимальная высота яйца
    
    return {
      width: minWidth + ((maxWidth - minWidth) * percentage / 100),
      height: minHeight + ((maxHeight - minHeight) * percentage / 100),
    };
  };

  // Обратный отсчет
  useEffect(() => {
    let interval = null;
    
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft => {
          if (timeLeft <= 1) {
            setIsRunning(false);
            onTimeEnd();
            return 0;
          }
          return timeLeft - 1;
        });
      }, 1000);
    } else if (!isRunning && timeLeft !== 0) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isRunning, timeLeft, onTimeEnd]);

  // Обработчики кнопок
  const handleStart = () => {
    if (timeLeft === 0) {
      setTimeLeft(initialTime);
    }
    setIsRunning(true);
    setIsPaused(false);
  };

  const handlePause = () => {
    setIsRunning(false);
    setIsPaused(true);
  };

  const handleReset = () => {
    setIsRunning(false);
    setIsPaused(false);
    setTimeLeft(initialTime);
  };

  // Определяем текст и действие кнопки
  const getButtonAction = () => {
    if (timeLeft === 0) return { text: 'Запустить', action: handleStart };
    if (isRunning) return { text: 'Пауза', action: handlePause };
    if (isPaused) return { text: 'Продолжить', action: handleStart };
    return { text: 'Запустить', action: handleStart };
  };

  const buttonAction = getButtonAction();

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.eggButton}
        onPress={buttonAction.action}
        activeOpacity={0.8}
      >
        {/* Фоновое яйцо */}
        <View style={styles.backgroundContainer}>
          <SvgComponent 
            width={200} 
            height={280} 
            fillColor="#E0E0E0" 
            showGradient={false}
          />
        </View>
        
        {/* Прогресс-яйцо */}
        <View style={styles.progressContainer}>
          <SvgComponent 
            width={getProgressDimensions().width} 
            height={getProgressDimensions().height} 
            fillColor="#007AFF" 
            showGradient={true}
          />
        </View>
        
        
        {/* Контент таймера */}
        <View style={styles.timerContent}>
          <Text style={styles.timeText}>{formatTime(timeLeft)}</Text>
          <Text style={styles.buttonText}>{buttonAction.text}</Text>
        </View>
      </TouchableOpacity>
      
      {/* Кнопка сброса */}
      <TouchableOpacity 
        style={styles.resetButton}
        onPress={handleReset}
        activeOpacity={0.7}
      >
        <Text style={styles.resetButtonText}>Сброс</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  eggButton: {
    width: 200,
    height: 280,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    marginBottom: 40,
    position: 'relative',
  },
  backgroundContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  progressContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
  },
  timerContent: {
    alignItems: 'center',
    zIndex: 3,
  },
  timeText: {
    ...textStyles.timer,
    fontSize: 42,
    color: colors.white,
    marginBottom: 6,
    textShadowColor: colors.shadowMedium,
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  buttonText: {
    ...textStyles.button,
    color: colors.white,
    opacity: 0.9,
    textShadowColor: colors.shadowMedium,
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  resetButton: {
    backgroundColor: colors.error,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 20,
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
    color: colors.white,
  },
});

export default CircularTimer;
