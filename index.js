'use strict';

module.exports = {
  name: require('./package').name,

  contentFor(type) {
    if (type === 'body-footer') {
      return `
        <script async src="https://www.googletagmanager.com/gtag/js"></script>
        <script>
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
        </script>
      `;
    }
  },
};
