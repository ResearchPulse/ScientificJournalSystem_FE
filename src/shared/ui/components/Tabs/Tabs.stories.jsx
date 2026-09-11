import { expect } from 'storybook/test';
import Tabs, { TabList, Tab, TabPanel } from './Tabs';

const meta = {
  component: Tabs,
  tags: ['ai-generated'],
};

export default meta;

export const Underline = {
  render: () => (
    <Tabs defaultTab="articles" variant="underline">
      <TabList>
        <Tab eventKey="articles" icon="lucide:file-text">Articles (128)</Tab>
        <Tab eventKey="authors" icon="lucide:users">Authors (42)</Tab>
        <Tab eventKey="metrics" icon="lucide:bar-chart-3">Metrics</Tab>
      </TabList>
      <TabPanel eventKey="articles">List of published scientific papers.</TabPanel>
      <TabPanel eventKey="authors">List of contributing researchers.</TabPanel>
      <TabPanel eventKey="metrics">Citation indices and SJR rankings.</TabPanel>
    </Tabs>
  ),
};

export const Pills = {
  render: () => (
    <Tabs defaultTab="overview" variant="pills">
      <TabList>
        <Tab eventKey="overview">Overview</Tab>
        <Tab eventKey="volumes">Volumes & Issues</Tab>
        <Tab eventKey="settings">Settings</Tab>
      </TabList>
      <TabPanel eventKey="overview">Journal overview content.</TabPanel>
      <TabPanel eventKey="volumes">Archive volumes content.</TabPanel>
      <TabPanel eventKey="settings">Configuration panel.</TabPanel>
    </Tabs>
  ),
};

export const CssCheck = {
  render: () => (
    <Tabs defaultTab="first" variant="underline">
      <TabList>
        <Tab eventKey="first">Tab One</Tab>
        <Tab eventKey="second">Tab Two</Tab>
      </TabList>
      <TabPanel eventKey="first">First content</TabPanel>
      <TabPanel eventKey="second">Second content</TabPanel>
    </Tabs>
  ),
  play: async ({ canvas }) => {
    const activeTab = canvas.getByRole('tab', { name: /tab one/i });
    await expect(activeTab).toHaveAttribute('aria-selected', 'true');
  },
};
