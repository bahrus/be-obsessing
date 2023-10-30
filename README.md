# be-obsessing [TODO]

Read and update session storage (parsing via JSON).

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