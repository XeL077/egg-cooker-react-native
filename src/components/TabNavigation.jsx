import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors, textStyles } from '../theme';
import { useSettings } from '../context/SettingsContext';
import { normalizePadding, normalizeFontSize } from '../utils/responsive';

/**
 * Tab Navigation Component
 * Переключение между экранами: Таймер яиц и Погода
 */
const TabNavigation = () => {
  const { activeTab, setActiveTab } = useSettings();

  const tabs = [
    { id: 'egg', label: '🥚 Таймер', icon: '🥚' },
    { id: 'weather', label: '🌤️ Погода', icon: '🌤️' },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.tabBar}>
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <TouchableOpacity
              key={tab.id}
              style={[styles.tab, isActive && styles.tabActive]}
              onPress={() => setActiveTab(tab.id)}
              activeOpacity={0.7}
            >
              <Text style={styles.tabIcon}>{tab.icon}</Text>
              <Text style={[styles.tabLabel, isActive && styles.tabLabelActive]}>
                {tab.label.replace(/^[^\s]+\s/, '')}
              </Text>
              {isActive && <View style={styles.activeIndicator} />}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.backgroundPrimary,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
    shadowColor: colors.shadowLight,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: normalizePadding(16),
    paddingTop: normalizePadding(8),
    paddingBottom: normalizePadding(8),
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: normalizePadding(12),
    paddingHorizontal: normalizePadding(16),
    marginHorizontal: normalizePadding(4),
    borderRadius: normalizePadding(12),
    backgroundColor: 'transparent',
    position: 'relative',
  },
  tabActive: {
    backgroundColor: colors.backgroundSecondary,
  },
  tabIcon: {
    fontSize: normalizeFontSize(20),
    marginRight: normalizePadding(6),
  },
  tabLabel: {
    ...textStyles.body,
    fontSize: normalizeFontSize(15),
    fontWeight: '500',
    color: colors.textSecondary,
  },
  tabLabelActive: {
    color: colors.primary,
    fontWeight: '700',
  },
  activeIndicator: {
    position: 'absolute',
    bottom: 0,
    left: '20%',
    right: '20%',
    height: normalizePadding(3),
    backgroundColor: colors.primary,
    borderRadius: normalizePadding(2),
  },
});

export default TabNavigation;

