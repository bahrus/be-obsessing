# be-obsessing [TODO]

Read and update session storage (parsing via JSON).

```html
<meta itemprop=myProp be-obsessing='about myStorage : my subsection.'>
```

... reads JSON.parse(sessionStorage.getItem('myStorage')).mySubsection and passes to content property.  Same in reverse (but faster to set oMeta.beValueAdded.value = ...)

Watches for content property, and keeps in syync 