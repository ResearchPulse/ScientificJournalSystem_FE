import AuthorNavigationTabs from './AuthorNavigationTabs';

export default {
  title: 'Features/Author/AuthorNavigationTabs',
  component: AuthorNavigationTabs,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
  argTypes: { onTabChange: { action: 'onTabChange' } },
};

export const Default = {
  args: {
    activeTab: 'articles',
  },
};
