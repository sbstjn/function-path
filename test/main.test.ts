import fp from '../src/main'

it('parse file from path', () => {
  expect(fp.file('foo.bar/baz.lorem')).toBe('foo.bar/baz.js')
  expect(fp.file('foo/bar.baz/lorem')).toBe('foo/bar.baz/lorem.js')
  expect(fp.file('foo/bar.baz/lorem.ipsum')).toBe('foo/bar.baz/lorem.js')
  expect(fp.file('foo/bar/baz.lorem')).toBe('foo/bar/baz.js')
  expect(fp.file('foo/bar.baz.lorem')).toBe('foo/bar.js')
  expect(fp.file('foo/bar.baz')).toBe('foo/bar.js')
  expect(fp.file('foo/bar')).toBe('foo/bar.js')
  expect(fp.file('foo')).toBe('foo.js')
})

it('parse path from path', () => {
  expect(fp.path('foo/bar.baz/lorem/ipsum.dolor')).toBe('dolor')
  expect(fp.path('foo/bar/baz/lorem.ipsum.dolor')).toBe('ipsum.dolor')
  expect(fp.path('foo/bar.baz/lorem.ipsum/dolor.sit.amet')).toBe('sit.amet')
  expect(fp.path('foo/bar.baz.lorem')).toBe('baz.lorem')
  expect(fp.path('foo/bar.baz')).toBe('baz')
  expect(fp.path('foo/bar')).toBe(null)
  expect(fp.path('foo')).toBe(null)
})

it('has path in object', () => {
  const data = {
    first: {
      second: {
        last: false
      }
    }
  }

  expect(fp.has(data, 'first')).toBeTruthy()
  expect(fp.has(data, 'first.second')).toBeTruthy()
  expect(fp.has(data, 'first.second.last')).toBeTruthy()

  expect(fp.has(data, 'second')).toBeFalsy()
  expect(fp.has(data, 'first.last')).toBeFalsy()
  expect(fp.has(data, 'first.second.next')).toBeFalsy()
})

it('get path in object', () => {
  const data = {
    first: {
      second: {
        last: false,
        next: true,
        what: 'this'
      }
    },
    simple: {
      lorem: false
    }
  }

  expect(fp.get(data, 'first.second.what')).toBe('this')
  expect(fp.get(data, 'first.second.next')).toBeTruthy()
  expect(fp.get(data, 'first.second.last')).toBeFalsy()

  expect(fp.get(data, 'simple')).toEqual({ lorem: false })
})

it('require path', () => {
  expect(fp.require(__dirname + '/fixtures/nested.childs.handler').call()).toBe('found nested')
  expect(fp.require(__dirname + '/fixtures/example.handler').call()).toBe('found example')
  expect(fp.require(__dirname + '/fixtures/flat').call()).toBe('found flat')

  expect(() => typeof fp.require(__dirname + '/fixtures/example.handler.unknown')).toThrow()
  expect(() => typeof fp.require(__dirname + '/fixtures/flat.unknown')).toThrow()
})
