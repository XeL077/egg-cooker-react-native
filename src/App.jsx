import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SettingsProvider, useSettings } from './context/SettingsContext';
import Layout from './components/Layout';
import SplashScreen from './components/SplashScreen';

import EggView from './views/EggView';
import TimerView from './views/TimerView';
import { colors, colorUtils, textStyles } from './theme';

/**
 * Внутренний компонент App с доступом к контексту
 */
const AppContent = () => {
  // Получаем настройки из контекста
  const {
    activeTab,
    setActiveTab,
    isLoading,
    isHotWater,
    selectedDoneness,
    setTemperature,
    setDoneness,
  } = useSettings();


  const handleTemperatureToggle = (isHot) => {
    setTemperature(isHot);
  };


  // Показываем экран загрузки пока настройки не загружены
  if (isLoading) {
    return <SplashScreen isLoading={true} />;
  }

  // Компонент для нижней навигации
  const BottomTabBar = () => (
    <View style={styles.bottomTabBar}>
      <TouchableOpacity 
        style={[styles.tabButton, activeTab === 'egg' && styles.activeTabButton]}
        onPress={() => setActiveTab('egg')}
      >
        <Text style={[styles.tabIcon, activeTab === 'egg' && styles.activeTabIcon]}>🥚</Text>
        </TouchableOpacity>
      
      <TouchableOpacity 
        style={[styles.tabButton, activeTab === 'timer' && styles.activeTabButton]}
        onPress={() => setActiveTab('timer')}
      >
        <Text style={[styles.tabIcon, activeTab === 'timer' && styles.activeTabIcon]}>⏱️</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <Layout>
      <View style={styles.container}>        
        {/* Контент табов */}
        {activeTab === 'egg' ? <EggView /> : <TimerView />}
        
        {/* Нижняя навигация */}
        <BottomTabBar />
      </View>
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
    backgroundColor: colors.backgroundSecondary,
  },
  // Стили для нижней навигации
  bottomTabBar: {
    flexDirection: 'row',
    backgroundColor: colors.backgroundPrimary,
    borderTopWidth: 1,
    borderTopColor: colors.borderLight,

    shadowColor: colors.shadowLight,
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
  },
  activeTabButton: {
    backgroundColor: colorUtils.withOpacity(colors.primary, 0.1),
  },
  tabIcon: {
    fontSize: 24,
    marginBottom: 4,
    opacity: 0.6,
  },
  activeTabIcon: {
    opacity: 1,
  },
});

export default App;
