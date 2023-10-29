# be-obsessing [TODO]

Read and update session storage (parsing via JSON).

```html
<meta itemprop=myProp be-obsessing='about myStorage : my subsection.'>
```

... reads JSON.parse(sessionStorage.getItem('myStorage')).mySubsection