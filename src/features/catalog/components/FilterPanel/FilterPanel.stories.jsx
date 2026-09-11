import FilterPanel from './FilterPanel';

export default {
  title: 'Features/Catalog/FilterPanel',
  component: FilterPanel,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    setSearchInput: { action: 'setSearchInput' },
    onSearchSubmit: { action: 'onSearchSubmit' },
    onAreaSelect: { action: 'onAreaSelect' },
    onCategorySelect: { action: 'onCategorySelect' },
    onAccessSelect: { action: 'onAccessSelect' },
    onQuartileSelect: { action: 'onQuartileSelect' },
    onYearSelect: { action: 'onYearSelect' },
    onZoneSelect: { action: 'onZoneSelect' },
    onOaDiamondToggle: { action: 'onOaDiamondToggle' },
    onClearAll: { action: 'onClearAll' },
  },
};

const mockAreas = [
  { id: '1', name: 'Computer Science' },
  { id: '2', name: 'Medicine' },
  { id: '3', name: 'Mathematics' },
];

const mockCategories = [
  { id: '101', name: 'Artificial Intelligence' },
  { id: '102', name: 'Information Systems' },
];

export const Default = {
  args: {
    searchInput: '',
    subjectAreas: mockAreas,
    subjectCategories: mockCategories,
    selectedAreas: [],
    selectedCategories: [],
    selectedAccess: [],
    selectedQuartiles: [],
    selectedYear: '',
    selectedZone: '',
    zones: ['Q1', 'Q2', 'Q3', 'Q4'],
    isOaDiamond: false,
    loading: false,
  },
};

export const WithActiveFilters = {
  args: {
    searchInput: 'Deep Learning',
    subjectAreas: mockAreas,
    subjectCategories: mockCategories,
    selectedAreas: ['1'],
    selectedCategories: ['101'],
    selectedAccess: ['oa'],
    selectedQuartiles: ['Q1'],
    selectedYear: '2024',
    selectedZone: 'Q1',
    zones: ['Q1', 'Q2', 'Q3', 'Q4'],
    isOaDiamond: true,
    loading: false,
  },
};
