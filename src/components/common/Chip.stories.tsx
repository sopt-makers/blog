import type { Meta, StoryObj } from '@storybook/react';

import Chip from './Chip';

const meta: Meta<typeof Chip> = {
  component: Chip,
  decorators: [
    (Story) => (
      <div className='flex'>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Chip>;

export const NonActive: Story = {
  args: {
    children: '개발',
    active: false,
  },
};

export const Active: Story = {
  args: {
    children: '개발',
    active: true,
  },
};
