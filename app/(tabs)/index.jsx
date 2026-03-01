import React, { useCallback, useEffect, useMemo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useSettings } from '../../src/context/SettingsContext';
import Layout from '../../src/Layout';
import DonenessSelector from '../../src/components/DonenessSelector';
import CircularTimer from '../../src/components/CircularTimer';
import EggSizeSelector from '../../src/components/EggSizeSelector';
import AnimatedCollapse from '../../src/components/AnimatedCollapse';
import { colors, textStyles } from '../../src/theme';
import { getCookingTime } from '../../src/data/cookingTimes';
import { normalizePadding, normalizeFontSize } from '../../src/utils/responsive';

export default function EggTimerScreen() {
  const {
    timerState,
    startTimer,
    pauseTimer,
    resumeTimer,
    resetTimer,
    selectedDoneness,
    setDoneness,
    selectedSize,
  } = useSettings();

  const cookingTime = useMemo(() => {
    return getCookingTime(selectedDoneness, selectedSize);
  }, [selectedDoneness, selectedSize]);

  // При смене типа варки или размера в режиме idle обновляем время в контексте
  useEffect(() => {
    if (timerState.state === 'idle') {
      resetTimer(cookingTime);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- синхронизируем только по cookingTime/state
  }, [cookingTime, timerState.state]);

  const handleTimeEnd = useCallback(() => {
    console.log('Яйцо готово!');
  }, []);

  const handleStartStop = useCallback(() => {
    if (timerState.state === 'idle') {
      // Всегда берём актуальное время по текущим selectedDoneness/selectedSize
      const time = getCookingTime(selectedDoneness, selectedSize);
      startTimer(time);
    } else if (timerState.state === 'paused') {
      resumeTimer();
    } else if (timerState.state === 'running') {
      pauseTimer();
    } else if (timerState.state === 'stopped') {
      const time = getCookingTime(selectedDoneness, selectedSize);
      resetTimer(time);
      startTimer(time);
    }
  }, [timerState.state, selectedDoneness, selectedSize, startTimer, resumeTimer, pauseTimer, resetTimer]);

  const handleReset = useCallback(() => {
    resetTimer(cookingTime);
  }, [cookingTime, resetTimer]);

  const startStopButtonText =
    timerState.state === 'running'
      ? 'Пауза'
      : timerState.state === 'stopped'
        ? 'Заново'
        : 'Старт';

  const startStopButtonStyle =
    timerState.state === 'running' ? styles.pauseButton : styles.startButton;

  return (
    <Layout>
      <View style={styles.container}>
        <View style={styles.eggViewContainer}>
          <AnimatedCollapse visible={timerState.state === 'idle'}>
            <EggSizeSelector />
          </AnimatedCollapse>
          <AnimatedCollapse visible={timerState.state === 'idle'}>
            <DonenessSelector
              selectedDoneness={selectedDoneness}
              onSelect={setDoneness}
            />
          </AnimatedCollapse>
          <AnimatedCollapse visible={timerState.state !== 'idle'} style={styles.timerCollapse}>
            <View style={styles.timerSection}>
              <CircularTimer initTime={cookingTime} onTimeEnd={handleTimeEnd} />
            </View>
          </AnimatedCollapse>
        </View>

        <View style={styles.timerControls}>
          <TouchableOpacity
            style={startStopButtonStyle}
            onPress={handleStartStop}
          >
            <Text style={styles.buttonText}>{startStopButtonText}</Text>
          </TouchableOpacity>
          {timerState.state === 'paused' && (
            <TouchableOpacity style={styles.resetButton} onPress={handleReset}>
              <Text style={styles.resetButtonText}>Сброс</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  eggViewContainer: {
    flex: 1,
    backgroundColor: colors.backgroundSecondary,
  },
  timerCollapse: {
    flex: 1,
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
    shadowOffset: { width: 0, height: 2 },
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
    shadowOffset: { width: 0, height: 2 },
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
    shadowOffset: { width: 0, height: 2 },
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
