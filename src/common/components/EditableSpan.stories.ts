import type { Meta, StoryObj } from '@storybook/react-vite';

import { EditableSpan } from './EditableSpan';

const meta = {
  component: EditableSpan,
} satisfies Meta<typeof EditableSpan>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    value: 'esim',
    onChange: () => {}
  },
}