module.exports = Locastore

const window = require('global/window')
const ls = typeof window !== 'undefined' && window.localStorage
let memory = Object.create(null)

function Locastore (ns) {
  if (!(this instanceof Locastore)) return new Locastore(ns)
  this.namespace = ns || ''
}
Locastore.default = Locastore

Locastore.prototype.get = function (key) {
  let val
  key = this.namespace + '.' + key
  try {
    val = ls.getItem(key)
  } catch (err) {
    val = memory[key]
  }
  if (val === null || typeof val === 'undefined') {
    return null
  }
  return JSON.parse(val)
}

Locastore.prototype.set = function (key, val) {
  if (key === null || typeof key === 'undefined' || val === null || typeof val === 'undefined') {
    return
  }
  key = this.namespace + '.' + key
  val = JSON.stringify(val)
  memory[key] = val
  try {
    ls.setItem(key, val)
  } catch (err) { }
}

Locastore.prototype.delete = function (key) {
  key = this.namespace + '.' + key
  delete memory[key]
  try {
    return ls.removeItem(key)
  } catch (err) {}
}

Locastore.prototype.clear = function () {
  const keys = Object.keys(memory)
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i]
    if (key.slice(0, this.namespace.length + 1) === this.namespace + '.') {
      this.delete(key.slice(this.namespace.length + 1))
    }
  }
}

Locastore.clear = function () {
  memory = Object.create(null)
  try {
    ls.clear()
  } catch (err) { }
}
