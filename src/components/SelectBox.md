# 📦 SelectBox - Универсальный компонент выбора

## Обзор

`SelectBox` - это переиспользуемый компонент для создания выпадающих списков с единообразным дизайном и поведением.

## Использование

```javascript
import SelectBox from './components/SelectBox';

const MyComponent = () => {
  const [selectedValue, setSelectedValue] = useState(null);
  
  const options = [
    { value: 'option1', label: 'Опция 1', description: 'Описание опции 1' },
    { value: 'option2', label: 'Опция 2', description: 'Описание опции 2' },
  ];

  return (
    <SelectBox
      label="Выберите опцию"
      placeholder="Выберите из списка"
      options={options}
      selectedValue={selectedValue}
      onSelect={setSelectedValue}
    />
  );
};
```

## Пропсы

| Проп | Тип | По умолчанию | Описание |
|------|-----|--------------|----------|
| `label` | `string` | - | Заголовок селекта |
| `placeholder` | `string` | `'Выберите опцию'` | Текст placeholder |
| `options` | `Array` | `[]` | Массив опций для выбора |
| `selectedValue` | `string\|number` | - | Выбранное значение |
| `onSelect` | `function` | - | Callback при выборе опции |
| `disabled` | `boolean` | `false` | Заблокирован ли селект |
| `disabledText` | `string` | `'Сначала выберите предыдущий параметр'` | Текст для заблокированного состояния |
| `renderOption` | `function` | - | Функция для кастомного рендера опции |
| `style` | `Object` | - | Дополнительные стили |

## Формат опций

```javascript
const options = [
  {
    value: 'unique_id',        // Уникальный идентификатор
    label: 'Отображаемый текст', // Основной текст
    description: 'Описание',    // Дополнительное описание (опционально)
    weight: '50г',             // Вес/размер (опционально)
  }
];
```

## Кастомный рендер опций

```javascript
const renderCustomOption = (option) => (
  <View style={styles.customOption}>
    <Text style={styles.customText}>{option.label}</Text>
    <View style={styles.customBadge}>
      <Text style={styles.badgeText}>{option.weight}</Text>
    </View>
  </View>
);

<SelectBox
  options={options}
  renderOption={renderCustomOption}
  // ... другие пропсы
/>
```

## Примеры использования

### Простой селект
```javascript
<SelectBox
  label="Страна"
  options={countryOptions}
  selectedValue={selectedCountry}
  onSelect={setCountry}
/>
```

### Заблокированный селект
```javascript
<SelectBox
  label="Размер яйца"
  options={sizeOptions}
  selectedValue={selectedSize}
  onSelect={setSize}
  disabled={!selectedCountry}
  disabledText="Сначала выберите страну"
/>
```

### Селект с кастомным рендером
```javascript
<SelectBox
  label="Размер яйца"
  options={sizeOptions}
  selectedValue={selectedSize}
  onSelect={setSize}
  renderOption={(option) => (
    <View style={styles.sizeOption}>
      <Text style={styles.sizeName}>{option.label}</Text>
      <Text style={styles.sizeWeight}>{option.weight}</Text>
    </View>
  )}
/>
```

## Стили

### Основные стили
- `.container` - Контейнер селекта
- `.label` - Заголовок
- `.selector` - Кнопка выбора
- `.selectorText` - Текст в кнопке
- `.dropdown` - Выпадающий список
- `.option` - Элемент списка

### Состояния
- `.disabledSelector` - Заблокированное состояние
- `.disabledText` - Текст в заблокированном состоянии
- `.openSelector` - Открытое состояние
- `.selectedOption` - Выбранная опция

## Особенности

### Автоматическое закрытие
Селект автоматически закрывается при выборе опции или клике вне области.

### Прокрутка
Выпадающий список поддерживает прокрутку при большом количестве опций (максимум 200px высоты).

### Z-index
Выпадающий список имеет высокий z-index для корректного отображения поверх других элементов.

### Nested Scroll
Поддерживает вложенную прокрутку для использования внутри ScrollView.

## Интеграция с существующими компонентами

### EggSizeSelector
```javascript
<SelectBox
  label="Размер яйца"
  options={sizeOptions}
  selectedValue={selectedSize}
  onSelect={setSize}
  disabled={!currentSystem}
  disabledText="Сначала выберите страну в настройках"
  renderOption={renderSizeOption}
/>
```

### SettingsModal
```javascript
<SelectBox
  placeholder="Выберите страну"
  options={countryOptions}
  selectedValue={selectedCountry}
  onSelect={setCountry}
/>
```

## Преимущества

- **Единообразие**: Все селекты выглядят одинаково
- **Переиспользование**: Один компонент для всех случаев
- **Гибкость**: Поддержка кастомного рендера
- **Доступность**: Поддержка заблокированных состояний
- **Производительность**: Оптимизированные ре-рендеры
- **Типизация**: Четкие пропсы и их типы

## Миграция с существующих компонентов

### Было (дублирование кода)
```javascript
// В каждом компоненте
<TouchableOpacity style={styles.selector}>
  <Text>{selectedValue || placeholder}</Text>
  <Text>{isOpen ? '▲' : '▼'}</Text>
</TouchableOpacity>
{isOpen && (
  <ScrollView style={styles.dropdown}>
    {options.map(option => (
      <TouchableOpacity onPress={() => onSelect(option.value)}>
        <Text>{option.label}</Text>
      </TouchableOpacity>
    ))}
  </ScrollView>
)}
```

### Стало (унифицированный компонент)
```javascript
<SelectBox
  options={options}
  selectedValue={selectedValue}
  onSelect={onSelect}
  // ... другие пропсы
/>
```
