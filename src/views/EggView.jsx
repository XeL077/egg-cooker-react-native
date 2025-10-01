import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors, colorUtils, textStyles } from '../theme';
import SettingsModal from '../components/SettingsModal';

/**
 * View таба "Яйцо"
 */
const EggView = () => {
  const [showSettings, setShowSettings] = useState(false);

  const handleSettingsToggle = () => {
    setShowSettings(!showSettings);
  };

  const handleDonenessSelect = (doneness) => {
    setDoneness(doneness);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
          <TouchableOpacity 
            style={styles.settingsButton}
            onPress={handleSettingsToggle}
          >
            <Text style={styles.settingsButtonText}>⚙️</Text>
          </TouchableOpacity>
      </View>
      <View style={styles.contentPlaceholder}>
        {/* Пока пустое место для будущего контента */}
      </View>
      
      {/* Modal с настройками */}
      <SettingsModal
        visible={showSettings}
        onClose={() => setShowSettings(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  contentPlaceholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.backgroundPrimary,
    borderRadius: 12,
    marginVertical: 20,
    padding: 40,
    shadowColor: colors.shadowLight,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },

  settingsButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.backgroundPrimary,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.shadowLight,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  settingsButtonText: {
    ...textStyles.button,
    fontSize: 20,
  },
});

export default EggView;
