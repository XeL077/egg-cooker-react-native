import * as Updates from 'expo-updates';

// OTA updates (only in production)
if (!__DEV__) {
  Updates.checkForUpdateAsync()
    .then((update) => {
      if (update.isAvailable) {
        Updates.fetchUpdateAsync()
          .then(() => Updates.reloadAsync())
          .catch((error) => console.warn('Failed to fetch update:', error));
      }
    })
    .catch((error) => console.warn('Failed to check for updates:', error));
}

// Expo Router entry — must be last
import 'expo-router/entry';
