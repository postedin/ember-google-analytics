export function initialize(app, config) {
  const settings = config.googleAnalytics;

  if (! settings || ! settings.trackingId) {
    return;
  }

  let envs = ['production'];

  if (typeof settings.trackEnvironments === 'string') {
    envs = [settings.trackEnvironments];
  } else if (Array.isArray(settings.trackEnvironments)) {
    envs = settings.trackEnvironments;
  }

  if (! envs.includes(config.environment)) {
    return;
  }

  window.gtag('config', settings.trackingId);

  app.lookup('service:router').on('routeDidChange', () => {
    window.gtag('event', 'page_view');
  });
}
