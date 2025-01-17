import React from 'react';
import { Meta } from '@storybook/react';
import { DaoList } from 'components/nav-dao/DaoList';

export default {
  title: 'Components/Sidebar/DaoList',
  component: DaoList,
  parameters: {
    backgrounds: {
      default: 'sidebar',
      values: [
        {
          name: 'sidebar',
          value: '#251455'
        }
      ]
    },
    nextRouter: {
      pathname: '/',
      asPath: '/'
    }
  }
} as Meta;

export const Template = (
  args: React.ComponentProps<typeof DaoList>
): JSX.Element => {
  return <DaoList {...args} />;
};

Template.storyName = 'DaoList';

const items = [
  {
    label: 'Dao Name 1',
    id: 'dao-1',
    count: 31,
    logo: ''
  },
  {
    label: 'Dao Name 2',
    id: 'dao-2',
    logo: ''
  },
  {
    label: 'Dao Name 3',
    id: 'dao-3',
    logo: '',
    count: 1034
  }
];

Template.args = {
  items,
  onChange: null
};
