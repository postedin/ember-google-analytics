'use strict';

module.exports = {
  name: '@postedin/ember-google-analytics',

  contentFor(type) {
    if (type === 'body-footer') {
      return `
        <script>
          window.ga=window.ga||function(){(ga.q=ga.q||[]).push(arguments)};ga.l=+new Date;
        </script>
        <script async src='https://www.google-analytics.com/analytics.js'></script>
      `;
    }
  },
};
