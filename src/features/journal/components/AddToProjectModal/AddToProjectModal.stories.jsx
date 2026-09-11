import AddToProjectModal from './AddToProjectModal';

export default {
  title: 'Features/Journal/AddToProjectModal',
  component: AddToProjectModal,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: { onHide: { action: 'onHide' }, onSuccess: { action: 'onSuccess' } },
};

export const Open = {
  args: {
    show: true,
    journalId: 'j1',
  },
};
