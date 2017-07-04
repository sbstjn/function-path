import Path from '../src/main.ts';

it('parse file from path', () => {
  expect(Path.file("foo.bar/baz.lorem")).toBe("foo.bar/baz.js")
  expect(Path.file("foo/bar.baz/lorem")).toBe("foo/bar.baz/lorem.js")
  expect(Path.file("foo/bar.baz/lorem.ipsum")).toBe("foo/bar.baz/lorem.js")
  expect(Path.file("foo/bar/baz.lorem")).toBe("foo/bar/baz.js")
  expect(Path.file("foo/bar.baz.lorem")).toBe("foo/bar.js")
  expect(Path.file("foo/bar.baz")).toBe("foo/bar.js")
  expect(Path.file("foo/bar")).toBe("foo/bar.js")
  expect(Path.file("foo")).toBe("foo.js")
})

it('parse path from path', () => {
  expect(Path.path("foo/bar.baz/lorem/ipsum.dolor")).toBe("dolor")
  expect(Path.path("foo/bar/baz/lorem.ipsum.dolor")).toBe("ipsum.dolor")
  expect(Path.path("foo/bar.baz/lorem.ipsum/dolor.sit.amet")).toBe("sit.amet")
  expect(Path.path("foo/bar.baz.lorem")).toBe("baz.lorem")
  expect(Path.path("foo/bar.baz")).toBe("baz")
  expect(Path.path("foo/bar")).toBe(null)
  expect(Path.path("foo")).toBe(null)
})

it('has path in object', () => {
  const data = {
    first: {
      second: {
        last: false
      }
    }
  }

  expect(Path.has(data, 'first')).toBeTruthy()
  expect(Path.has(data, 'first.second')).toBeTruthy()
  expect(Path.has(data, 'first.second.last')).toBeTruthy()

  expect(Path.has(data, 'second')).toBeFalsy()
  expect(Path.has(data, 'first.last')).toBeFalsy()
  expect(Path.has(data, 'first.second.next')).toBeFalsy()
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

  expect(Path.get(data, 'first.second.what')).toBe('this')
  expect(Path.get(data, 'first.second.next')).toBeTruthy()
  expect(Path.get(data, 'first.second.last')).toBeFalsy()

  expect(Path.get(data, 'simple')).toEqual({ lorem: false })
})

it('require path', () => {
  expect(Path.require(__dirname + '/fixtures/nested.childs.handler').call()).toBe('found nested')
  expect(Path.require(__dirname + '/fixtures/example.handler').call()).toBe('found example')
  expect(Path.require(__dirname + '/fixtures/flat').call()).toBe('found flat')

  expect(() => typeof Path.require(__dirname + '/fixtures/example.handler.unknown')).toThrow()
  expect(() => typeof Path.require(__dirname + '/fixtures/flat.unknown')).toThrow()
})