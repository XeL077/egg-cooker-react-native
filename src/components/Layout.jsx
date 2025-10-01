import React from 'react';
import { View, StyleSheet } from 'react-native';
import { colors } from '../theme';

const Layout = ({ children }) => {
  return (
    <View style={styles.layout}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  layout: {
    flex: 1,
    backgroundColor: colors.backgroundPrimary,
    minHeight: '100vh',
  },
});

export default Layout;
