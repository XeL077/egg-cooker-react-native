import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { getScreenSize, isTablet } from '../utils/responsive';

/**
 * ResponsiveContainer - адаптивный контейнер с учетом размера экрана
 * Автоматически адаптирует отступы и размеры под различные устройства
 */
const ResponsiveContainer = ({ 
  children, 
  style, 
  padding = true,
  safeArea = true,
  tabletAdjustment = true,
  ...props 
}) => {
  const insets = useSafeAreaInsets();
  const screenSize = getScreenSize();
  const isTabletDevice = isTablet();

  // Адаптивные отступы в зависимости от размера экрана
  const getAdaptivePadding = () => {
    if (!padding) return {};
    
    const basePadding = 16;
    const paddingMultiplier = {
      small: 0.8,   // Меньше отступы на маленьких экранах
      medium: 1.0,  // Стандартные отступы
      large: 1.2,   // Больше отступы на больших экранах
      tablet: 1.5,  // Еще больше отступы на планшетах
    };

    const multiplier = tabletAdjustment && isTabletDevice 
      ? paddingMultiplier.tablet 
      : paddingMultiplier[screenSize] || paddingMultiplier.medium;

    return {
      paddingHorizontal: basePadding * multiplier,
      paddingVertical: basePadding * multiplier * 0.5,
    };
  };

  // Адаптивные отступы для безопасных зон
  const getSafeAreaPadding = () => {
    if (!safeArea || Platform.OS === 'web') return {};
    
    return {
      paddingTop: Math.max(insets.top, 10),
      paddingBottom: Math.max(insets.bottom, 10),
    };
  };

  const containerStyle = [
    styles.container,
    getAdaptivePadding(),
    getSafeAreaPadding(),
    style,
  ];

  return (
    <View style={containerStyle} {...props}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ResponsiveContainer;
