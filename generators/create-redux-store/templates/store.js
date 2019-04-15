/* eslint-disable */
import { storage } from 'store/__utils__/localstorage';

const stateExample = {
  id: undefined,
  name: undefined,
  balance: undefined,
}

function <%= formatCamelCase(name) %>(state = null, { action, types }) {
  if (!types) return state;

  switch (action.type) {
    case types.userLogout:
      return null;

    default:
      return state;
  }
}

const <%= pluralize(formatCamelCase(name)) %> = storage('<%= pluralize(formatCamelCase(name)) %>', [], (state, { action, types }) => {
  if (!types) return state;

  switch (action.type) {
    case types.userLogout:
      return [];

    default:
      return state;
  }
});

/**
 * Gets <%= pluralize(formatCamelCase(name)) %>
 * @param {params} params
 */
const get<%= pluralize(formatClassName(name)) %> = async params => ({
  params,
});

export default {
  reducers: {
    <%= formatCamelCase(name) %>,
    <%= pluralize(formatCamelCase(name)) %>,
  },
  actions: {
    get<%= pluralize(formatClassName(name)) %>,
  },
  state: {
    <%= formatCamelCase(name) %>: stateExample,
    <%= pluralize(formatCamelCase(name)) %>: [stateExample],
  },
};
/* eslint-enable */
