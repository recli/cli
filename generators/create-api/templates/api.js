// eslint-disable-next-line
import { fetch } from './utils/create-fetch';
import { generateREST } from './utils/rest-api-generator';

export const {
  search<%= formatClassName(secondName) %>,
  getAll<%= formatClassName(secondName) %>,
  create<%= formatClassName(name) %>,
  update<%= formatClassName(name) %>,
  delete<%= formatClassName(name) %>,
  get<%= formatClassName(name) %>,
} = generateREST('<%= secondName %>', '<%= name %>');

// For custome api please use notation below

// export const get<%= formatClassName(name) %> = ()=> {
//     return fetch('/api/<%= name %>', {
//         method: 'GET'
//     });
// };

// export const save<%= formatClassName(name) %> = (params)=> {
//     return fetch('/api/<%= name %>', {
//         method: 'POST',
//         params: {
//             ...params
//         }
//     });
// };
