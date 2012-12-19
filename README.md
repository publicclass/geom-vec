# geom-vec

[![Build Status](https://travis-ci.org/publicclass/geom-vec.png)](https://travis-ci.org/publicclass/geom-vec)

A collection of terse vector utilities. A part of [geom](https://github.com/publicclass/geom).

A _vector_ is represented by an array with two elements.


## Features

  * __Memory managed__ each utility has a pool of instances accessable using `_X_.make()` and `_X_.free()`. If you don't need pooled instances, simply pass in your own object instead.

  * __State less__ no state is kept within the utilities, it's up to you.


## Example

    var vec = require('geom-vec');

    var a = vec.make(10,10);
    vec.smul(a,10) // => [100,100]
    vec.free(a)


## API

See [mocha generated API](https://github.com/publicclass/geom-vec/blob/master/api.md) for the comprehensive API.

### vec.verbose

By default a `console.warn()` log is called whenever more vectors is allocated. Which is very useful to track any memory leaks. Set this property to `false` to silence it.

### vec.make([x,y])

### vec.free(v)

### vec.copy(a[,b])

Copies vector `a` into vector `b` or returns a new vector.

### vec.sub(a,b[,c])

Subtracts vector `b` from vector `a` into vector `c` or returns a new vector.

### vec.add(a,b[,c])

Adds vector `b` to vector `a` into vector `c` or returns a new vector.

### vec.mul(a,b[,c])

Multiplies vector `a` with vector `b` into vector `c` or returns a new vector.

### vec.div(a,b[,c])

Divides vector `a` with vector `b` into vector `c` or returns a new vector.

### vec.ssub(a,s[,c])

Subtracts vector `a` with scalar `s` into vector `c` or returns a new vector.

### vec.sadd(a,s[,c])

Adds vector `a` with scalar `s` into vector `c` or returns a new vector.

### vec.smul(a,s[,c])

Multiplies vector `a` with scalar `s` into vector `c` or returns a new vector.

### vec.sdiv(a,s[,c])

Divides vector `a` with scalar `s` into vector `c` or returns a new vector.

### vec.abs(a[,b])

### vec.min(a,b[,c])

### vec.max(a,b[,c])

### vec.smin(a,s[,c])

### vec.smax(a,s[,c])

### vec.neg(a[,b])

### vec.sclamp(min,a,max[,b])

### vec.clamp(min,a,max[,b])

### vec.perp(a[,b])

### vec.cross(a,b)

### vec.dot(a,b)

### vec.len(a)

### vec.lenSq(a)

### vec.dist(a,b)

### vec.distSq(a,b)

### vec.norm(a[,b])

### vec.lerp(a,b,t)

### vec.rot(a,theta[,b])

### vec.transform(a,m[,b])

### vec.reflect(a,n[,b])

## License

  MIT