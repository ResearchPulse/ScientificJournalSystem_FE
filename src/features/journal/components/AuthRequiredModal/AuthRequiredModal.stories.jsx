import AuthRequiredModal from './AuthRequiredModal';

export default {
  title: 'Features/Journal/AuthRequiredModal',
  component: AuthRequiredModal,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: { onHide: { action: 'onHide' } },
};

export const Open = {
  args: {
    show: true,
  },
};
