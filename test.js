var expect = require('expect.js')
  , vec = require('./index')
  , mat = require('geom-mat')
  , v = vec.make;

mat.verbose = vec.verbose = false;

describe('geom',function(){

  describe('vec',function(){

    describe('make',function(){
      it('make()',function(){
        expect(vec.make()).to.eql([0,0])
        expect(vec.make()).to.have.length(2)
      })
      it('make({x:5,y:5})',function(){
        expect(vec.make({x:5,y:5})).to.eql([5,5])
      })
      it('make([5,5])',function(){
        expect(vec.make([5,5])).to.eql([5,5])
      })
      it('make(5,5)',function(){
        expect(vec.make(5,5)).to.eql([5,5])
      })
      it('v(5,5)',function(){
        expect(v(5,5)).to.eql([5,5])
      })
    })
    var allocated = []
    describe('alloc',function(){
      // TODO test to make sure that this alloc()
      //      is really not GC-friendly.
      it('alloc()',function(){
        var v = vec.alloc()
        expect(v).to.eql([0,0])
      })
      it('alloc() * 10000',function(){
        var a = vec._allocated.length - vec._unallocated.length;
        for(var i=0; i<10000; i++){
          var v = vec.alloc()
          // expect(v).to.eql([0,0])
          allocated.push(v);
        }
        var b = vec._allocated.length - vec._unallocated.length;
        (expect(b-a)).to.equal(allocated.length)

        // for(var i=0; i < vec._unallocated.length; i++)
        //   expect(vec._unallocated).to.have.property(i).eql([0,0]);
      })
    })
    describe('free',function(){
      it('free(allocated)',function(){
        var a = vec._allocated.length - vec._unallocated.length;
        var l = allocated.length;
        while(allocated.length)
          vec.free(allocated.pop())
        var b = vec._allocated.length - vec._unallocated.length;
        (expect(b-a)).to.equal(-l)

        // for(var i=0; i < vec._unallocated.length; i++)
        //   expect(vec._unallocated).to.have.property(i).eql([0,0]);
      })
      it('free(v)',function(){
        var v = vec.alloc();
        expect(v).to.eql([0,0])
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
        expect(vec.copy(v)).to.not.equal(v)
        expect(vec.copy(v)).to.eql([1,2])
      })
      it('copy(v,m)',function(){
        expect(vec.copy(v,m)).to.not.equal(v)
        expect(vec.copy(v,m)).to.equal(m)
        expect(vec.copy(v,m)).to.eql([1,2])
      })
      it('copy(v,v)',function(){
        expect(vec.copy(v,v)).to.equal(v)
        expect(vec.copy(v,v)).to.eql([1,2])
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
        expect(vec.sub(a,b)).to.not.equal(a)
        expect(vec.sub(a,b)).to.not.equal(b)
        expect(vec.sub(a,b)).to.eql([-2,-2])
      })
      it('sub(a,b,m)',function(){
        expect(vec.sub(a,b,m)).to.not.equal(a)
        expect(vec.sub(a,b,m)).to.not.equal(b)
        expect(vec.sub(a,b,m)).to.equal(m)
        expect(vec.sub(a,b,m)).to.eql([-2,-2])
      })
      it('sub(a,a,m)',function(){
        expect(vec.sub(a,a,m)).to.equal(m)
        expect(vec.sub(a,a,m)).to.not.equal(a)
        expect(vec.sub(a,a,m)).to.eql([0,0])
      })
      it('sub(a,a)',function(){
        expect(vec.sub(a,a)).to.not.equal(a)
        expect(vec.sub(a,a)).to.not.equal(b)
        expect(vec.sub(a,a)).to.not.equal(m)
        expect(vec.sub(a,a)).to.eql([0,0])
      })
      it('sub(a,b,a)',function(){
        expect(vec.sub(a,b,a)).to.equal(a)       // [-2,-2]
        expect(vec.sub(a,b,a)).to.not.equal(b)   // [-5,-6]
        expect(vec.sub(a,b,a)).to.not.equal(m)   // [-8,-10]
        expect(vec.sub(a,b,a)).to.eql([-11,-14])
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
        expect(vec.add(a,b)).to.not.equal(a)
        expect(vec.add(a,b)).to.not.equal(b)
        expect(vec.add(a,b)).to.eql([4,6])
      })
      it('add(a,b,m)',function(){
        expect(vec.add(a,b,m)).to.not.equal(a)
        expect(vec.add(a,b,m)).to.not.equal(b)
        expect(vec.add(a,b,m)).to.equal(m)
        expect(vec.add(a,b,m)).to.eql([4,6])
      })
      it('add(a,a,m)',function(){
        expect(vec.add(a,a,m)).to.equal(m)
        expect(vec.add(a,a,m)).to.not.equal(a)
        expect(vec.add(a,a,m)).to.eql([2,4])
      })
      it('add(a,a)',function(){
        expect(vec.add(a,a)).to.not.equal(a)
        expect(vec.add(a,a)).to.not.equal(b)
        expect(vec.add(a,a)).to.not.equal(m)
        expect(vec.add(a,a)).to.eql([2,4])
      })
      it('add(a,b,a)',function(){
        expect(vec.add(a,b,a)).to.equal(a)       // [ 4, 6]
        expect(vec.add(a,b,a)).to.not.equal(b)   // [ 7,10]
        expect(vec.add(a,b,a)).to.not.equal(m)   // [10,14]
        expect(vec.add(a,b,a)).to.eql([13,18])
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
        expect(vec.mul(a,b)).to.not.equal(a)
        expect(vec.mul(a,b)).to.not.equal(b)
        expect(vec.mul(a,b)).to.eql([3,8])
      })
      it('mul(a,b,m)',function(){
        expect(vec.mul(a,b,m)).to.not.equal(a)
        expect(vec.mul(a,b,m)).to.not.equal(b)
        expect(vec.mul(a,b,m)).to.equal(m)
        expect(vec.mul(a,b,m)).to.eql([3,8])
      })
      it('mul(a,a,m)',function(){
        expect(vec.mul(a,a,m)).to.equal(m)
        expect(vec.mul(a,a,m)).to.not.equal(a)
        expect(vec.mul(a,a,m)).to.eql([1,4])
      })
      it('mul(a,a)',function(){
        expect(vec.mul(a,a)).to.not.equal(a)
        expect(vec.mul(a,a)).to.not.equal(b)
        expect(vec.mul(a,a)).to.not.equal(m)
        expect(vec.mul(a,a)).to.eql([1,4])
      })
      it('mul(a,b,a)',function(){
        expect(vec.mul(a,b,a)).to.equal(a)       // [ 3,  8]
        expect(vec.mul(a,b,a)).to.not.equal(b)   // [ 9, 32]
        expect(vec.mul(a,b,a)).to.not.equal(m)   // [27,128]
        expect(vec.mul(a,b,a)).to.eql([81,512])
      })
    })
    describe('div',function(){
      var a = vec.make(1,2)
        , b = vec.make(3,4)
        , m = vec.make(5,6)

      it('div(a,b)',function(){
        expect(vec.div(a,b)).to.not.equal(a)
        expect(vec.div(a,b)).to.not.equal(b)
        expect(vec.div(a,b)).to.eql([1/3,2/4])
      })
      it('div(a,b,m)',function(){
        expect(vec.div(a,b,m)).to.not.equal(a)
        expect(vec.div(a,b,m)).to.not.equal(b)
        expect(vec.div(a,b,m)).to.equal(m)
        expect(vec.div(a,b,m)).to.eql([1/3,2/4])
      })
      it('div(a,a,m)',function(){
        expect(vec.div(a,a,m)).to.equal(m)
        expect(vec.div(a,a,m)).to.not.equal(a)
        expect(vec.div(a,a,m)).to.eql([1,1])
      })
      it('div(a,a)',function(){
        expect(vec.div(a,a)).to.not.equal(a)
        expect(vec.div(a,a)).to.not.equal(b)
        expect(vec.div(a,a)).to.not.equal(m)
        expect(vec.div(a,a)).to.eql([1,1])
      })
      it('div(a,b,a)',function(){
        expect(vec.div(a,b,a)).to.equal(a)       // [    1/3,     2/4]
        expect(vec.div(a,b,a)).to.not.equal(b)   // [  1/3/3,   2/4/4]
        expect(vec.div(a,b,a)).to.not.equal(m)   // [1/3/3/3, 2/4/4/4]
        expect(vec.div(a,b,a)).to.eql([1/3/3/3/3,2/4/4/4/4])
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
        expect(vec.abs(a)).to.not.equal(a)
        expect(vec.abs(a)).to.not.equal(m)
        expect(vec.abs(a)).to.eql([1,2])
      })
      it('abs(a,m)',function(){
        expect(vec.abs(a,m)).to.not.equal(a)
        expect(vec.abs(a,m)).to.equal(m)
        expect(vec.abs(a,m)).to.eql([1,2])
      })
      it('abs(a,a)',function(){
        expect(vec.abs(a,a)).to.not.equal(m)
        expect(vec.abs(a,a)).to.equal(a)
        expect(vec.abs(a,a)).to.eql([1,2])
      })
      after(function(){
        vec.free(a)
        vec.free(m)
      })
    })
    describe('min',function(){
      var a = vec.make(1,2)
        , b = vec.make(-3,4)
        , m = vec.make(5,6)

      it('min(a,b)',function(){
        expect(vec.min(a,b)).to.not.equal(a)
        expect(vec.min(a,b)).to.not.equal(b)
        expect(vec.min(a,b)).to.eql([-3,2])
      })
      it('min(a,b,m)',function(){
        expect(vec.min(a,b,m)).to.not.equal(a)
        expect(vec.min(a,b,m)).to.not.equal(b)
        expect(vec.min(a,b,m)).to.equal(m)
        expect(vec.min(a,b,m)).to.eql([-3,2])
      })
      it('min(a,a,m)',function(){
        expect(vec.min(a,a,m)).to.equal(m)
        expect(vec.min(a,a,m)).to.not.equal(a)
        expect(vec.min(a,a,m)).to.eql([1,2])
      })
      it('min(a,a)',function(){
        expect(vec.min(a,a)).to.not.equal(a)
        expect(vec.min(a,a)).to.not.equal(b)
        expect(vec.min(a,a)).to.not.equal(m)
        expect(vec.min(a,a)).to.eql([1,2])
      })
      it('min(a,b,a)',function(){
        expect(vec.min(a,b,a)).to.equal(a)       // [-3,2]
        expect(vec.min(a,b,a)).to.not.equal(b)   // [-3,2]
        expect(vec.min(a,b,a)).to.not.equal(m)   // [-3,2]
        expect(vec.min(a,b,a)).to.eql([-3,2])
      })
      after(function(){
        vec.free(a)
        vec.free(b)
        vec.free(m)
      })
    })
    describe('max',function(){
      var a = vec.make(1,2)
        , b = vec.make(-3,4)
        , m = vec.make(5,6)

      it('max(a,b)',function(){
        expect(vec.max(a,b)).to.not.equal(a)
        expect(vec.max(a,b)).to.not.equal(b)
        expect(vec.max(a,b)).to.eql([1,4])
      })
      it('max(a,b,m)',function(){
        expect(vec.max(a,b,m)).to.not.equal(a)
        expect(vec.max(a,b,m)).to.not.equal(b)
        expect(vec.max(a,b,m)).to.equal(m)
        expect(vec.max(a,b,m)).to.eql([1,4])
      })
      it('max(a,a,m)',function(){
        expect(vec.max(a,a,m)).to.equal(m)
        expect(vec.max(a,a,m)).to.not.equal(a)
        expect(vec.max(a,a,m)).to.eql([1,2])
      })
      it('max(a,a)',function(){
        expect(vec.max(a,a)).to.not.equal(a)
        expect(vec.max(a,a)).to.not.equal(b)
        expect(vec.max(a,a)).to.not.equal(m)
        expect(vec.max(a,a)).to.eql([1,2])
      })
      it('max(a,b,a)',function(){
        expect(vec.max(a,b,a)).to.equal(a)       // [1,4]
        expect(vec.max(a,b,a)).to.not.equal(b)   // [1,4]
        expect(vec.max(a,b,a)).to.not.equal(m)   // [1,4]
        expect(vec.max(a,b,a)).to.eql([1,4])
      })
      after(function(){
        vec.free(a)
        vec.free(b)
        vec.free(m)
      })
    })
    describe('neg',function(){
      var a = vec.make(1,-2)
        , m = vec.make(5,6)
      it('neg(a)',function(){
        expect(vec.neg(a)).to.not.equal(a)
        expect(vec.neg(a)).to.not.equal(m)
        expect(vec.neg(a)).to.eql([-1,2])
      })
      it('neg(a,m)',function(){
        expect(vec.neg(a,m)).to.not.equal(a)
        expect(vec.neg(a,m)).to.equal(m)
        expect(vec.neg(a,m)).to.eql([-1,2])
      })
      it('neg(a,a)',function(){
        expect(vec.neg(a,a)).to.not.equal(m) // [-1, 2]
        expect(vec.neg(a,a)).to.equal(a)     // [1, -2]
        expect(vec.neg(a,a)).to.eql([-1,2])
      })
      after(function(){
        vec.free(a)
        vec.free(m)
      })
    })
    describe('clamp',function(){
      var a = vec.make(10,-20)
        , b = vec.make(1,-2)
        , min = vec.make(-5,-5)
        , max = vec.make(5,5)
        , m = vec.make(5,6)
      it('clamp(min,a,max)',function(){
        expect(vec.clamp(min,a,max)).to.not.equal(a)
        expect(vec.clamp(min,a,max)).to.not.equal(b)
        expect(vec.clamp(min,a,max)).to.not.equal(m)
        expect(vec.clamp(min,a,max)).to.not.equal(min)
        expect(vec.clamp(min,a,max)).to.not.equal(max)
        expect(vec.clamp(min,a,max)).to.eql([5,-5])
      })
      it('clamp(min,b,max)',function(){
        expect(vec.clamp(min,b,max)).to.not.equal(a)
        expect(vec.clamp(min,b,max)).to.not.equal(b)
        expect(vec.clamp(min,b,max)).to.not.equal(m)
        expect(vec.clamp(min,b,max)).to.not.equal(min)
        expect(vec.clamp(min,b,max)).to.not.equal(max)
        expect(vec.clamp(min,b,max)).to.eql([1,-2])
      })
      it('clamp(min,a,max,m)',function(){
        expect(vec.clamp(min,a,max,m)).to.not.equal(a)
        expect(vec.clamp(min,a,max,m)).to.not.equal(b)
        expect(vec.clamp(min,a,max,m)).to.not.equal(min)
        expect(vec.clamp(min,a,max,m)).to.not.equal(max)
        expect(vec.clamp(min,a,max,m)).to.equal(m)
        expect(vec.clamp(min,a,max,m)).to.eql([5,-5])
      })
      it('clamp(min,a,max,a)',function(){
        expect(vec.clamp(min,a,max,a)).to.equal(a)
        expect(vec.clamp(min,a,max,a)).to.not.equal(b)
        expect(vec.clamp(min,a,max,a)).to.not.equal(m)
        expect(vec.clamp(min,a,max,a)).to.not.equal(min)
        expect(vec.clamp(min,a,max,a)).to.not.equal(max)
        expect(vec.clamp(min,a,max,a)).to.eql([5,-5])
      })
      it('clamp(max,a,min)') // LOL WUT?
      after(function(){
        vec.free(a)
        vec.free(b)
        vec.free(m)
      })
    })
    describe('perp',function(){
      var a = vec.make(1,-2)
        , m = vec.make(5,6)
      it('perp(a)',function(){
        expect(vec.perp(a)).to.not.equal(a)
        expect(vec.perp(a)).to.not.equal(m)
        expect(vec.perp(a)).to.eql([2,1])
      })
      it('perp(a,m)',function(){
        expect(vec.perp(a,m)).to.not.equal(a)
        expect(vec.perp(a,m)).to.equal(m)
        expect(vec.perp(a,m)).to.eql([2,1])
      })
      it('perp(a,a)',function(){
        expect(vec.perp(a,a)).to.not.equal(m) // [ 2,1]
        expect(vec.perp(a,a)).to.equal(a)     // [-1,2]
        expect(vec.perp(a,a)).to.eql([-2,-1])
      })
      after(function(){
        vec.free(a)
        vec.free(m)
      })
    })
    describe('cross',function(){
      var a = vec.make(1,0)
        , b = vec.make(3,-5)
      it('cross(a,b)',function(){
        expect(vec.cross(a,b)).to.equal(-5)
      })
      it('cross(a,a)',function(){
        expect(vec.cross(a,a)).to.equal(0)
      })
      after(function(){
        vec.free(a)
        vec.free(b)
      })
    })
    describe('dot',function(){
      var a = vec.make(1,0)
        , b = vec.make(3,-5)
      it('dot(a,b)',function(){
        expect(vec.dot(a,b)).to.equal(3)
      })
      it('dot(a,a)',function(){
        expect(vec.dot(a,a)).to.equal(1)
      })
      it('dot(perp(a),b) == cross(a,b)',function(){
        expect(vec.dot(vec.perp(a),b)).to.eql(vec.cross(a,b))
      })
      after(function(){
        vec.free(a)
        vec.free(b)
      })
    })
    describe('len',function(){
      var a = vec.make(1,0)
        , b = vec.make(3,-5)
        , c = vec.make(0,0)
      it('len(a)',function(){
        expect(vec.len(a)).to.equal(1)
      })
      it('len(b)',function(){
        expect(vec.len(b)).to.equal(5.830951894845301)
      })
      it('len(c)',function(){
        expect(vec.len(c)).to.equal(0)
      })
      after(function(){
        vec.free(a)
        vec.free(b)
        vec.free(c)
      })
    })
    describe('lenSq',function(){
      var a = vec.make(1,0)
        , b = vec.make(3,-5)
        , c = vec.make(0,0)
      it('lenSq(a)',function(){
        expect(vec.lenSq(a)).to.equal(1)
      })
      it('lenSq(b)',function(){
        expect(vec.lenSq(b)).to.equal(34)
      })
      it('lenSq(c)',function(){
        expect(vec.lenSq(c)).to.equal(0)
      })
      after(function(){
        vec.free(a)
        vec.free(b)
        vec.free(c)
      })
    })
    describe('dist',function(){
      var a = vec.make(1,0)
        , b = vec.make(3,-5)
      it('dist(a,b)',function(){
        expect(vec.dist(a,b)).to.equal(5.385164807134504)
      })
      it('dist(b,b)',function(){
        expect(vec.dist(b,b)).to.equal(0)
      })
      after(function(){
        vec.free(a)
        vec.free(b)
      })
    })
    describe('distSq',function(){
      var a = vec.make(1,0)
        , b = vec.make(3,-5)
      it('distSq(a,b)',function(){
        expect(vec.distSq(a,b)).to.equal(29)
      })
      it('distSq(b,b)',function(){
        expect(vec.distSq(b,b)).to.equal(0)
      })
      after(function(){
        vec.free(a)
        vec.free(b)
      })
    })
    describe('norm',function(){
      var a = vec.make(1,0)
        , b = vec.make(3,-5)
        , m = vec.make(5,6)
      it('norm(a)',function(){
        expect(vec.norm(a)).to.not.equal(a)
        expect(vec.norm(a)).to.not.equal(m)
        expect(vec.norm(a)).to.eql([1,0])
      })
      it('norm(b)',function(){
        var l = vec.len(b);
        expect(vec.norm(b)).to.not.equal(a)
        expect(vec.norm(b)).to.not.equal(b)
        expect(vec.norm(b)).to.not.equal(m)
        expect(vec.norm(b)).to.eql([3/l,-5/l])
      })
      it('norm(a,m)',function(){
        expect(vec.norm(a,m)).to.not.equal(a)
        expect(vec.norm(a,m)).to.equal(m)
        expect(vec.norm(a,m)).to.eql([1,0])
      })
      it('norm(a,a)',function(){
        expect(vec.norm(a,a)).to.not.equal(m) // [1,0]
        expect(vec.norm(a,a)).to.equal(a)     // [1,0]
        expect(vec.norm(a,a)).to.eql([1,0])
      })
      after(function(){
        vec.free(a)
        vec.free(m)
      })
    })
    describe('lerp',function(){
      var a = vec.make(1,0)
        , b = vec.make(3,-5)
      it('lerp(a,b,0)',function(){
        expect(vec.lerp(a,b,0)).to.not.equal(a)
        expect(vec.lerp(a,b,0)).to.not.equal(b)
        expect(vec.lerp(a,b,0)).to.eql(a)
        expect(vec.lerp(a,b,0)).to.not.eql(b)
      })
      it('lerp(a,b,1)',function(){
        expect(vec.lerp(a,b,1)).to.eql(b)
        expect(vec.lerp(a,b,1)).to.not.eql(a)
      })
      it('lerp(a,b,.5)',function(){
        expect(vec.lerp(a,b,.5)).to.not.eql(a)
        expect(vec.lerp(a,b,.5)).to.not.eql(b)
        expect(vec.lerp(a,b,.5)).to.eql([2,-2.5])
      })
      it('lerp(a,b,-1)',function(){
        expect(vec.lerp(a,b,-1)).to.not.eql(a)
        expect(vec.lerp(a,b,-1)).to.not.eql(b)
        expect(vec.lerp(a,b,-1)).to.eql([-1,5])
      })
      it('lerp(a,b,2)',function(){
        expect(vec.lerp(a,b,2)).to.not.eql(a)
        expect(vec.lerp(a,b,2)).to.not.eql(b)
        expect(vec.lerp(a,b,2)).to.eql([5,-10])
      })
      after(function(){
        vec.free(a)
        vec.free(b)
      })
    })

    describe('rot',function(){
      var a = vec.make(5,5)
        , m = vec.make(10,10);
      it('rot(a,Math.PI*2)',function(){
        expect(vec.rot(a,Math.PI*2)).to.not.equal(a)
        expect(vec.rot(a,Math.PI*2)).to.eql(a) // 360!
      })
      it('rot(a,Math.PI)',function(){
        expect(vec.rot(a,Math.PI)).to.not.equal(a)
        expect(vec.rot(a,Math.PI)).to.eql([-5,-5])
      })
      it('rot(a,-Math.PI,m)',function(){
        expect(vec.rot(a,-Math.PI,m)).to.not.equal(a)
        expect(vec.rot(a,-Math.PI,m)).to.equal(m)
        expect(vec.rot(a,-Math.PI,m)).to.eql([-5,-5])
      })
      it('rot(a,Math.PI/2,a)',function(){
        expect(vec.rot(a,Math.PI/2,a)).to.equal(a)
        expect(vec.rot(a,Math.PI/2,a)).to.not.equal(m)
        expect(vec.rot(a,Math.PI/2,a)).to.eql([-5,-5])
      })

      it('rot(a,Math.PI) (around origin)',function(){
        var a = vec.make(5,5)
        var o = vec.make(10,10);
        var t = vec.sub(a,o)
        vec.rot(t,Math.PI,t)
        expect(vec.add(o,t)).to.not.equal(a)
        expect(vec.add(o,t)).to.not.equal(t)
        expect(vec.add(o,t)).to.not.equal(o)
        expect(vec.add(o,t)).to.not.eql(o)
        expect(vec.add(o,t)).to.not.eql(t)
        expect(vec.add(o,t)).to.not.eql(a)
        expect(vec.add(o,t)).to.eql([15,15])
      })

      after(function(){
        vec.free(a)
        vec.free(m)
      })
    })

    describe('transform',function(){
      var a = vec.make(15,0)

      it('transform(a,mat.rotate(Math.PI))',function(){
        expect(vec.transform(a,mat.rotate(Math.PI))).to.eql(vec.rot(a,Math.PI))
      })
      it('transform(a,mat.scale(5,0))',function(){
        expect(vec.transform(a,mat.scale(5,0))).to.eql(vec.mul(a,[5,0]))
      })
      it('transform(a,mat.translate(0,5))',function(){
        expect(vec.transform(a,mat.translate(-5,10))).to.eql(vec.add(a,[-5,10]))
      })

      after(function(){
        vec.free(a)
      })
    })

    describe('reflect',function(){
      it('reflect(a,n)')
      it('reflect(a,n,m)')
    })

  })

})