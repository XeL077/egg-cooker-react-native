import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';

/**
 * TemperatureToggle - Компонент настройки начальной температуры воды
 * @param {boolean} isHot - состояние температуры (true = кипяток, false = холодная вода)
 * @param {Function} onToggle - callback при изменении состояния
 */
const TemperatureToggle = ({ isHot = false, onToggle }) => {
  const slideAnim = React.useRef(new Animated.Value(isHot ? 1 : 0)).current;

  React.useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: isHot ? 1 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [isHot, slideAnim]);

  const handleToggle = () => {
    onToggle(!isHot);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Температура воды:</Text>
      
      <TouchableOpacity style={styles.toggleContainer} onPress={handleToggle}>
        {/* Фон переключателя */}
        <View style={styles.toggleBackground}>
          <Animated.View 
            style={[
              styles.toggleSlider,
              {
                transform: [{
                  translateX: slideAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 120], // ширина контейнера минус ширина слайдера
                  })
                }]
              }
            ]}
          />
        </View>

        {/* Опции */}
        <View style={styles.optionsContainer}>
          {/* Холодная вода */}
          <View style={[styles.option, isHot ? styles.optionInactive : styles.optionActive]}>
            <Text style={styles.waterIcon}>💧</Text>
            <Text style={[styles.optionText, isHot ? styles.optionTextInactive : styles.optionTextActive]}>
              Холодная вода
            </Text>
            <Text style={[styles.temperatureText, isHot ? styles.optionTextInactive : styles.optionTextActive]}>
              10-20°C
            </Text>
          </View>

          {/* Кипяток */}
          <View style={[styles.option, isHot ? styles.optionActive : styles.optionInactive]}>
            <Text style={styles.waterIcon}>♨️</Text>
            <Text style={[styles.optionText, isHot ? styles.optionTextActive : styles.optionTextInactive]}>
              Кипяток
            </Text>
            <Text style={[styles.temperatureText, isHot ? styles.optionTextActive : styles.optionTextInactive]}>
              79-99°C
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    margin: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  label: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 16,
    textAlign: 'center',
  },
  toggleContainer: {
    alignItems: 'center',
  },
  toggleBackground: {
    width: 240,
    height: 50,
    backgroundColor: '#f0f0f0',
    borderRadius: 25,
    position: 'relative',
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#e0e0e0',
  },
  toggleSlider: {
    position: 'absolute',
    top: 2,
    left: 2,
    width: 116,
    height: 42,
    backgroundColor: '#4CAF50',
    borderRadius: 21,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 240,
  },
  option: {
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    minWidth: 100,
  },
  optionActive: {
    backgroundColor: '#E8F5E8',
  },
  optionInactive: {
    backgroundColor: 'transparent',
  },
  waterIcon: {
    fontSize: 24,
    marginBottom: 4,
  },
  optionText: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 2,
  },
  optionTextActive: {
    color: '#2E7D32',
  },
  optionTextInactive: {
    color: '#666',
  },
  temperatureText: {
    fontSize: 12,
    fontWeight: '500',
  },
});

export default TemperatureToggle;
