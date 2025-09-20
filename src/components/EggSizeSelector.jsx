import React, { useMemo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useSettings } from '../context/SettingsContext';
import { EGG_SIZE_SYSTEMS } from '../data/eggSizes';
import SelectBox from './SelectBox';

/**
 * Компонент для выбора размера яйца
 */
const EggSizeSelector = () => {
  // Получаем настройки из контекста
  const { selectedCountry, selectedSize, setSize } = useSettings();

  const currentSystem = EGG_SIZE_SYSTEMS[selectedCountry];
  const currentSize = currentSystem?.sizes.find(size => size.id === selectedSize);

  // Преобразуем размеры в формат для SelectBox
  const sizeOptions = useMemo(() => {
    if (!currentSystem) return [];
    
    return currentSystem.sizes.map(size => ({
      value: size.id,
      label: `${size.name} - ${size.label}`,
      description: size.label,
      weight: `${size.minWeight}+${size?.maxWeight ? `-${size?.maxWeight}` : ''}г`
    }));
  }, [currentSystem]);

  // Кастомный рендер для опций размера
  const renderSizeOption = (option) => (
    <View style={styles.optionContent}>
      <Text style={styles.optionName}>{option.label.split(' - ')[0]}</Text>
      <Text style={styles.optionDescription}>{option.description}</Text>
      <Text style={styles.optionWeight}>{option.weight}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <SelectBox
        label="Размер яйца"
        placeholder="Выберите размер"
        options={sizeOptions}
        selectedValue={selectedSize}
        onSelect={setSize}
        disabled={!currentSystem}
        disabledText="Сначала выберите страну в настройках"
        renderOption={renderSizeOption}
      />

      {/* Информация о выбранном размере */}
      {currentSize && (
        <View style={styles.infoBox}>
          <Text style={styles.infoTitle}>Информация о размере:</Text>
          <Text style={styles.infoText}>
            {currentSize.name} ({currentSize.label})
          </Text>
          <Text style={styles.infoText}>
            Вес: {currentSize.minWeight}+{currentSize.maxWeight ? `-${currentSize.maxWeight}` : ''}г
          </Text>
          <Text style={styles.infoText}>
            Страна: {currentSystem.flag} {currentSystem.name}
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
  },
  optionContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  optionName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    minWidth: 60,
  },
  optionDescription: {
    fontSize: 14,
    color: '#666',
    flex: 1,
    marginLeft: 12,
  },
  optionWeight: {
    fontSize: 12,
    color: '#999',
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  infoBox: {
    backgroundColor: '#f8f9fa',
    padding: 12,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#4CAF50',
    marginTop: 8,
  },
  infoTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  infoText: {
    fontSize: 13,
    color: '#666',
    marginBottom: 2,
  },
});

export default EggSizeSelector;
