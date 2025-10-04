import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { colors } from './theme';
import { normalizePadding } from './utils/responsive';

// Импортируем SafeAreaView только для нативных платформ
let SafeAreaView;
if (Platform.OS !== 'web') {
  try {
    SafeAreaView = require('react-native-safe-area-context').SafeAreaView;
  } catch (error) {
    // Fallback если библиотека не установлена
    SafeAreaView = View;
  }
} else {
  SafeAreaView = View;
}

const Layout = ({ children }) => {
  return (
    <SafeAreaView style={styles.layout}>
      <View style={styles.container}>
        {children}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  layout: {
    flex: 1,
    backgroundColor: colors.backgroundPrimary,
  },
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'web' ? 0 : normalizePadding(10),
  },
});

export default Layout;
