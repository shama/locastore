const test = require('tape')
const locastore = require('./index.js')

test('get/set', function (t) {
  t.plan(5)
  locastore.clear()

  const store = locastore()
  t.equal(store.get('test'), null, 'item is null if it doesnt exist')
  store.set('test', 'worked')
  t.equal(store.get('test'), 'worked', 'item was set/get properly')
  store.set('test', { worked: true })
  t.deepEqual(store.get('test'), { worked: true }, 'objects were set/get properly')

  const storeNS = locastore('ns')
  storeNS.set('test', { hasNS: true })
  t.deepEqual(storeNS.get('test'), { hasNS: true }, 'can set namespaced item')
  t.deepEqual(store.get('test'), { worked: true }, 'namespaced item doesnt affect the others')

  t.end()
})

test('delete', function (t) {
  t.plan(4)
  locastore.clear()

  const store = locastore()
  const storeNS = locastore('ns')
  store.set('test', 'worked')
  storeNS.set('test', 'worked')

  t.equal(store.get('test'), 'worked', 'item was set/get properly')
  t.equal(storeNS.get('test'), 'worked', 'item was set/get properly')

  store.delete('test')
  t.equal(store.get('test'), null, 'item was deleted properly')
  t.equal(storeNS.get('test'), 'worked', 'item in another namespace was not deleted')

  t.end()
})

test('clear', function (t) {
  t.plan(10)
  locastore.clear()

  const store = locastore()
  const storeNS = locastore('ns')
  store.set('test', 'worked')
  store.set('test2', 'worked')
  storeNS.set('test', 'worked')
  storeNS.set('test2', 'worked')

  t.equal(store.get('test'), 'worked', 'item was set/get properly')
  t.equal(store.get('test2'), 'worked', 'item2 was set/get properly')
  t.equal(storeNS.get('test'), 'worked', 'item was set/get properly')
  t.equal(storeNS.get('test2'), 'worked', 'item2 was set/get properly')

  store.clear()
  t.equal(store.get('test'), null, 'item was cleared properly')
  t.equal(store.get('test2'), null, 'item2 was cleared properly')
  t.equal(storeNS.get('test'), 'worked', 'item in another namespace was not cleared')
  t.equal(storeNS.get('test2'), 'worked', 'item2 in another namespace was not cleared')

  locastore.clear()
  t.equal(storeNS.get('test'), null, 'all items cleared')
  t.equal(storeNS.get('test2'), null, 'all items cleared')

  t.end()
})

test('cant set null or undefined values', function (t) {
  t.plan(4)
  locastore.clear()

  const store = locastore()
  store.set('test', null)
  t.equal(store.get('test'), null, 'set value null should be null')
  store.set('test', undefined)
  t.equal(store.get('test'), null, 'set value undefined should be null')
  store.set(null, 'test')
  t.equal(store.get(null), null, 'set key null should be null')
  store.set(undefined, 'test')
  t.equal(store.get(undefined), null, 'set key undefined should be null')

  t.end()
})
