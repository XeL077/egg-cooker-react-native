import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useSettings } from '../context/SettingsContext';
import { getCISSystem } from '../data/eggSizes';
import { colors, textStyles } from '../theme';
import { normalizePadding, normalizeFontSize } from '../utils/responsive';

/**
 * Компонент для выбора размера яйца (СНГ) - минималистичный дизайн
 */
const EggSizeSelector = () => {
  // Получаем настройки из контекста
  const { selectedSize, setSize } = useSettings();

  const cisSystem = getCISSystem();

  return (
    <View style={styles.container}>      
      {/* Chips для выбора размера */}
      <View style={styles.chipsContainer}>
        {cisSystem.sizes.map((size) => {
          const isSelected = selectedSize === size.id;
          return (
            <TouchableOpacity
              key={size.id}
              style={[
                styles.chip,
                isSelected && styles.chipSelected
              ]}
              onPress={() => setSize(size.id)}
              activeOpacity={0.7}
            >
              <Text style={[
                styles.chipName,
                isSelected && styles.chipNameSelected
              ]}>
                {size.name}
              </Text>
              <Text style={[
                styles.chipLabel,
                isSelected && styles.chipLabelSelected
              ]}>
                {size.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: normalizePadding(10),
    backgroundColor: colors.backgroundPrimary,
  },
  label: {
    ...textStyles.label,
    fontSize: normalizeFontSize(13),
    fontWeight: '600',
    color: colors.textSecondary,
    marginBottom: normalizePadding(8),
  },
  chipsContainer: {
    flexDirection: 'row',
    gap: normalizePadding(10),
  },
  chip: {
    flex: 1,
    backgroundColor: colors.backgroundPrimary,
    borderWidth: 1,
    borderColor: colors.borderLight,
    paddingVertical: normalizePadding(4),
    alignItems: 'center',
  },
  chipSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  chipName: {
    fontSize: normalizeFontSize(13),
    fontWeight: '700',
    color: colors.textPrimary,
  },
  chipLabel: {
    fontSize: normalizeFontSize(10),
    color: colors.textSecondary,
    textAlign: 'center',
  },
});

export default EggSizeSelector;
