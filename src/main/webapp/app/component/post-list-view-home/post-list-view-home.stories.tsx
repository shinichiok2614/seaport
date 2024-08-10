import type { Meta, StoryObj } from '@storybook/react';

import PostListViewHome from './post-list-view-home';

const meta = {
  component: PostListViewHome,
  args: {
    postList: { control: 'object' },
  },
} satisfies Meta<typeof PostListViewHome>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    postList: [
      {
        id: 1,
        name: 'Iran says it has duty to punish Israel over killing of Hamas leader in Tehran',
        summary:
          'Crisis meeting of Arab states this week may set agenda for retaliation as countries urge Iran to show restraint',
        image: 'https://via.placeholder.com/150',
        view: 123,
        createdAt: '2024-08-01T12:00:00Z',
        category: { id: 1, name: 'Category 1' },
        post: { login: 'author1' },
        person: { name: 'THANH TUYỀN' },
      },
      {
        id: 2,
        name: 'Iran says it has duty to punish Israel over killing of Hamas leader in Tehran',
        summary:
          'Crisis meeting of Arab states this week may set agenda for retaliation as countries urge Iran to show restraint',
        image: 'https://via.placeholder.com/150',
        view: 456,
        modifiedAt: '2024-08-04T12:00:00Z',
        category: { id: 2, name: 'Category 2' },
        post: { login: 'author2' },
        person: { name: 'THANH TUYỀN' },
      },
      {
        id: 3,
        name: 'Iran says it has duty to punish Israel over killing of Hamas leader in Tehran',
        summary:
          'Crisis meeting of Arab states this week may set agenda for retaliation as countries urge Iran to show restraint',
        image: 'https://via.placeholder.com/150',
        view: 456,
        modifiedAt: '2024-08-04T12:00:00Z',
        category: { id: 2, name: 'Category 2' },
        post: { login: 'author2' },
        person: { name: 'THANH TUYỀN' },
      },
      {
        id: 4,
        name: 'Iran says it has duty to punish Israel over killing of Hamas leader in Tehran',
        summary:
          'Crisis meeting of Arab states this week may set agenda for retaliation as countries urge Iran to show restraint',
        image: 'https://via.placeholder.com/150',
        view: 456,
        modifiedAt: '2024-08-04T12:00:00Z',
        category: { id: 2, name: 'Category 2' },
        post: { login: 'author2' },
        person: { name: 'THANH TUYỀN' },
      },
      {
        id: 5,
        name: 'Iran says it has duty to punish Israel over killing of Hamas leader in Tehran',
        summary:
          'Crisis meeting of Arab states this week may set agenda for retaliation as countries urge Iran to show restraint',
        image: 'https://via.placeholder.com/150',
        view: 456,
        modifiedAt: '2024-08-04T12:00:00Z',
        category: { id: 2, name: 'Category 2' },
        post: { login: 'author2' },
        person: { name: 'THANH TUYỀN' },
      },
      {
        id: 6,
        name: 'Iran says it has duty to punish Israel over killing of Hamas leader in Tehran',
        summary:
          'Crisis meeting of Arab states this week may set agenda for retaliation as countries urge Iran to show restraint',
        image: 'https://via.placeholder.com/150',
        view: 456,
        modifiedAt: '2024-08-04T12:00:00Z',
        category: { id: 2, name: 'Category 2' },
        post: { login: 'author2' },
        person: { name: 'THANH TUYỀN' },
      },
      {
        id: 7,
        name: '7 Post',
        summary: 'This is the summary of the 7 post',
        image: 'https://via.placeholder.com/150',
        view: 456,
        modifiedAt: '2024-08-04T12:00:00Z',
        category: { id: 2, name: 'Category 2' },
        post: { login: 'author2' },
        person: { name: 'THANH TUYỀN' },
      },
      {
        id: 3,
        name: 'Iran says it has duty to punish Israel over killing of Hamas leader in Tehran',
        summary:
          'Crisis meeting of Arab states this week may set agenda for retaliation as countries urge Iran to show restraint',
        image: 'https://via.placeholder.com/150',
        view: 456,
        modifiedAt: '2024-08-04T12:00:00Z',
        category: { id: 2, name: 'Category 2' },
        post: { login: 'author2' },
        person: { name: 'THANH TUYỀN' },
      },
      {
        id: 8,
        name: 'Iran says it has duty to punish Israel over killing of Hamas leader in Tehran',
        summary:
          'Crisis meeting of Arab states this week may set agenda for retaliation as countries urge Iran to show restraint',
        image: 'https://via.placeholder.com/150',
        view: 456,
        modifiedAt: '2024-08-04T12:00:00Z',
        category: { id: 2, name: 'Category 2' },
        post: { login: 'author2' },
        person: { name: 'THANH TUYỀN' },
      },
      {
        id: 9,
        name: 'Iran says it has duty to punish Israel over killing of Hamas leader in Tehran',
        summary:
          'Crisis meeting of Arab states this week may set agenda for retaliation as countries urge Iran to show restraint',
        image: 'https://via.placeholder.com/150',
        view: 456,
        modifiedAt: '2024-08-04T12:00:00Z',
        category: { id: 2, name: 'Category 2' },
        post: { login: 'author2' },
        person: { name: 'THANH TUYỀN' },
      },
      {
        id: 10,
        name: 'Iran says it has duty to punish Israel over killing of Hamas leader in Tehran',
        summary:
          'Crisis meeting of Arab states this week may set agenda for retaliation as countries urge Iran to show restraint',
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
