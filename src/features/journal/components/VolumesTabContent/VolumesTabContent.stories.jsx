import VolumesTabContent from './VolumesTabContent';

export default {
  title: 'Features/Journal/VolumesTabContent',
  component: VolumesTabContent,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
};

export const Default = {
  args: {
    volumes: [
      { volume_id: '1', volume_number: 12, year: 2024, issues_count: 4 },
      { volume_id: '2', volume_number: 11, year: 2023, issues_count: 4 },
    ],
    loading: false,
  },
};
