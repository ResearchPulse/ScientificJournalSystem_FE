import JournalTabs from './JournalTabs';

export default {
  title: 'Features/Journal/JournalTabs',
  component: JournalTabs,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
  argTypes: { onTabSelect: { action: 'onTabSelect' } },
};

export const Default = {
  args: {
    activeTab: 'articles',
  },
};
