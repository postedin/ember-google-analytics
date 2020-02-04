import { initialize as init } from '@postedin/ember-google-analytics/instance-initializers/google-analytics';
import config from '../config/environment';

export function initialize(app) {
  return init(app, config);
}

export default {
  initialize,
};
