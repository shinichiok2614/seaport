import type { Meta, StoryObj } from '@storybook/react';

import PostListViewPerson from './post-list-view-person';

const meta = {
  component: PostListViewPerson,
  args: {
    postList: { control: 'object' },
  },
} satisfies Meta<typeof PostListViewPerson>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    postList: [
      {
        id: 1,
        name: 'First Post',
        summary: 'This is the summary of the first post',
        image: 'https://via.placeholder.com/150',
        view: 123,
        createdAt: '2024-08-01T12:00:00Z',
        category: { id: 1, name: 'Category 1' },
        post: { login: 'author1' },
        person: { name: 'THANH TUYỀN' },
      },
      {
        id: 2,
        name: 'Second Post',
        summary: 'This is the summary of the second post',
        image: 'https://via.placeholder.com/150',
        view: 456,
        modifiedAt: '2024-08-04T12:00:00Z',
        category: { id: 2, name: 'Category 2' },
        post: { login: 'author2' },
        person: { name: 'THANH TUYỀN' },
      },
    ],
  },
};
