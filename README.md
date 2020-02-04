ember-google-analytics
==============================================================================

This addon will simply add gtags.js to index.html like a normal embed but configure and trigger it in ember using the configs you provide.


Installation
------------------------------------------------------------------------------

```
ember install @postedin/ember-google-analytics
```


Usage
------------------------------------------------------------------------------

### Add your tracking code to your `config/environment.js`.

EG:
```js
module.exports = function(environment) {
  let ENV = {
    ...
    googleAnalytics: {
      trackingId: 'UA-xxxxxxx-x',
    },
  };
```

### By default the tracking is only enabled in the production environment. But you can specify which environments to run it on as well.

```js
module.exports = function(environment) {
  let ENV = {
    ...
    googleAnalytics: {
      trackingId: 'UA-xxxxxxx-x',
      trackEnvironments: 'awesome-env',
      // or
      trackEnvironments: ['production', 'staging', 'etc'],
    },
  };
```

Contributing
------------------------------------------------------------------------------

### Installation

* `git clone https://github.com/postedin/ember-google-analytics`
* `cd ember-google-analytics`
* `yarn install`

### Linting

* `yarn lint:js`
* `yarn lint:js --fix`

### Running tests

* `ember test` – Runs the test suite on the current Ember version
* `ember test --server` – Runs the test suite in "watch mode"
* `ember try:each` – Runs the test suite against multiple Ember versions


License
------------------------------------------------------------------------------

This project is licensed under the [MIT License](LICENSE.md).
