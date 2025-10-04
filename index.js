import { registerRootComponent } from 'expo';
import * as Updates from 'expo-updates';
import App from './src/App';

// Disable automatic update checks in development
if (__DEV__) {
  // In development, we don't want to check for updates
  console.log('Development mode: Skipping update checks');
} else {
  // In production, handle updates gracefully
  Updates.checkForUpdateAsync()
    .then(update => {
      if (update.isAvailable) {
        Updates.fetchUpdateAsync()
          .then(() => {
            Updates.reloadAsync();
          })
          .catch(error => {
            console.warn('Failed to fetch update:', error);
          });
      }
    })
    .catch(error => {
      console.warn('Failed to check for updates:', error);
    });
}

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App);

