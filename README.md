# Template for django app with a container for browserified js compilation

# Initial Setup
- Replace all occurrences of PROJECT_NAME with project name
- Replace all occurrences of APP_NAME with app project name
- Replace all occurrences of JS_PACKAGE with javascript pacakge name
- For django app, do `docker-compose build`
- Do `docker-compose run --rm bash` and use `django-admin` to create the project

# JS compilation
JavaScript main file is `js-compiler/src/main.js`. Once you start the containers,
it will be compiled into `dist/all.js` (change gulpfile.js if you want to change it)
