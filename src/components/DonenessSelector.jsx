import React, { useEffect, useMemo, useRef, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList } from 'react-native';
import imgSoftBoiled from '../assets/img/soft-boiled.png';
import imgSemiSoft from '../assets/img/semi-soft.png';
import imgMediumBoiled from '../assets/img/medium-boiled.png';
import imgHardBoiled from '../assets/img/hard-boiled.png';
import imgPoached from '../assets/img/poached.png';
import { getCookingTimeRange } from '../data/cookingTimes';
import { useSettings } from '../context/SettingsContext';
import { normalizePadding, normalizeFontSize, normalizeImageSize } from '../utils/responsive';

/**
 * DonenessSelector - компонент выбора степени готовности яиц
 * @param {string} selectedDoneness - выбранная степень готовности
 * @param {Function} onSelect - callback при выборе степени готовности
 */
const DonenessSelector = ({ selectedDoneness = 'soft', onSelect }) => {
  const { selectedSize } = useSettings();
  
  // Опции степени готовности с динамическим временем
  const donenessOptions = useMemo(() => [
    {
      id: 'soft',
      name: 'Всмятку',
      english: 'soft-boiled',
      icon: '🥚',
      image: imgSoftBoiled,
      description: 'Желток жидкий',
      time: getCookingTimeRange('soft', selectedSize)
    },
    {
      id: 'medium',
      name: 'В мешочек',
      english: 'medium-boiled',
      icon: '🥚',
      image: imgMediumBoiled,
      description: 'Желток густой',
      time: getCookingTimeRange('medium', selectedSize)
    },
    {
      id: 'hard',
      name: 'Вкрутую',
      english: 'hard-boiled',
      icon: '🥚',
      image: imgHardBoiled,
      description: 'Желток твердый',
      time: getCookingTimeRange('hard', selectedSize)
    }
  ], [selectedSize]);

  const listRef = useRef(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const selectedIndex = useMemo(() => {
    const idx = donenessOptions.findIndex(o => o.id === selectedDoneness);
    return Math.max(0, idx);
  }, [selectedDoneness, donenessOptions]);

  useEffect(() => {
    if (!listRef.current || containerWidth === 0) return;
    if (selectedIndex >= 0) {
      try {
        listRef.current.scrollToIndex({ index: selectedIndex, animated: true });
        setCurrentIndex(selectedIndex);
      } catch {}
    }
  }, [selectedIndex, containerWidth]);

  const handleMomentumEnd = (e) => {
    if (containerWidth === 0) return;
    const x = e.nativeEvent.contentOffset.x;
    const itemWidth = containerWidth;
    const index = Math.round(x / itemWidth);
    const clamped = Math.min(Math.max(index, 0), donenessOptions.length - 1);
    
    // Обновляем текущий индекс для пагинации
    setCurrentIndex(clamped);
    
    const option = donenessOptions[clamped];
    if (option && option.id !== selectedDoneness) {
      onSelect(option.id);
    }
  };

  const handleScroll = (e) => {
    // Обновляем текущий индекс во время скролла для более плавной пагинации
    if (containerWidth === 0) return;
    const x = e.nativeEvent.contentOffset.x;
    const itemWidth = containerWidth;
    const scrollIndex = Math.round(x / itemWidth);
    const clamped = Math.min(Math.max(scrollIndex, 0), donenessOptions.length - 1);
    
    // Обновляем текущий индекс для пагинации
    setCurrentIndex(clamped);
  };

  const onLayoutContainer = (e) => {
    const w = e.nativeEvent.layout.width;
    if (w && w !== containerWidth) setContainerWidth(w);
  };

  const renderItem = ({ item }) => {
    const isSelected = selectedDoneness === item.id;
    return (
      <View style={[styles.slideInner, { width: containerWidth }]}>
        <TouchableOpacity
          onPress={() => {
            onSelect(item.id)
          }} 
          style={[
            styles.option,
            isSelected ? styles.optionSelected : null
          ]}
        >
          <Image source={item.image} style={styles.optionImage} resizeMode="contain" />
          <Text style={styles.optionName}>
            {item.name}
          </Text>
          <Text style={styles.optionDescription}>
            {item.description}
          </Text>
          <Text style={styles.optionTime}>
            {item.time}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container} onLayout={onLayoutContainer}>
      <FlatList
        ref={listRef}
        data={donenessOptions}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        horizontal
        pagingEnabled={true}
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={handleMomentumEnd}
        onScrollEndDrag={handleMomentumEnd}
        onScroll={handleScroll}
        snapToAlignment="start"
        scrollEventThrottle={16}
        getItemLayout={(data, index) => ({ length: containerWidth, offset: containerWidth * index, index })}
        initialScrollIndex={Math.max(0, selectedIndex)}
        extraData={selectedDoneness}
        decelerationRate="fast"
        bounces={true}
      />
      <View style={styles.dotsRow}>
        {donenessOptions.map((_, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => {
              if (listRef.current) {
                listRef.current.scrollToIndex({ 
                  index: index, 
                  animated: true 
                });
                setCurrentIndex(index);
              }
            }}
            style={[
              styles.dot,
              index === currentIndex ? styles.dotActive : styles.dotInactive
            ]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },

  optionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  slideInner: {
    height: normalizePadding(200),
    justifyContent: 'center',
    alignItems: 'center',
  },
  option: {
    width: '100%',
    height: '100%',
    padding: normalizePadding(12),
    alignItems: 'center',
    borderWidth: 2,
    justifyContent: 'center',
    
    backgroundColor: 'rgb(244 243 236)',
  },
  optionSelected: {
    borderColor: '#4CAF50',
  },
  optionIcon: {
    fontSize: 28,
    marginBottom: 6,
  },
  optionImage: {
    width: '100%',
    height: normalizeImageSize(60, 60).height,
    marginBottom: normalizePadding(6),
  },
  optionName: {
    fontSize: normalizeFontSize(14),
    fontWeight: '700',
    marginBottom: normalizePadding(3),
    textAlign: 'center',
  },
  optionDescription: {
    fontSize: normalizeFontSize(10),
    marginBottom: normalizePadding(4),
    textAlign: 'center',
  },
  optionTime: {
    fontSize: normalizeFontSize(12),
    fontWeight: '600',
    paddingHorizontal: normalizePadding(6),
    paddingVertical: normalizePadding(3),
  },

  dotsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: normalizePadding(8),
    gap: normalizePadding(6),
  },
  dot: {
    width: normalizePadding(10),
    height: normalizePadding(10),
    borderRadius: normalizePadding(5),
    marginHorizontal: normalizePadding(4),
  },
  dotActive: {
    backgroundColor: '#4CAF50',
  },
  dotInactive: {
    backgroundColor: '#cccccc',
  },
});

export default DonenessSelector;
