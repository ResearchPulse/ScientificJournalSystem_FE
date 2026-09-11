import AbstractCard from './AbstractCard';

export default {
  title: 'Features/Article/AbstractCard',
  component: AbstractCard,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};

export const Default = {
  args: {
    abstract:
      'We introduce a scalable deep neural network architecture designed specifically for tracking multi-agent dynamics in complex scientific publication networks. By leveraging graph neural representations and hyperbolic geometry, our model captures emergent publication trends and citation hierarchies with high predictive accuracy across diverse scientific disciplines.',
  },
};

export const ShortAbstract = {
  args: {
    abstract:
      'A study examining trends in deep learning architectures across scientific literature from 2020 to 2026.',
  },
};

export const EmptyAbstract = {
  args: {
    abstract: '',
  },
};
