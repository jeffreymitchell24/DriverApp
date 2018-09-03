import { ADD_APP, DELETE_APP } from './constants';

export function addApp(app) {
  return {
    type: 'ADD_APP',
    app
  };
}
export function deletApp(app) {
  return {
    type: 'DELETE_APP',
    app
  };
}
