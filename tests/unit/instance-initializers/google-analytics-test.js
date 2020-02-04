import Application from '@ember/application';

import { initialize } from 'dummy/instance-initializers/google-analytics';
import { module, test } from 'qunit';
import { run } from '@ember/runloop';
import config from '../../../config/environment';

module('Unit | Instance Initializer | google-analytics', function(hooks) {
  hooks.beforeEach(function() {
    window.dataLayer = [];

    this.TestApplication = Application.extend();
    this.TestApplication.instanceInitializer({
      name: 'initializer under test',
      initialize: function (app) {
        return initialize(app, config);
      },
    });
    this.application = this.TestApplication.create({ autoboot: false });
    this.instance = this.application.buildInstance();
  });
  hooks.afterEach(function() {
    run(this.instance, 'destroy');
    run(this.application, 'destroy');
  });

  // Replace this with your real tests.
  test('datalayer and gtag is defined', async function(assert) {
    await this.instance.boot();

    assert.ok(Array.isArray(window.dataLayer));
    assert.ok(typeof window.gtag === 'function');
  });

  test('datalayer and gtag is not defined', async function(assert) {
    await this.instance.boot();

    assert.strictEqual(window.dataLayer.filter(d => d[0] === 'config').length, 0);
  });

  test('configured when production and a tracking code exists', async function(assert) {
    config.environment = 'production';
    config.googleAnalytics = { trackingId: 'trackme' };

    await this.instance.boot();

    assert.strictEqual(window.dataLayer.filter(d => d[0] === 'config').length, 1);
  });

  test('not configured when not production and a tracking code exists', async function(assert) {
    config.environment = 'not-produdction';
    config.googleAnalytics = { trackingId: 'trackme' };

    await this.instance.boot();

    assert.strictEqual(window.dataLayer.filter(d => d[0] === 'config').length, 0);
  });

  test('configured when specifying environment with a string and a tracking code exists', async function(assert) {
    config.environment = 'staging';
    config.googleAnalytics = { trackingId: 'trackme', trackEnvironments: 'staging' };

    await this.instance.boot();

    assert.strictEqual(window.dataLayer.filter(d => d[0] === 'config').length, 1);
  });

  test('not configured when specifying environment as a different string and a tracking code exists', async function(assert) {
    config.environment = 'staging';
    config.googleAnalytics = { trackingId: 'trackme', trackEnvironments: 'not-staging' };

    await this.instance.boot();

    assert.strictEqual(window.dataLayer.filter(d => d[0] === 'config').length, 0);
  });

  test('configured when specifying environment as an array and a tracking code exists', async function(assert) {
    config.environment = 'staging';
    config.googleAnalytics = { trackingId: 'trackme', trackEnvironments: ['staging', 'test'] };

    await this.instance.boot();

    assert.strictEqual(window.dataLayer.filter(d => d[0] === 'config').length, 1);
  });

  test('test changing route notifies page_view', async function(assert) {
    config.environment = 'production';
    config.googleAnalytics = { trackingId: 'trackme' };

    let app = await this.instance.boot();

    assert.strictEqual(window.dataLayer.filter(d => d[0] === 'config').length, 1);

    app.lookup('service:router').trigger('routeDidChange');
    assert.strictEqual(window.dataLayer.filter(d => d[0] === 'event' && d[1] === 'page_view').length, 1);
  });
});
