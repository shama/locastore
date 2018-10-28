module.exports = Locastore

var window = require('global/window')
var ls = typeof window !== 'undefined' && window.localStorage
var memory = Object.create(null)

function Locastore (ns) {
  if (!(this instanceof Locastore)) return new Locastore(ns)
  this.namespace = ns || ''
}
Locastore.default = Locastore

Locastore.prototype.get = function (key) {
  var val
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
  var keys = Object.keys(memory)
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i]
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
