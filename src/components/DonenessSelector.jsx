import React, { useEffect, useMemo, useRef, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList } from 'react-native';
import imgSoftBoiled from '../assets/img/soft-boiled.png';
import imgSemiSoft from '../assets/img/semi-soft.png';
import imgMediumBoiled from '../assets/img/medium-boiled.png';
import imgHardBoiled from '../assets/img/hard-boiled.png';
import imgPoached from '../assets/img/poached.png';

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
      image: imgSoftBoiled,
      description: 'Желток жидкий',
      time: '4-5 мин'
    },
    {
      id: 'semi-soft',
      name: 'Полувсмятку',
      english: 'semi soft',
      icon: '🥚',
      image: imgSemiSoft,
      description: 'Желток полужидкий',
      time: '5-6 мин'
    },
    {
      id: 'medium',
      name: 'В мешочек',
      english: 'medium-boiled',
      icon: '🥚',
      image: imgMediumBoiled,
      description: 'Желток густой',
      time: '6-7 мин'
    },
    {
      id: 'hard',
      name: 'Вкрутую',
      english: 'hard-boiled',
      icon: '🥚',
      image: imgHardBoiled,
      description: 'Желток твердый',
      time: '8-10 мин'
    },
    {
      id: 'poached',
      name: 'Пашот',
      english: 'poached',
      icon: '🍳',
      image: imgPoached,
      description: 'Без скорлупы',
      time: '3-4 мин'
    }
  ];

  const listRef = useRef(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const selectedIndex = useMemo(() => {
    const idx = donenessOptions.findIndex(o => o.id === selectedDoneness);
    return Math.max(0, idx);
  }, [selectedDoneness]);

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
            isSelected ? styles.optionSelected : styles.optionUnselected
          ]}
        >
          <Image source={{ uri: item.image }} style={styles.optionImage} resizeMode="contain" />
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
    height: 240,
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

  optionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  slideInner: {
    height: 200,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  option: {
    width: '100%',
    height: '100%',
    padding: 12,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 2,
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
  optionImage: {
    width: '100%',
    height: 60,
    marginBottom: 6,
  },
  optionName: {
    fontSize: 14,
    fontWeight: '700',
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


  dotsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 8,
    gap: 6,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 4,
  },
  dotActive: {
    backgroundColor: '#4CAF50',
  },
  dotInactive: {
    backgroundColor: '#cccccc',
  },
});

export default DonenessSelector;
