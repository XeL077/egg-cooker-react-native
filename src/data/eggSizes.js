/**
 * Конфигурация размеров яиц для СНГ
 * Стандартная система классификации размеров яиц
 */

export const EGG_SIZE_SYSTEMS = {
  // СНГ (Россия, Беларусь, Казахстан и др.)
  CIS: {
    id: 'CIS',
    name: 'СНГ',
    flag: '🇷🇺',
    sizes: [
      { id: 'C0', name: 'С0', label: 'Очень крупные', minWeight: 73, maxWeight: null },
      { id: 'C1', name: 'С1', label: 'Крупные', minWeight: 63, maxWeight: 73 },
      { id: 'C2', name: 'С2', label: 'Средние', minWeight: 53, maxWeight: 63 },
    ]
  }
};

/**
 * Получить систему СНГ
 */
export const getCISSystem = () => {
  return EGG_SIZE_SYSTEMS.CIS;
};

/**
 * Получить все размеры яиц СНГ
 */
export const getEggSizes = () => {
  return EGG_SIZE_SYSTEMS.CIS.sizes;
};

/**
 * Получить размер яйца по ID
 */
export const getSizeById = (sizeId) => {
  return EGG_SIZE_SYSTEMS.CIS.sizes.find(size => size.id === sizeId) || null;
};

/**
 * Получить размер яйца по весу
 */
export const getSizeByWeight = (weight) => {
  return EGG_SIZE_SYSTEMS.CIS.sizes.find(size => {
    const meetsMin = weight >= size.minWeight;
    const meetsMax = size.maxWeight ? weight <= size.maxWeight : true;
    return meetsMin && meetsMax;
  });
};

export default EGG_SIZE_SYSTEMS;
