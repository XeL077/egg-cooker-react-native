/**
 * Конфигурация размеров яиц для разных стран и регионов
 * Каждая страна имеет свою систему классификации размеров яиц
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
      { id: 'C3', name: 'С3', label: 'Мелкие', minWeight: 43, maxWeight: 53 }
    ]
  },

  // Европа (ЕС)
  EUROPE: {
    id: 'EUROPE',
    name: 'Европа',
    flag: '🇪🇺',
    sizes: [
      { id: 'XL', name: 'XL', label: 'Очень крупные', minWeight: 73, maxWeight: null },
      { id: 'L', name: 'L', label: 'Крупные', minWeight: 63, maxWeight: 73 },
      { id: 'M', name: 'M', label: 'Средние', minWeight: 53, maxWeight: 63 },
      { id: 'S', name: 'S', label: 'Мелкие', minWeight: 43, maxWeight: 53 }
    ]
  },

  // США
  USA: {
    id: 'USA',
    name: 'США',
    flag: '🇺🇸',
    sizes: [
      { id: 'JUMBO', name: 'Jumbo', label: 'Очень крупные', minWeight: 70, maxWeight: null },
      { id: 'XL', name: 'Extra Large', label: 'Крупные', minWeight: 63.5, maxWeight: 70 },
      { id: 'L', name: 'Large', label: 'Большие', minWeight: 56.5, maxWeight: 63.5 },
      { id: 'M', name: 'Medium', label: 'Средние', minWeight: 49.5, maxWeight: 56.5 },
      { id: 'S', name: 'Small', label: 'Мелкие', minWeight: 42.5, maxWeight: 49.5 },
      { id: 'PEEWEE', name: 'PeeWee', label: 'Очень мелкие', minWeight: 35, maxWeight: 42.5 }
    ]
  },

  // Китай
  CHINA: {
    id: 'CHINA',
    name: 'Китай',
    flag: '🇨🇳',
    sizes: [
      { id: 'TE_DA_HAO', name: '特大号', label: 'Очень крупные', minWeight: 70, maxWeight: null },
      { id: 'DA_HAO', name: '大号', label: 'Крупные', minWeight: 60, maxWeight: 70 },
      { id: 'ZHONG_HAO', name: '中号', label: 'Средние', minWeight: 50, maxWeight: 60 },
      { id: 'XIAO_HAO', name: '小号', label: 'Мелкие', minWeight: 40, maxWeight: 50 }
    ]
  },

  // Япония
  JAPAN: {
    id: 'JAPAN',
    name: 'Япония',
    flag: '🇯🇵',
    sizes: [
      { id: 'LL', name: 'LL', label: 'Очень крупные', minWeight: 70, maxWeight: null },
      { id: 'L', name: 'L', label: 'Крупные', minWeight: 64, maxWeight: 70 },
      { id: 'M', name: 'M', label: 'Средние', minWeight: 58, maxWeight: 64 },
      { id: 'MS', name: 'MS', label: 'Мелкие', minWeight: 52, maxWeight: 58 },
      { id: 'S', name: 'S', label: 'Очень мелкие', minWeight: 46, maxWeight: 52 },
      { id: 'SS', name: 'SS', label: 'Самые мелкие', minWeight: 40, maxWeight: 46 }
    ]
  },

  // Австралия/Новая Зеландия
  AUSTRALIA: {
    id: 'AUSTRALIA',
    name: 'Австралия',
    flag: '🇦🇺',
    sizes: [
      { id: 'JUMBO', name: 'Jumbo', label: 'Очень крупные', minWeight: 68, maxWeight: null },
      { id: 'XL', name: 'Extra Large', label: 'Крупные', minWeight: 60, maxWeight: 68 },
      { id: 'L', name: 'Large', label: 'Большие', minWeight: 52, maxWeight: 60 },
      { id: 'M', name: 'Medium', label: 'Средние', minWeight: 44, maxWeight: 52 },
      { id: 'S', name: 'Small', label: 'Мелкие', minWeight: 36, maxWeight: 44 }
    ]
  },

  // Канада
  CANADA: {
    id: 'CANADA',
    name: 'Канада',
    flag: '🇨🇦',
    sizes: [
      { id: 'JUMBO', name: 'Jumbo', label: 'Очень крупные', minWeight: 70, maxWeight: null },
      { id: 'XL', name: 'Extra Large', label: 'Крупные', minWeight: 63, maxWeight: 70 },
      { id: 'L', name: 'Large', label: 'Большие', minWeight: 56, maxWeight: 63 },
      { id: 'M', name: 'Medium', label: 'Средние', minWeight: 49, maxWeight: 56 },
      { id: 'S', name: 'Small', label: 'Мелкие', minWeight: 42, maxWeight: 49 },
      { id: 'PEEWEE', name: 'PeeWee', label: 'Очень мелкие', minWeight: 35, maxWeight: 42 }
    ]
  },

  // Бразилия
  BRAZIL: {
    id: 'BRAZIL',
    name: 'Бразилия',
    flag: '🇧🇷',
    sizes: [
      { id: 'G1', name: 'G1', label: 'Очень крупные', minWeight: 73, maxWeight: null },
      { id: 'G', name: 'G', label: 'Крупные', minWeight: 63, maxWeight: 73 },
      { id: 'M', name: 'M', label: 'Средние', minWeight: 53, maxWeight: 63 },
      { id: 'P', name: 'P', label: 'Мелкие', minWeight: 43, maxWeight: 53 }
    ]
  },

  // Индия
  INDIA: {
    id: 'INDIA',
    name: 'Индия',
    flag: '🇮🇳',
    sizes: [
      { id: 'XL', name: 'Extra Large', label: 'Очень крупные', minWeight: 60, maxWeight: null },
      { id: 'L', name: 'Large', label: 'Крупные', minWeight: 50, maxWeight: 60 },
      { id: 'M', name: 'Medium', label: 'Средние', minWeight: 40, maxWeight: 50 },
      { id: 'S', name: 'Small', label: 'Мелкие', minWeight: 30, maxWeight: 40 }
    ]
  },

  // Южная Корея
  KOREA: {
    id: 'KOREA',
    name: 'Южная Корея',
    flag: '🇰🇷',
    sizes: [
      { id: 'TEUKDAE', name: '특대', label: 'Очень крупные', minWeight: 70, maxWeight: null },
      { id: 'DAE', name: '대', label: 'Крупные', minWeight: 60, maxWeight: 70 },
      { id: 'JUNG', name: '중', label: 'Средние', minWeight: 50, maxWeight: 60 },
      { id: 'SO', name: '소', label: 'Мелкие', minWeight: 40, maxWeight: 50 }
    ]
  }
};

/**
 * Получить все доступные системы классификации
 */
export const getAvailableSystems = () => {
  return Object.values(EGG_SIZE_SYSTEMS);
};

/**
 * Получить систему классификации по ID
 */
export const getSystemById = (systemId) => {
  return EGG_SIZE_SYSTEMS[systemId] || null;
};

/**
 * Получить размер яйца по весу в указанной системе
 */
export const getSizeByWeight = (weight, systemId) => {
  const system = getSystemById(systemId);
  if (!system) return null;

  return system.sizes.find(size => {
    const meetsMin = weight >= size.minWeight;
    const meetsMax = size.maxWeight ? weight <= size.maxWeight : true;
    return meetsMin && meetsMax;
  });
};

/**
 * Получить все размеры для системы
 */
export const getSizesForSystem = (systemId) => {
  const system = getSystemById(systemId);
  return system ? system.sizes : [];
};

/**
 * Конвертировать размер из одной системы в другую по весу
 */
export const convertSizeBetweenSystems = (sizeId, fromSystemId, toSystemId) => {
  const fromSystem = getSystemById(fromSystemId);
  const toSystem = getSystemById(toSystemId);
  
  if (!fromSystem || !toSystem) return null;

  const fromSize = fromSystem.sizes.find(size => size.id === sizeId);
  if (!fromSize) return null;

  // Используем средний вес для конвертации
  const avgWeight = fromSize.maxWeight 
    ? (fromSize.minWeight + fromSize.maxWeight) / 2 
    : fromSize.minWeight + 5; // добавляем 5г для максимальных размеров

  return getSizeByWeight(avgWeight, toSystemId);
};

export default EGG_SIZE_SYSTEMS;
