var vec = require('./index')
  , gc = require('gc');

describe('geom',function(){

  describe('vec',function(){

    describe('make',function(){
      it('make()',function(){
        vec.make().should.eql([0,0])
        // vec.make().should.be.length(2)
      })
      it('make({x:5,y:5})',function(){
        vec.make({x:5,y:5}).should.eql([5,5])
      })
      it('make([5,5])',function(){
        vec.make([5,5]).should.eql([5,5])
      })
      it('make(5,5)',function(){
        vec.make(5,5).should.eql([5,5])
      })
    })

    describe('alloc',function(){
      // TODO test to make sure that this alloc()
      //      is really not GC-friendly.
      it('alloc()',function(){
        vec.alloc().should.eql([0,0])
      })
    })
    describe('free',function(){
      it('free(v)',function(){
        var v = vec.alloc();
        vec.free(v);
      })
    })
    describe('copy',function(){
      var v = vec.make(1,2)
        , m = vec.make(3,4)

      after(function(){
        vec.free(v)
        vec.free(m)
      })

      it('copy(v)',function(){
        vec.copy(v).should.not.equal(v)
        vec.copy(v).should.eql([1,2])
      })
      it('copy(v,m)',function(){
        vec.copy(v,m).should.not.equal(v)
        vec.copy(v,m).should.equal(m)
        vec.copy(v,m).should.eql([1,2])
      })
      it('copy(v,v)',function(){
        vec.copy(v,v).should.equal(v)
        vec.copy(v,v).should.eql([1,2])
      })
    })
    describe('sub',function(){
      var a = vec.make(1,2)
        , b = vec.make(3,4)
        , m = vec.make(5,6)

      after(function(){
        vec.free(a)
        vec.free(b)
        vec.free(m)
      })

      it('sub(a,b)',function(){
        vec.sub(a,b).should.not.equal(a)
        vec.sub(a,b).should.not.equal(b)
        vec.sub(a,b).should.eql([-2,-2])
      })
      it('sub(a,b,m)',function(){
        vec.sub(a,b,m).should.not.equal(a)
        vec.sub(a,b,m).should.not.equal(b)
        vec.sub(a,b,m).should.equal(m)
        vec.sub(a,b,m).should.eql([-2,-2])
      })
      it('sub(a,a,m)',function(){
        vec.sub(a,a,m).should.equal(m)
        vec.sub(a,a,m).should.not.equal(a)
        vec.sub(a,a,m).should.eql([0,0])
      })
      it('sub(a,a)',function(){
        vec.sub(a,a).should.not.equal(a)
        vec.sub(a,a).should.not.equal(b)
        vec.sub(a,a).should.not.equal(m)
        vec.sub(a,a).should.eql([0,0])
      })
      it('sub(a,b,a)',function(){
        vec.sub(a,b,a).should.equal(a)       // [-2,-2]
        vec.sub(a,b,a).should.not.equal(b)   // [-5,-6]
        vec.sub(a,b,a).should.not.equal(m)   // [-8,-10]
        vec.sub(a,b,a).should.eql([-11,-14])
      })
    })
    describe('add',function(){
      var a = vec.make(1,2)
        , b = vec.make(3,4)
        , m = vec.make(5,6)

      after(function(){
        vec.free(a)
        vec.free(b)
        vec.free(m)
      })

      it('add(a,b)',function(){
        vec.add(a,b).should.not.equal(a)
        vec.add(a,b).should.not.equal(b)
        vec.add(a,b).should.eql([4,6])
      })
      it('add(a,b,m)',function(){
        vec.add(a,b,m).should.not.equal(a)
        vec.add(a,b,m).should.not.equal(b)
        vec.add(a,b,m).should.equal(m)
        vec.add(a,b,m).should.eql([4,6])
      })
      it('add(a,a,m)',function(){
        vec.add(a,a,m).should.equal(m)
        vec.add(a,a,m).should.not.equal(a)
        vec.add(a,a,m).should.eql([2,4])
      })
      it('add(a,a)',function(){
        vec.add(a,a).should.not.equal(a)
        vec.add(a,a).should.not.equal(b)
        vec.add(a,a).should.not.equal(m)
        vec.add(a,a).should.eql([2,4])
      })
      it('add(a,b,a)',function(){
        vec.add(a,b,a).should.equal(a)       // [ 4, 6]
        vec.add(a,b,a).should.not.equal(b)   // [ 7,10]
        vec.add(a,b,a).should.not.equal(m)   // [10,14]
        vec.add(a,b,a).should.eql([13,18])
      })
    })
    describe('mul',function(){
      var a = vec.make(1,2)
        , b = vec.make(3,4)
        , m = vec.make(5,6)

      after(function(){
        vec.free(a)
        vec.free(b)
        vec.free(m)
      })

      it('mul(a,b)',function(){
        vec.mul(a,b).should.not.equal(a)
        vec.mul(a,b).should.not.equal(b)
        vec.mul(a,b).should.eql([3,8])
      })
      it('mul(a,b,m)',function(){
        vec.mul(a,b,m).should.not.equal(a)
        vec.mul(a,b,m).should.not.equal(b)
        vec.mul(a,b,m).should.equal(m)
        vec.mul(a,b,m).should.eql([3,8])
      })
      it('mul(a,a,m)',function(){
        vec.mul(a,a,m).should.equal(m)
        vec.mul(a,a,m).should.not.equal(a)
        vec.mul(a,a,m).should.eql([1,4])
      })
      it('mul(a,a)',function(){
        vec.mul(a,a).should.not.equal(a)
        vec.mul(a,a).should.not.equal(b)
        vec.mul(a,a).should.not.equal(m)
        vec.mul(a,a).should.eql([1,4])
      })
      it('mul(a,b,a)',function(){
        vec.mul(a,b,a).should.equal(a)       // [ 3,  8]
        vec.mul(a,b,a).should.not.equal(b)   // [ 9, 32]
        vec.mul(a,b,a).should.not.equal(m)   // [27,128]
        vec.mul(a,b,a).should.eql([81,512])
      })
    })
    describe('div',function(){
      var a = vec.make(1,2)
        , b = vec.make(3,4)
        , m = vec.make(5,6)

      it('div(a,b)',function(){
        vec.div(a,b).should.not.equal(a)
        vec.div(a,b).should.not.equal(b)
        vec.div(a,b).should.eql([1/3,2/4])
      })
      it('div(a,b,m)',function(){
        vec.div(a,b,m).should.not.equal(a)
        vec.div(a,b,m).should.not.equal(b)
        vec.div(a,b,m).should.equal(m)
        vec.div(a,b,m).should.eql([1/3,2/4])
      })
      it('div(a,a,m)',function(){
        vec.div(a,a,m).should.equal(m)
        vec.div(a,a,m).should.not.equal(a)
        vec.div(a,a,m).should.eql([1,1])
      })
      it('div(a,a)',function(){
        vec.div(a,a).should.not.equal(a)
        vec.div(a,a).should.not.equal(b)
        vec.div(a,a).should.not.equal(m)
        vec.div(a,a).should.eql([1,1])
      })
      it('div(a,b,a)',function(){
        vec.div(a,b,a).should.equal(a)       // [    1/3,     2/4]
        vec.div(a,b,a).should.not.equal(b)   // [  1/3/3,   2/4/4]
        vec.div(a,b,a).should.not.equal(m)   // [1/3/3/3, 2/4/4/4]
        vec.div(a,b,a).should.eql([1/3/3/3/3,2/4/4/4/4])
      })
      after(function(){
        vec.free(a)
        vec.free(b)
        vec.free(m)
      })
    })
    describe('abs',function(){
      var a = vec.make(1,-2)
        , m = vec.make(5,6)
      it('abs(a)',function(){
        vec.abs(a).should.not.equal(a)
        vec.abs(a).should.not.equal(m)
        vec.abs(a).should.eql([1,2])
      })
      it('abs(a,m)',function(){
        vec.abs(a,m).should.not.equal(a)
        vec.abs(a,m).should.equal(m)
        vec.abs(a,m).should.eql([1,2])
      })
      it('abs(a,a)',function(){
        vec.abs(a,a).should.not.equal(m)
        vec.abs(a,a).should.equal(a)
        vec.abs(a,a).should.eql([1,2])
      })
      after(function(){
        vec.free(a)
        vec.free(m)
      })
    })
    describe('min',function(){

    })
    describe('max',function(){

    })
    describe('neg',function(){

    })
    describe('clamp',function(){

    })
    describe('perp',function(){

    })
    describe('cross',function(){

    })
    describe('dot',function(){

    })
    describe('len',function(){

    })
    describe('lenSq',function(){

    })
    describe('dist',function(){

    })
    describe('norm',function(){

    })
    describe('rot',function(){

    })
    describe('lerp',function(){

    })
    describe('transform',function(){

    })

  })

})