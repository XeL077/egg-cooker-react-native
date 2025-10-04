import React, { useEffect, useRef } from 'react';
import { Animated } from 'react-native';

/**
 * Компонент для анимированного скрытия/показа контента
 * @param {boolean} visible - Видимость компонента
 * @param {number} duration - Длительность анимации в мс (по умолчанию 300)
 * @param {number} maxHeight - Максимальная высота контента (по умолчанию 1000)
 * @param {ReactNode} children - Дочерние элементы
 */
const AnimatedCollapse = ({ visible, duration = 300, maxHeight = 1000, children }) => {
  const animation = useRef(new Animated.Value(visible ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(animation, {
      toValue: visible ? 1 : 0,
      duration,
      useNativeDriver: false,
    }).start();
  }, [visible, animation, duration]);

  const height = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, maxHeight],
  });

  return (
    <Animated.View
      style={{
        maxHeight: height,
        opacity: animation,
        overflow: 'hidden',
      }}
    >
      {children}
    </Animated.View>
  );
};

export default AnimatedCollapse;

