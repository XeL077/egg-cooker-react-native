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
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: '#fff',
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
    borderBottomColor: '#f0f0f0',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: 18,
    color: '#666',
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  section: {
    marginVertical: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  infoBox: {
    backgroundColor: '#f8f9fa',
    padding: 12,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#4CAF50',
  },
  infoTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  infoText: {
    fontSize: 13,
    color: '#666',
    marginBottom: 2,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  settingLabel: {
    fontSize: 16,
    color: '#333',
  },
  settingValue: {
    fontSize: 14,
    color: '#666',
  },
});

export default SettingsModal;
