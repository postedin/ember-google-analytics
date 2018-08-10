import Application from '@ember/application';
import { get } from '@ember/object';
import Route from '@ember/routing/route';

export function initialize(application: Application): void {
  let config = application.resolveRegistration('config:environment');

  // @ts-ignore
  let trackingId = get(config, 'googleAnalytics.trackingId');

  // @ts-ignore
  if (! trackingId || config.environment !== 'production') {
    return;
  }

  // @ts-ignore
  window.ga('create', get(config, 'googleAnalytics.trackingId'), 'auto');

  Route.reopen({
    actions: {
      didTransition(...args: any[]) {
        this._super(...args);

        // @ts-ignore
        window.ga('set', 'page', this._router.url);
        // @ts-ignore
        window.ga('send', 'pageview');
      },
    },
  });
}

export default {
  initialize,
};
