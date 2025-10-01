import React, { useMemo } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Modal, 
  TouchableOpacity, 
  ScrollView,
  SafeAreaView,
  Dimensions 
} from 'react-native';
import { useSettings } from '../context/SettingsContext';
import { EGG_SIZE_SYSTEMS, getAvailableSystems } from '../data/eggSizes';
import SelectBox from './SelectBox';
import { colors, textStyles, colorUtils } from '../theme';

const { height: screenHeight } = Dimensions.get('window');

/**
 * Modal с настройками приложения
 */
const SettingsModal = ({ 
  visible, 
  onClose
}) => {
  // Получаем настройки из контекста
  const { selectedCountry, setCountry } = useSettings();

  const availableSystems = getAvailableSystems();
  const currentSystem = EGG_SIZE_SYSTEMS[selectedCountry];

  // Преобразуем страны в формат для SelectBox
  const countryOptions = useMemo(() => {
    return availableSystems.map(system => ({
      value: system.id,
      label: `${system.flag} ${system.name}`,
      description: `Доступно размеров: ${system.sizes.length}`,
      weight: system.sizes.map(s => s.name).join(', ')
    }));
  }, [availableSystems]);

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <SafeAreaView style={styles.safeArea}>
            {/* Заголовок модального окна */}
            <View style={styles.header}>
              <Text style={styles.headerTitle}>⚙️ Настройки</Text>
              <TouchableOpacity 
                style={styles.closeButton}
                onPress={onClose}
              >
                <Text style={styles.closeButtonText}>✕</Text>
              </TouchableOpacity>
            </View>

            {/* Содержимое модального окна */}
            <ScrollView 
              style={styles.content}
              showsVerticalScrollIndicator={false}
            >
              {/* Настройки страны */}
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>🌍 Страна</Text>
                
                <SelectBox
                  placeholder="Выберите страну"
                  options={countryOptions}
                  selectedValue={selectedCountry}
                  onSelect={setCountry}
                />

                {/* Информация о выбранной стране */}
                {currentSystem && (
                  <View style={styles.infoBox}>
                    <Text style={styles.infoTitle}>Информация о стране:</Text>
                    <Text style={styles.infoText}>
                      {currentSystem.flag} {currentSystem.name}
                    </Text>
                    <Text style={styles.infoText}>
                      Доступно размеров: {currentSystem.sizes.length}
                    </Text>
                    <Text style={styles.infoText}>
                      Система: {currentSystem.sizes.map(s => s.name).join(', ')}
                    </Text>
                  </View>
                )}
              </View>
            </ScrollView>
          </SafeAreaView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: colors.backgroundOverlay,
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: colors.backgroundPrimary,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: screenHeight * 0.9,
    minHeight: screenHeight * 0.5,
  },
  safeArea: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
  },
  headerTitle: {
    ...textStyles.h3,
    color: colors.textPrimary,
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.gray100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    ...textStyles.button,
    fontSize: 18,
    color: colors.textSecondary,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  section: {
    marginVertical: 16,
  },
  sectionTitle: {
    ...textStyles.h4,
    color: colors.textPrimary,
    marginBottom: 12,
  },
  infoBox: {
    backgroundColor: colorUtils.withOpacity(colors.secondary, 0.1),
    padding: 12,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: colors.secondary,
  },
  infoTitle: {
    ...textStyles.label,
    color: colors.textPrimary,
    marginBottom: 4,
  },
  infoText: {
    ...textStyles.caption,
    color: colors.textSecondary,
    marginBottom: 2,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
  },
  settingLabel: {
    ...textStyles.body,
    color: colors.textPrimary,
  },
  settingValue: {
    ...textStyles.bodySmall,
    color: colors.textSecondary,
  },
});

export default SettingsModal;
