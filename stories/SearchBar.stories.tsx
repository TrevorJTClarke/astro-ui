import React from 'react';
import { Meta, Story } from '@storybook/react';
import SearchBar, { SearchBarProps } from 'components/search-bar';

export default {
  title: 'Components/SearchBar',
  component: SearchBar,
  decorators: [story => <div style={{ padding: '8px' }}>{story()}</div>]
} as Meta;

const Template: Story<SearchBarProps> = (args): JSX.Element => (
  <SearchBar {...args} />
);

export const Default = Template.bind({});

Default.args = {
  placeholder: 'Search for a proposal or community'
};
