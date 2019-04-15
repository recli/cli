import React from 'react';
import <%= formatClassName(name) %> from './<%= name %>';

const Component = () => {
  const params = {
    children: 'Whoo hooo',
  };

  return <<%= formatClassName(name) %> {...params} />;
};
export default {
  name: '<%= formatClassName(name) %>',
  children: <Component />,
  text: `
    const params = {
      children: 'Whoo hooo',
    };

    return <<%= formatClassName(name) %> {...params} />;
  `,
};
