import { useState, useEffect } from 'react';
import { Dimensions } from 'react-native';
import { 
  getScreenSize, 
  isTablet, 
  normalizeSize,
  getResponsiveDimensions 
} from '../utils/responsive';

/**
 * Хук для отслеживания изменений размеров экрана
 * Предоставляет адаптивные значения в реальном времени
 */
export const useResponsive = () => {
  const [screenData, setScreenData] = useState(() => Dimensions.get('window'));

  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({ window }) => {
      setScreenData(window);
    });

    return () => subscription?.remove();
  }, []);

  const screenSize = getScreenSize();
  const isTabletDevice = isTablet();
  const isLandscape = screenData.width > screenData.height;

  return {
    // Размеры экрана
    width: screenData.width,
    height: screenData.height,
    isLandscape,
    
    // Тип устройства
    screenSize, // 'small' | 'medium' | 'large' | 'tablet'
    isTablet: isTabletDevice,
    
    // Адаптивные функции
    normalizeSize: (size) => normalizeSize(size),
    
    // Адаптивные размеры для компонентов
    getDimensions: (baseWidth, baseHeight) => 
      getResponsiveDimensions(baseWidth, baseHeight),
    
    // Условная логика для разных размеров экрана
    isSmallScreen: screenSize === 'small',
    isMediumScreen: screenSize === 'medium',
    isLargeScreen: screenSize === 'large',
    isTabletScreen: screenSize === 'tablet',
    
    // Адаптивные значения
    spacing: {
      xs: normalizeSize(4),
      sm: normalizeSize(8),
      md: normalizeSize(16),
      lg: normalizeSize(24),
      xl: normalizeSize(32),
    },
    
    fontSize: {
      xs: normalizeSize(10),
      sm: normalizeSize(12),
      md: normalizeSize(14),
      lg: normalizeSize(16),
      xl: normalizeSize(18),
      xxl: normalizeSize(20),
      xxxl: normalizeSize(24),
    },
  };
};

export default useResponsive;
