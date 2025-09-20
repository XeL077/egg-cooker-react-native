import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

/**
 * Универсальный компонент SelectBox для выбора из списка
 * @param {String} label - Заголовок селекта
 * @param {String} placeholder - Текст placeholder
 * @param {Array} options - Массив опций для выбора
 * @param {String|Number} selectedValue - Выбранное значение
 * @param {Function} onSelect - Callback при выборе опции
 * @param {Boolean} disabled - Заблокирован ли селект
 * @param {String} disabledText - Текст для заблокированного состояния
 * @param {Function} renderOption - Функция для кастомного рендера опции
 * @param {Object} style - Дополнительные стили
 */
const SelectBox = ({
  label,
  placeholder = 'Выберите опцию',
  options = [],
  selectedValue,
  onSelect,
  disabled = false,
  disabledText = 'Сначала выберите предыдущий параметр',
  renderOption,
  style,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (value) => {
    onSelect(value);
    setIsOpen(false);
  };

  const handleToggle = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };

  // Находим выбранную опцию
  const selectedOption = options.find(option => option.value === selectedValue);

  // Функция рендера опции по умолчанию
  const defaultRenderOption = (option) => (
    <View style={styles.optionContent}>
      <Text style={styles.optionText}>{option.label}</Text>
      {option.description && (
        <Text style={styles.optionDescription}>{option.description}</Text>
      )}
      {option.weight && (
        <Text style={styles.optionWeight}>{option.weight}</Text>
      )}
    </View>
  );

  return (
    <View style={[styles.container, style]}>
      {label && <Text style={styles.label}>{label}</Text>}
      
      <TouchableOpacity 
        style={[
          styles.selector,
          disabled && styles.disabledSelector,
          isOpen && styles.openSelector
        ]}
        onPress={handleToggle}
        disabled={disabled}
      >
        <Text style={[
          styles.selectorText,
          disabled && styles.disabledText
        ]}>
          {disabled 
            ? disabledText 
            : selectedOption 
              ? selectedOption.label 
              : placeholder
          }
        </Text>
        <Text style={styles.arrow}>{isOpen ? '▲' : '▼'}</Text>
      </TouchableOpacity>

      {isOpen && !disabled && options.length > 0 && (
        <ScrollView 
          style={styles.dropdown} 
          showsVerticalScrollIndicator={false}
          nestedScrollEnabled={true}
        >
          {options.map((option, index) => (
            <TouchableOpacity
              key={option.value || index}
              style={[
                styles.option,
                selectedValue === option.value && styles.selectedOption
              ]}
              onPress={() => handleSelect(option.value)}
            >
              {renderOption ? renderOption(option) : defaultRenderOption(option)}
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  selector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    minHeight: 48,
  },
  disabledSelector: {
    backgroundColor: '#f5f5f5',
    borderColor: '#ccc',
  },
  openSelector: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    borderBottomColor: '#e0e0e0',
  },
  selectorText: {
    fontSize: 16,
    color: '#333',
    flex: 1,
  },
  disabledText: {
    color: '#999',
  },
  arrow: {
    fontSize: 12,
    color: '#666',
    marginLeft: 8,
  },
  dropdown: {
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    borderTopWidth: 0,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    maxHeight: 200,
    zIndex: 1000,
  },
  option: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  selectedOption: {
    backgroundColor: '#e3f2fd',
  },
  optionContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  optionText: {
    fontSize: 16,
    color: '#333',
    flex: 1,
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
});

export default SelectBox;
