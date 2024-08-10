import type { Meta, StoryObj } from '@storybook/react';

import ProfileMeta from './profile-meta';

const meta = {
  component: ProfileMeta,
  argTypes: {
    personEntity: { control: 'object' },
    user: { control: 'object' },
    department: { control: 'object' },
  },
} satisfies Meta<typeof ProfileMeta>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    personEntity: {
      id: 1,
      name: 'John Doe',
      bio: 'A brief bio about John Doe.',
      phone: '1234567890',
      country: 'USA',
      address: '123 Main St',
      createdAt: new Date(),
      updateAt: new Date(),
      dateOfBirth: new Date(),
      isAuthor: true,
      user: 1,
      department: 1,
    },
    user: { id: 1, login: 'johndoe' },
    department: { id: 1, name: 'Engineering' },
  },
};
