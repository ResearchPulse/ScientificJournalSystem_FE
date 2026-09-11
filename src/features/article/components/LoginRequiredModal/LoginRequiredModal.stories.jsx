import LoginRequiredModal from './LoginRequiredModal';

export default {
  title: 'Features/Article/LoginRequiredModal',
  component: LoginRequiredModal,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    onHide: { action: 'onHide' },
  },
};

export const Open = {
  args: {
    show: true,
  },
};
