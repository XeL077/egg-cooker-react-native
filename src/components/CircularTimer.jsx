import React, { useEffect, useMemo } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { colors, textStyles } from '../theme';
import { formatTime } from '../utils/utils';
import { useSettings } from '../context/SettingsContext';
import { normalizeCircularSize, normalizeFontSize, normalizePadding } from '../utils/responsive';

/**
 * Компонент круглого таймера с обратным отсчетом
 * @param {number} initTime - Начальное время в секундах
 * @param {function} onTimeEnd - Callback когда время истекает
 */
function CircularTimer (props) {
  const {initTime, onTimeEnd} = props;
  const { 
    timerState: contextTimerState, 
    resetTimer,
    updateTimeLeft 
  } = useSettings();

  // Эффект для управления таймером
  useEffect(() => {
    let interval = null;
    
    if (contextTimerState.state === 'running' && contextTimerState.timeLeft > 0) {
      interval = setInterval(() => {
        const elapsed = Math.floor((Date.now() - contextTimerState.startTime) / 1000);
        const newTimeLeft = Math.max(0, contextTimerState.totalTime - elapsed);
        
        updateTimeLeft(newTimeLeft);
        
        if (newTimeLeft <= 0) {
          onTimeEnd();
        }
      }, 100); // Обновляем чаще для более точного отображения
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [contextTimerState.state, contextTimerState.startTime, contextTimerState.totalTime, contextTimerState.timeLeft, updateTimeLeft, onTimeEnd]);

  // Инициализация таймера с начальным временем (обновляем только в idle состоянии)
  useEffect(() => {
    if (contextTimerState.state === 'idle') {
      resetTimer(initTime);
    }
  }, [initTime]);
  
  // Однократная инициализация при монтировании
  useEffect(() => {
    if (contextTimerState.totalTime === 300 && initTime !== 300) {
      resetTimer(initTime);
    }
  }, []);

  // Расчет прогресса для круга
  const progress = useMemo(() => {
    if (contextTimerState.totalTime === 0) return 0;
    return (contextTimerState.timeLeft / contextTimerState.totalTime) * 100;
  }, [contextTimerState.timeLeft, contextTimerState.totalTime]);
  
  // Адаптивные параметры круга
  const screenData = Dimensions.get('window');
  const minDimension = Math.min(screenData.width, screenData.height);
  const circleSize = normalizeCircularSize(Math.min(200, minDimension * 0.6));
  const strokeWidth = normalizeCircularSize(12);
  const radius = (circleSize - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;
  
  return (
    <View style={[
      styles.container,
      contextTimerState.state !== 'idle' && styles.containerExpanded
    ]}>
      {/* Круговой прогресс */}
      <View style={styles.progressContainer}>
        <Svg width={circleSize} height={circleSize} style={styles.progressSvg}>
          {/* Фоновый круг */}
          <Circle
            cx={circleSize / 2}
            cy={circleSize / 2}
            r={radius}
            stroke={colors.borderLight || '#e0e0e0'}
            strokeWidth={strokeWidth}
            fill="none"
          />
          {/* Прогресс круг */}
          <Circle
            cx={circleSize / 2}
            cy={circleSize / 2}
            r={radius}
            stroke={contextTimerState.state === 'running' ? colors.primary : colors.secondary}
            strokeWidth={strokeWidth}
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            transform={`rotate(-90 ${circleSize / 2} ${circleSize / 2})`}
          />
        </Svg>
        
        {/* Время в центре круга */}
        <View style={styles.timeContainer}>
          <Text style={styles.timeText}>{formatTime(contextTimerState.timeLeft)}</Text>
          <Text style={styles.totalTimeText}>из {formatTime(contextTimerState.totalTime)}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerExpanded: {
    flex: 1,
  },
  progressContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressSvg: {
    // SVG уже правильно ориентирован через transform в Circle
  },
  timeContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  timeText: {
    ...textStyles.timer,
    fontSize: normalizeFontSize(36),
    color: colors.textPrimary,
    fontWeight: '700',
  },
  totalTimeText: {
    fontSize: normalizeFontSize(14),
    color: colors.textSecondary,
    marginTop: normalizePadding(4),
  },
});

export default CircularTimer;
