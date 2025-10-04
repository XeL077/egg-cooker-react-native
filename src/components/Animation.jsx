import LottieView from 'lottie-react-native';
import { View, Text, StyleSheet } from 'react-native';

export default function Animation() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Animation</Text>
      <LottieView 
        source={require('../assets/animate/animation.json')}
        style={styles.animation}
        autoPlay
        loop
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  animation: {
    width: 200,
    height: 200,
  },
});
