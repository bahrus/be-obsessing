# be-obsessing

Read and update session storage (parsing via JSON).

[![NPM version](https://badge.fury.io/js/be-obsessing.png)](http://badge.fury.io/js/be-obsessing)
[![How big is this package in your project?](https://img.shields.io/bundlephobia/minzip/be-obsessing?style=for-the-badge)](https://bundlephobia.com/result?p=be-obsessing)
<img src="http://img.badgesize.io/https://cdn.jsdelivr.net/npm/be-obsessing?compression=gzip">
[![Playwright Tests](https://github.com/bahrus/be-obsessing/actions/workflows/CI.yml/badge.svg?branch=baseline)](https://github.com/bahrus/be-obsessing/actions/workflows/CI.yml)

[be-persisting](https://github.com/bahrus/be-persisting), [be-persistent](https://github.com/bahrus/be-persistent), be-obsessing overlap quite a bit.  They are all concerned with storing user data locally.

The differences in a nutshell:

be-obsessing (this package) focuses on storing data in session storage, and is configured primarily through "Hemingway notation" -  complete English statements (including the name of the attribute).

be-persisting does the same, but focusing on indexedDB.

be-persistent works both with IndexedDB and Session Storage (and local storage), but is configured purely via JSON.

## Example 1a:

```html
<meta itemprop=myProp be-obsessing>
```

... reads JSON.parse(sessionStorage.getItem('myProp')).  Same in reverse (but faster to set oMeta.beValueAdded.value = ...)

Watches for content property, and keeps in sync.

## Example 1b:

```html
<meta itemprop=myProp be-obsessing='about myStorage : my subsection.'>
```

... reads JSON.parse(sessionStorage.getItem('myStorage')).mySubsection and passes to content property.  Same in reverse (but faster to set oMeta.beValueAdded.value = ...)

Watches for content property, and keeps in sync 

## Viewing Demos Locally

Any web server that can serve static files will do, but...

1.  Install git.
2.  Fork/clone this repo.
3.  Install node.js.
4.  Open command window to folder where you cloned this repo.
5.  > npm install
6.  > npm run serve
7.  Open http://localhost:3030/demo/ in a modern browser.

## Running Tests

```
> npm run test
```

## Using from ESM Module:

```JavaScript
import 'be-obsessing/be-obsessing.js';
```

## Using from CDN:

```html
<script type=module crossorigin=anonymous>
    import 'https://esm.run/be-obsessing';
</script>
```


