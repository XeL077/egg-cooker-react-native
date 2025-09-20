import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SettingsProvider, useSettings } from './context/SettingsContext';
import Layout from './components/Layout';
import SplashScreen from './components/SplashScreen';
import TemperatureToggle from './components/TemperatureToggle';
import DonenessSelector from './components/DonenessSelector';
import EggSizeSelector from './components/EggSizeSelector';
import SettingsModal from './components/SettingsModal';

/**
 * Внутренний компонент App с доступом к контексту
 */
const AppContent = () => {
  const [showSettings, setShowSettings] = useState(false);
  
  // Получаем настройки из контекста
  const {
    isLoading,
    isHotWater,
    selectedDoneness,
    setTemperature,
    setDoneness,
  } = useSettings();

  const handleTemperatureToggle = (isHot) => {
    setTemperature(isHot);
  };

  const handleDonenessSelect = (doneness) => {
    setDoneness(doneness);
  };

  const handleSettingsToggle = () => {
    setShowSettings(!showSettings);
  };

  // Показываем экран загрузки пока настройки не загружены
  if (isLoading) {
    return <SplashScreen isLoading={true} />;
  }

  return (
    <Layout>
      <View style={styles.container}>
        {/* Заголовок с кнопкой настроек */}
        <View style={styles.header}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>🥚 Egg Timer+</Text>
          </View>
          <TouchableOpacity 
            style={styles.settingsButton}
            onPress={handleSettingsToggle}
          >
            <Text style={styles.settingsButtonText}>⚙️</Text>
          </TouchableOpacity>
        </View>
        
      </View>

      {/* Modal с настройками */}
      <SettingsModal
        visible={showSettings}
        onClose={() => setShowSettings(false)}
      />
    </Layout>
  );
};

/**
 * Главный компонент App с провайдером настроек
 */
const App = () => {
  return (
    <SettingsProvider>
      <AppContent />
    </SettingsProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  settingsButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  settingsButtonText: {
    fontSize: 20,
  },
});

export default App;
