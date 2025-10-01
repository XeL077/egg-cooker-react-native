import React from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import CircularTimer from '../components/CircularTimer';
import { colors, textStyles } from '../theme';

/**
 * View таба "Таймер"
 */
const TimerView = () => {
  const handleTimeEnd = () => {
    Alert.alert(
      'Время истекло!',
      'Таймер завершил обратный отсчет.',
      [{ text: 'OK' }]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Таймер</Text>
      </View>
      
      <CircularTimer 
        initialTime={5} // 5 минут
        onTimeEnd={handleTimeEnd}
        autoStart={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundSecondary,
  },
  header: {
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 10,
  },
  title: {
    ...textStyles.h2,
    color: colors.textPrimary,
    marginBottom: 8,
  },
});

export default TimerView;
