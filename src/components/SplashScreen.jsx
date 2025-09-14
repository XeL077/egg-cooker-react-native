import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import Lottie from 'react-lottie';
import chikiChikAnimation from '../assets/animations/chiki-chik.json';

/**
 * SplashScreen - анимированный экран загрузки
 * @param {Function} onFinish - Callback после завершения анимации
 */
const SplashScreen = ({ onFinish }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.5)).current;

  useEffect(() => {
    // Анимация появления
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      }),
    ]).start(() => {
      // После завершения анимации появления ждем 1.5 секунды
      setTimeout(() => {
        // Анимация исчезновения
        Animated.parallel([
          Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
          }),
          Animated.timing(scaleAnim, {
            toValue: 0.8,
            duration: 300,
            useNativeDriver: true,
          }),
        ]).start(() => {
          onFinish();
        });
      }, 1500);
    });
  }, [fadeAnim, scaleAnim, onFinish]);

  
  const optionsLottieAnimation = {
    loop: true,
    autoplay: true,
    animationData: chikiChikAnimation,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };
  return (
    <View style={styles.container}>
      <Animated.View 
        style={[
          styles.content,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        <Lottie 
          options={optionsLottieAnimation}
          height={120}
          width={120}
        />
        <Text style={styles.title}>Egg Timer+</Text>
        <Text style={styles.subtitle}>Готовим идеальные яйца</Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fffbc9',
    height: '100vh',
  },
  content: {
    alignItems: 'center',
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#2f2f2f',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: '#2f2f2f',
    opacity: 0.9,
    textAlign: 'center',
  },
});

export default SplashScreen;
