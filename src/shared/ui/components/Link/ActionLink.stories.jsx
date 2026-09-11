import ActionLink from './ActionLink';

export default {
  title: 'UI/Components/ActionLink',
  component: ActionLink,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'muted', 'danger'],
    },
    underline: {
      control: 'select',
      options: ['always', 'hover', 'none'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    iconPosition: {
      control: 'inline-radio',
      options: ['left', 'right'],
    },
  },
};

export const Primary = {
  args: {
    children: 'View articles',
    icon: 'lucide:arrow-right',
    variant: 'primary',
    underline: 'always',
    size: 'sm',
  },
};

export const SeeAll = {
  args: {
    children: 'See all',
    variant: 'primary',
    underline: 'always',
    size: 'sm',
  },
};

export const External = {
  args: {
    children: 'Visit publisher site',
    href: 'https://nature.com',
    target: '_blank',
    icon: 'lucide:external-link',
    variant: 'primary',
  },
};
