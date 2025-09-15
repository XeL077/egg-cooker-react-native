import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

/**
 * DonenessSelector - компонент выбора степени готовности яиц
 * @param {string} selectedDoneness - выбранная степень готовности
 * @param {Function} onSelect - callback при выборе степени готовности
 */
const DonenessSelector = ({ selectedDoneness = 'soft', onSelect }) => {
  const donenessOptions = [
    {
      id: 'soft',
      name: 'Всмятку',
      english: 'soft-boiled',
      icon: '🥚',
      description: 'Желток жидкий',
      time: '4-5 мин'
    },
    {
      id: 'semi-soft',
      name: 'Полувсмятку',
      english: 'semi soft',
      icon: '🥚',
      description: 'Желток полужидкий',
      time: '5-6 мин'
    },
    {
      id: 'medium',
      name: 'В мешочек',
      english: 'medium-boiled',
      icon: '🥚',
      description: 'Желток густой',
      time: '6-7 мин'
    },
    {
      id: 'hard',
      name: 'Вкрутую',
      english: 'hard-boiled',
      icon: '🥚',
      description: 'Желток твердый',
      time: '8-10 мин'
    },
    {
      id: 'poached',
      name: 'Пашот',
      english: 'poached',
      icon: '🍳',
      description: 'Без скорлупы',
      time: '3-4 мин'
    }
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Степень готовности:</Text>
      
      <View style={styles.optionsGrid}>
        {donenessOptions.map((option) => (
          <TouchableOpacity
            key={option.id}
            style={[
              styles.option,
              selectedDoneness === option.id ? styles.optionSelected : styles.optionUnselected
            ]}
            onPress={() => onSelect(option.id)}
            activeOpacity={0.7}
          >
            <Text style={styles.optionIcon}>{option.icon}</Text>
            <Text style={[
              styles.optionName,
              selectedDoneness === option.id ? styles.optionTextSelected : styles.optionTextUnselected
            ]}>
              {option.name}
            </Text>
            <Text style={[
              styles.optionEnglish,
              selectedDoneness === option.id ? styles.optionTextSelected : styles.optionTextUnselected
            ]}>
              {option.english}
            </Text>
            <Text style={[
              styles.optionDescription,
              selectedDoneness === option.id ? styles.optionTextSelected : styles.optionTextUnselected
            ]}>
              {option.description}
            </Text>
            <Text style={[
              styles.optionTime,
              selectedDoneness === option.id ? styles.timeTextSelected : styles.timeTextUnselected
            ]}>
              {option.time}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
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
  optionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  option: {
    width: '31%',
    padding: 12,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 12,
    borderWidth: 2,
    minHeight: 120,
    justifyContent: 'center',
  },
  optionSelected: {
    backgroundColor: '#E8F5E8',
    borderColor: '#4CAF50',
  },
  optionUnselected: {
    backgroundColor: '#f8f8f8',
    borderColor: '#e0e0e0',
  },
  optionIcon: {
    fontSize: 28,
    marginBottom: 6,
  },
  optionName: {
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 3,
    textAlign: 'center',
  },
  optionEnglish: {
    fontSize: 10,
    fontStyle: 'italic',
    marginBottom: 3,
    textAlign: 'center',
  },
  optionDescription: {
    fontSize: 10,
    marginBottom: 4,
    textAlign: 'center',
  },
  optionTime: {
    fontSize: 12,
    fontWeight: '600',
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 6,
  },
  optionTextSelected: {
    color: '#2E7D32',
  },
  optionTextUnselected: {
    color: '#666',
  },
  timeTextSelected: {
    color: '#FFFFFF',
    backgroundColor: '#4CAF50',
  },
  timeTextUnselected: {
    color: '#999',
    backgroundColor: '#e0e0e0',
  },
});

export default DonenessSelector;
