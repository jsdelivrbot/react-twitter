# Debut Exercise

### Gulp tasks

##### `$ gulp js`

Generate `app/static/js/bundle.js` from `app/client/app.js` using Browserify.

##### `$ gulp css`

Generate `app/static/css/main.css` from `app/client/stylesheets/main.scss` using SASS.

##### `$ gulp launch`

Runs `js` and `css` tasks and subsequently starts the Express app (`app/server/index.js`) and installs watchers for frontend and backend file changes.
