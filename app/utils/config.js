/* eslint import/namespace: 0 */
import * as config from '../../public/config/config.json';

export function get(value) {
  return config[value];
}