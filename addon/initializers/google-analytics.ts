import Application from '@ember/application';
import { assert } from '@ember/debug';
import { get } from '@ember/object';
import Route from '@ember/routing/route';

export function initialize(application: Application): void {
  let env = application.resolveRegistration('config:environment');
  // @ts-ignore
  let trackingId = get(env, 'google-analytics.trackingId');

  if (! trackingId) {
    return;
  }

  // @ts-ignore
  window.ga('create', get(env, 'google-analytics.trackingId'), 'auto');

  Route.reopen({
    actions: {
      didTransition(...args: any[]) {
        this._super(...args);

        // @ts-ignore
        window.ga('set', 'page', this.router.url);
        // @ts-ignore
        window.ga('send', 'pageview');
      },
    },
  });
}

export default {
  initialize,
};
