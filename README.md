# geom-vec

[![Build Status](https://travis-ci.org/publicclass/geom-vec.png)](https://travis-ci.org/publicclass/geom-vec)

A collection of terse vector utilities. A part of [geom](https://github.com/publicclass/geom).


## Features

  * __Memory managed__ each utility has a pool of instances accessable using `_X_.make()` and `_X_.free()`. If you don't need pooled instances, simply pass in your own object instead.

  * __State less__ no state is kept within the utilities, it's up to you.


## API

See [mocha generated API](api.md)

## Example

    var geom = require('geom')
      , vec = geom.vec;

    var v = vec.make(10,10);
    vec.smul(v,10) // => [100,100]


## License

  MIT