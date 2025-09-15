import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Layout from './components/Layout';
import SplashScreen from './components/SplashScreen';
import TemperatureToggle from './components/TemperatureToggle';
import DonenessSelector from './components/DonenessSelector';

/**
 * App - главный компонент приложения
 */
const App = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [isHotWater, setIsHotWater] = useState(false);
  const [selectedDoneness, setSelectedDoneness] = useState('soft');

  const handleSplashFinish = () => {
    setShowSplash(false);
  };

  const handleTemperatureToggle = (isHot) => {
    setIsHotWater(isHot);
  };

  const handleDonenessSelect = (doneness) => {
    setSelectedDoneness(doneness);
  };

  if (showSplash) {
    return <SplashScreen onFinish={handleSplashFinish} />;
  }

  return (
    <Layout>
      <View style={styles.container}>
        <Text style={styles.title}>🥚 Egg Timer+</Text>
        <Text style={styles.subtitle}>Настройте параметры варки</Text>
        
        <TemperatureToggle 
          isHot={isHotWater}
          onToggle={handleTemperatureToggle}
        />
        
        <DonenessSelector 
          selectedDoneness={selectedDoneness}
          onSelect={handleDonenessSelect}
        />
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  statusText: {
    fontSize: 14,
    color: '#4CAF50',
    fontWeight: '600',
    marginTop: 16,
    textAlign: 'center',
  },
});

export default App;
