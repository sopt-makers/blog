import type { Meta, StoryObj } from "@storybook/react";
import ArticleListItem from "./ArticleListItem";

const meta: Meta<typeof ArticleListItem> = {
  component: ArticleListItem,
  argTypes: {
    backgroundColor: {
      control: "color",
    },
  },
};

export default meta;
type Story = StoryObj<typeof ArticleListItem>;

export const Primary: Story = {
  args: {
    primary: true,
    label: "Button",
  },
};
