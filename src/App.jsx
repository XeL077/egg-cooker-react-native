import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Layout from './components/Layout';

const App = () => {
  return (
    <Layout>
      <View style={styles.container}>
        <Text style={styles.title}>🥚 Egg Timer+</Text>
        <Text style={styles.subtitle}>Приложение для варки яиц</Text>
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
  },
});

export default App;
