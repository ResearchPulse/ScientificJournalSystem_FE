import VolumeList from './VolumeList';

export default {
  title: 'Features/Journal/VolumeList',
  component: VolumeList,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
  argTypes: { onSelectVolume: { action: 'onSelectVolume' } },
};

export const Default = {
  args: {
    volumes: [
      { volume_id: '1', volume_number: 12, year: 2024 },
      { volume_id: '2', volume_number: 11, year: 2023 },
    ],
    selectedVolumeId: '1',
  },
};
