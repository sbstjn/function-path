const Interface = {
  file: (path: string) => {
    let absp = path.substr(0, path.lastIndexOf('/'))
    let file = path.substr(path.lastIndexOf('/') + 1)

    if (absp === '') {
      absp = file
      file = ''
    }

    if (file && file.indexOf('.') > -1) {
      absp = absp + '/' + file.substr(0, file.indexOf('.'))
    } else {
      if (file) {
        absp = absp + '/' + file
      }
    }

    return `${absp}.js`
  },

  get: (data: object, path: string): any => {
    const tmp = (path || '').split('.')
    const key = tmp.shift() || ''

    if (!path) {
      return data
    }

    if (tmp.length === 0 && data.hasOwnProperty(key)) {
      return data[key]
    }

    if (!!data[key]) {
      return Interface.get(data[key], tmp.join('.'))
    }

    throw new Error('Cannot find path in data')
  },

  has: (data: object, path: string): boolean => {
    try {
      Interface.get(data, path)

      return true
    } catch (e) {
      return false
    }
  },

  path: (path: string) => {
    const last = path.substr(path.lastIndexOf('/') + 1)

    if (last.indexOf('.') > -1) {
      return last.substr(last.indexOf('.') + 1)
    }

    return null
  },

  require: (path: string) => {
    const tmp = require(Interface.file(path))

    return Interface.get(tmp, Interface.path(path) || '')
  }
}

export default Interface
