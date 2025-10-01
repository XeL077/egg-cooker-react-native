import React from 'react';
import { View, StyleSheet } from 'react-native';

/**
 * Компонент яйца через CSS стили (без SVG)
 */
const EggCSS = ({ width = 200, height = 280, fillColor = '#007AFF' }) => {
  return (
    <View style={[
      styles.eggShape,
      {
        width,
        height,
        backgroundColor: fillColor,
      }
    ]} />
  );
};

const styles = StyleSheet.create({
  eggShape: {
    borderRadius: 100,
    borderTopLeftRadius: 100,
    borderTopRightRadius: 100,
    borderBottomLeftRadius: 100,
    borderBottomRightRadius: 100,
    // Дополнительные стили для более точной формы яйца
    transform: [{ scaleX: 0.7 }], // Сжимаем по горизонтали
  },
});

export default EggCSS;
