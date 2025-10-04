import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, ActivityIndicator } from 'react-native';

/**
 * SplashScreen - анимированный экран загрузки
 * @param {Function} onFinish - Callback после завершения анимации
 * @param {Boolean} isLoading - Режим загрузки настроек (показывает спиннер)
 */
const SplashScreen = ({ onFinish, isLoading = false }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.5)).current;
  const bounceAnim = useRef(new Animated.Value(1)).current;

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
    ]).start();

    // Анимация подпрыгивания яйца
    const bounceAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(bounceAnim, {
          toValue: 1.2,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(bounceAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    );
    bounceAnimation.start();

    if (!isLoading) {
      // Обычный режим сплеша с анимацией исчезновения
      setTimeout(() => {
        bounceAnimation.stop();
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
      }, 2000);
    }

    return () => {
      bounceAnimation.stop();
    };
  }, [fadeAnim, scaleAnim, bounceAnim, onFinish, isLoading]);

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
        <Animated.Text 
          style={[
            styles.eggEmoji,
            {
              transform: [{ scale: bounceAnim }],
            },
          ]}
        >
          🥚
        </Animated.Text>
        <Text style={styles.title}>🥚 Egg Timer+</Text>
        {isLoading && (
          <ActivityIndicator 
            size="large" 
            color="#4CAF50" 
            style={styles.spinner} 
          />
        )}
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
    marginBottom: 10,
  },
  spinner: {
    marginTop: 20,
  },
  eggEmoji: {
    fontSize: 120,
    marginBottom: 20,
  },
});

export default SplashScreen;
