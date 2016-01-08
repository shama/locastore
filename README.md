# locastore

A localStorage wrapper that falls back to memory in private browsing mode.

## install

* `npm install locastore`

## api

### `var store = new Locastore([namespace])`
`namespace` is a string to prefix to each key.

### `store.get(key)`
Retrieve a key. If `localStorage.getItem()` fails, falls back to memory store.

### `store.set(key, value)`
Store a key in memory and with `localStorage.setItem()`.

### `store.delete(key)`
Removes a key from memory and `localStorage.removeItem()`.

### `store.clear()`
Removes all items from memory and localStorage within the namespace.

### `Locastore.clear()`
Removes all items from memory and localStorage.

## similar projects

* [local-store](https://www.npmjs.com/package/local-store)
  A localStorage based store with name spacing
* [local-storage](https://www.npmjs.com/package/local-storage)
  A simplified localStorage API that just works

# license
(c) 2016 Kyle Robinson Young. MIT License
