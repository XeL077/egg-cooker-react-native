import React from 'react';
import { View, Image } from 'react-native';
import eggShape from '../assets/img/egg-shape.svg';

/**
 * Компонент яйца через статичный SVG файл
 */
const EggImage = ({ width = 200, height = 280, fillColor = '#000000', showGradient = true }) => {
  return (
    <View style={{ width, height }}>
      <Image
        source={eggShape} // Путь к SVG файлу
        color={fillColor}
        style={{ 
          width: '100%', 
          height: '100%',
          resizeMode: 'contain'
        }}
      />
    </View>
  );
};

export default EggImage;
