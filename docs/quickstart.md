# Quick Start

### Installation
Install the component through npm or yarn


```shell
npm install -s vue-django-feedback

yarn add vue-django-feedback
```

### Integration

> vue-django-feedback is a web component so you only need to import the js files and optionally the css and then you can just write the html markup anywhere

#### Required JS
```javascript
import 'vue-django-feedback';
or
require('vue-django-feedback');
```

or in your html

```html
<script src="//unpkg.com/vue-django-feedback/dist/packaged/vue-django-feedback.js"></script>
```

#### Component utilization

```html
<!-- Basic usage, this will trigger the not Authenticated view -->
<vue-django-feedback></vue-django-feedback>

<!-- Filling the props name and email will trigger the authenticated view mode -->
<vue-django-feedback name="hosting" email="hosting@pulilab.com"></vue-django-feedback>

```

#### Optional CSS
> vue-django-feedback style is written in a simple modular LESS that uses variables theming, the standard style is also precompiled in css

Import the standard style

```javascript
import 'vue-django-feedback/dist/style.css';
or
require('vue-django-feedback//dist/style.css');
```

Or directly in HTML

```html
<link rel="stylesheet" href="NODE_MODULE_FOLDER/vue-django-feedback/dist/style.css">
```
