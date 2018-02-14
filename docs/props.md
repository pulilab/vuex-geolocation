# Props:

> Most of the configuration is done trough props but several named slot are used as well

## apiUrl
- Type: `String`
- Default: `/api/tickets/`

Define the url where the component should post the submitted form, it is configured to work out of the box with django-simple-feedback

```html
<vue-django-feedback api-url="my_own_url"></vue-django-feedback>
```
