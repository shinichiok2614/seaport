import type { Meta, StoryObj } from '@storybook/react';

import CategoryHeader from './category-header';

const meta = {
  component: CategoryHeader,
  args: {
    categories: { control: 'object' },
  },
} satisfies Meta<typeof CategoryHeader>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    categories: [
      {
        id: 3,
        name: 'hmph kilt down',
        posts: [],
      },
      { id: 2, name: 'Health' },
      { id: 3, name: 'Science' },
      { id: 4, name: 'Sports' },
      { id: 5, name: 'Business' },
      { id: 6, name: 'Entertainment' },
      { id: 7, name: 'Travel' },
      { id: 8, name: 'Education' },
      { id: 9, name: 'Fashion' },
      { id: 10, name: 'Food' },
    ],
  },
};
