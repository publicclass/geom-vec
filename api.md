# TOC
   - [geom](#geom)
     - [vec](#geom-vec)
       - [make](#geom-vec-make)
       - [alloc](#geom-vec-alloc)
       - [free](#geom-vec-free)
       - [copy](#geom-vec-copy)
       - [sub](#geom-vec-sub)
       - [add](#geom-vec-add)
       - [mul](#geom-vec-mul)
       - [div](#geom-vec-div)
       - [abs](#geom-vec-abs)
       - [min](#geom-vec-min)
       - [max](#geom-vec-max)
       - [neg](#geom-vec-neg)
       - [clamp](#geom-vec-clamp)
       - [perp](#geom-vec-perp)
       - [cross](#geom-vec-cross)
       - [dot](#geom-vec-dot)
       - [len](#geom-vec-len)
       - [lenSq](#geom-vec-lensq)
       - [dist](#geom-vec-dist)
       - [distSq](#geom-vec-distsq)
       - [norm](#geom-vec-norm)
       - [lerp](#geom-vec-lerp)
       - [rot](#geom-vec-rot)
       - [transform](#geom-vec-transform)
       - [reflect](#geom-vec-reflect)
<a name=""></a>
 
<a name="geom"></a>
# geom
<a name="geom-vec"></a>
## vec
<a name="geom-vec-make"></a>
### make
make().

```js
vec.make().should.eql([0,0])
vec.make().should.be.length(2)
```

make({x:5,y:5}).

```js
vec.make({x:5,y:5}).should.eql([5,5])
```

make([5,5]).

```js
vec.make([5,5]).should.eql([5,5])
```

make(5,5).

```js
vec.make(5,5).should.eql([5,5])
```

v(5,5).

```js
v(5,5).should.eql([5,5])
```

<a name="geom-vec-alloc"></a>
### alloc
alloc().

```js
var v = vec.alloc()
v.should.eql([0,0])
```

alloc() * 10000.

```js
var a = vec._allocated.length - vec._unallocated.length;
for(var i=0; i<10000; i++){
  var v = vec.alloc()
  v.should.eql([0,0])
  allocated.push(v);
}
var b = vec._allocated.length - vec._unallocated.length;
(b-a).should.equal(allocated.length)

for(var i=0; i < vec._unallocated.length; i++)
  vec._unallocated.should.have.property(i).eql([0,0]);
```

<a name="geom-vec-free"></a>
### free
free(allocated).

```js
var a = vec._allocated.length - vec._unallocated.length;
var l = allocated.length;
while(allocated.length)
  vec.free(allocated.pop())
var b = vec._allocated.length - vec._unallocated.length;
(b-a).should.equal(-l)

for(var i=0; i < vec._unallocated.length; i++)
  vec._unallocated.should.have.property(i).eql([0,0]);
```

free(v).

```js
var v = vec.alloc();
v.should.eql([0,0])
vec.free(v);
```

<a name="geom-vec-copy"></a>
### copy
copy(v).

```js
vec.copy(v).should.not.equal(v)
vec.copy(v).should.eql([1,2])
```

copy(v,m).

```js
vec.copy(v,m).should.not.equal(v)
vec.copy(v,m).should.equal(m)
vec.copy(v,m).should.eql([1,2])
```

copy(v,v).

```js
vec.copy(v,v).should.equal(v)
vec.copy(v,v).should.eql([1,2])
```

<a name="geom-vec-sub"></a>
### sub
sub(a,b).

```js
vec.sub(a,b).should.not.equal(a)
vec.sub(a,b).should.not.equal(b)
vec.sub(a,b).should.eql([-2,-2])
```

sub(a,b,m).

```js
vec.sub(a,b,m).should.not.equal(a)
vec.sub(a,b,m).should.not.equal(b)
vec.sub(a,b,m).should.equal(m)
vec.sub(a,b,m).should.eql([-2,-2])
```

sub(a,a,m).

```js
vec.sub(a,a,m).should.equal(m)
vec.sub(a,a,m).should.not.equal(a)
vec.sub(a,a,m).should.eql([0,0])
```

sub(a,a).

```js
vec.sub(a,a).should.not.equal(a)
vec.sub(a,a).should.not.equal(b)
vec.sub(a,a).should.not.equal(m)
vec.sub(a,a).should.eql([0,0])
```

sub(a,b,a).

```js
vec.sub(a,b,a).should.equal(a)       // [-2,-2]
vec.sub(a,b,a).should.not.equal(b)   // [-5,-6]
vec.sub(a,b,a).should.not.equal(m)   // [-8,-10]
vec.sub(a,b,a).should.eql([-11,-14])
```

<a name="geom-vec-add"></a>
### add
add(a,b).

```js
vec.add(a,b).should.not.equal(a)
vec.add(a,b).should.not.equal(b)
vec.add(a,b).should.eql([4,6])
```

add(a,b,m).

```js
vec.add(a,b,m).should.not.equal(a)
vec.add(a,b,m).should.not.equal(b)
vec.add(a,b,m).should.equal(m)
vec.add(a,b,m).should.eql([4,6])
```

add(a,a,m).

```js
vec.add(a,a,m).should.equal(m)
vec.add(a,a,m).should.not.equal(a)
vec.add(a,a,m).should.eql([2,4])
```

add(a,a).

```js
vec.add(a,a).should.not.equal(a)
vec.add(a,a).should.not.equal(b)
vec.add(a,a).should.not.equal(m)
vec.add(a,a).should.eql([2,4])
```

add(a,b,a).

```js
vec.add(a,b,a).should.equal(a)       // [ 4, 6]
vec.add(a,b,a).should.not.equal(b)   // [ 7,10]
vec.add(a,b,a).should.not.equal(m)   // [10,14]
vec.add(a,b,a).should.eql([13,18])
```

<a name="geom-vec-mul"></a>
### mul
mul(a,b).

```js
vec.mul(a,b).should.not.equal(a)
vec.mul(a,b).should.not.equal(b)
vec.mul(a,b).should.eql([3,8])
```

mul(a,b,m).

```js
vec.mul(a,b,m).should.not.equal(a)
vec.mul(a,b,m).should.not.equal(b)
vec.mul(a,b,m).should.equal(m)
vec.mul(a,b,m).should.eql([3,8])
```

mul(a,a,m).

```js
vec.mul(a,a,m).should.equal(m)
vec.mul(a,a,m).should.not.equal(a)
vec.mul(a,a,m).should.eql([1,4])
```

mul(a,a).

```js
vec.mul(a,a).should.not.equal(a)
vec.mul(a,a).should.not.equal(b)
vec.mul(a,a).should.not.equal(m)
vec.mul(a,a).should.eql([1,4])
```

mul(a,b,a).

```js
vec.mul(a,b,a).should.equal(a)       // [ 3,  8]
vec.mul(a,b,a).should.not.equal(b)   // [ 9, 32]
vec.mul(a,b,a).should.not.equal(m)   // [27,128]
vec.mul(a,b,a).should.eql([81,512])
```

<a name="geom-vec-div"></a>
### div
div(a,b).

```js
vec.div(a,b).should.not.equal(a)
vec.div(a,b).should.not.equal(b)
vec.div(a,b).should.eql([1/3,2/4])
```

div(a,b,m).

```js
vec.div(a,b,m).should.not.equal(a)
vec.div(a,b,m).should.not.equal(b)
vec.div(a,b,m).should.equal(m)
vec.div(a,b,m).should.eql([1/3,2/4])
```

div(a,a,m).

```js
vec.div(a,a,m).should.equal(m)
vec.div(a,a,m).should.not.equal(a)
vec.div(a,a,m).should.eql([1,1])
```

div(a,a).

```js
vec.div(a,a).should.not.equal(a)
vec.div(a,a).should.not.equal(b)
vec.div(a,a).should.not.equal(m)
vec.div(a,a).should.eql([1,1])
```

div(a,b,a).

```js
vec.div(a,b,a).should.equal(a)       // [    1/3,     2/4]
vec.div(a,b,a).should.not.equal(b)   // [  1/3/3,   2/4/4]
vec.div(a,b,a).should.not.equal(m)   // [1/3/3/3, 2/4/4/4]
vec.div(a,b,a).should.eql([1/3/3/3/3,2/4/4/4/4])
```

<a name="geom-vec-abs"></a>
### abs
abs(a).

```js
vec.abs(a).should.not.equal(a)
vec.abs(a).should.not.equal(m)
vec.abs(a).should.eql([1,2])
```

abs(a,m).

```js
vec.abs(a,m).should.not.equal(a)
vec.abs(a,m).should.equal(m)
vec.abs(a,m).should.eql([1,2])
```

abs(a,a).

```js
vec.abs(a,a).should.not.equal(m)
vec.abs(a,a).should.equal(a)
vec.abs(a,a).should.eql([1,2])
```

<a name="geom-vec-min"></a>
### min
min(a,b).

```js
vec.min(a,b).should.not.equal(a)
vec.min(a,b).should.not.equal(b)
vec.min(a,b).should.eql([-3,2])
```

min(a,b,m).

```js
vec.min(a,b,m).should.not.equal(a)
vec.min(a,b,m).should.not.equal(b)
vec.min(a,b,m).should.equal(m)
vec.min(a,b,m).should.eql([-3,2])
```

min(a,a,m).

```js
vec.min(a,a,m).should.equal(m)
vec.min(a,a,m).should.not.equal(a)
vec.min(a,a,m).should.eql([1,2])
```

min(a,a).

```js
vec.min(a,a).should.not.equal(a)
vec.min(a,a).should.not.equal(b)
vec.min(a,a).should.not.equal(m)
vec.min(a,a).should.eql([1,2])
```

min(a,b,a).

```js
vec.min(a,b,a).should.equal(a)       // [-3,2]
vec.min(a,b,a).should.not.equal(b)   // [-3,2]
vec.min(a,b,a).should.not.equal(m)   // [-3,2]
vec.min(a,b,a).should.eql([-3,2])
```

<a name="geom-vec-max"></a>
### max
max(a,b).

```js
vec.max(a,b).should.not.equal(a)
vec.max(a,b).should.not.equal(b)
vec.max(a,b).should.eql([1,4])
```

max(a,b,m).

```js
vec.max(a,b,m).should.not.equal(a)
vec.max(a,b,m).should.not.equal(b)
vec.max(a,b,m).should.equal(m)
vec.max(a,b,m).should.eql([1,4])
```

max(a,a,m).

```js
vec.max(a,a,m).should.equal(m)
vec.max(a,a,m).should.not.equal(a)
vec.max(a,a,m).should.eql([1,2])
```

max(a,a).

```js
vec.max(a,a).should.not.equal(a)
vec.max(a,a).should.not.equal(b)
vec.max(a,a).should.not.equal(m)
vec.max(a,a).should.eql([1,2])
```

max(a,b,a).

```js
vec.max(a,b,a).should.equal(a)       // [1,4]
vec.max(a,b,a).should.not.equal(b)   // [1,4]
vec.max(a,b,a).should.not.equal(m)   // [1,4]
vec.max(a,b,a).should.eql([1,4])
```

<a name="geom-vec-neg"></a>
### neg
neg(a).

```js
vec.neg(a).should.not.equal(a)
vec.neg(a).should.not.equal(m)
vec.neg(a).should.eql([-1,2])
```

neg(a,m).

```js
vec.neg(a,m).should.not.equal(a)
vec.neg(a,m).should.equal(m)
vec.neg(a,m).should.eql([-1,2])
```

neg(a,a).

```js
vec.neg(a,a).should.not.equal(m) // [-1, 2]
vec.neg(a,a).should.equal(a)     // [1, -2]
vec.neg(a,a).should.eql([-1,2])
```

<a name="geom-vec-clamp"></a>
### clamp
clamp(min,a,max).

```js
vec.clamp(min,a,max).should.not.equal(a)
vec.clamp(min,a,max).should.not.equal(b)
vec.clamp(min,a,max).should.not.equal(m)
vec.clamp(min,a,max).should.not.equal(min)
vec.clamp(min,a,max).should.not.equal(max)
vec.clamp(min,a,max).should.eql([5,-5])
```

clamp(min,b,max).

```js
vec.clamp(min,b,max).should.not.equal(a)
vec.clamp(min,b,max).should.not.equal(b)
vec.clamp(min,b,max).should.not.equal(m)
vec.clamp(min,b,max).should.not.equal(min)
vec.clamp(min,b,max).should.not.equal(max)
vec.clamp(min,b,max).should.eql([1,-2])
```

clamp(min,a,max,m).

```js
vec.clamp(min,a,max,m).should.not.equal(a)
vec.clamp(min,a,max,m).should.not.equal(b)
vec.clamp(min,a,max,m).should.not.equal(min)
vec.clamp(min,a,max,m).should.not.equal(max)
vec.clamp(min,a,max,m).should.equal(m)
vec.clamp(min,a,max,m).should.eql([5,-5])
```

clamp(min,a,max,a).

```js
vec.clamp(min,a,max,a).should.equal(a)
vec.clamp(min,a,max,a).should.not.equal(b)
vec.clamp(min,a,max,a).should.not.equal(m)
vec.clamp(min,a,max,a).should.not.equal(min)
vec.clamp(min,a,max,a).should.not.equal(max)
vec.clamp(min,a,max,a).should.eql([5,-5])
```

<a name="geom-vec-perp"></a>
### perp
perp(a).

```js
vec.perp(a).should.not.equal(a)
vec.perp(a).should.not.equal(m)
vec.perp(a).should.eql([2,1])
```

perp(a,m).

```js
vec.perp(a,m).should.not.equal(a)
vec.perp(a,m).should.equal(m)
vec.perp(a,m).should.eql([2,1])
```

perp(a,a).

```js
vec.perp(a,a).should.not.equal(m) // [ 2,1]
vec.perp(a,a).should.equal(a)     // [-1,2]
vec.perp(a,a).should.eql([-2,-1])
```

<a name="geom-vec-cross"></a>
### cross
cross(a,b).

```js
vec.cross(a,b).should.equal(-5)
```

cross(a,a).

```js
vec.cross(a,a).should.equal(0)
```

<a name="geom-vec-dot"></a>
### dot
dot(a,b).

```js
vec.dot(a,b).should.equal(3)
```

dot(a,a).

```js
vec.dot(a,a).should.equal(1)
```

dot(perp(a),b) == cross(a,b).

```js
vec.dot(vec.perp(a),b).should.eql(vec.cross(a,b))
```

<a name="geom-vec-len"></a>
### len
len(a).

```js
vec.len(a).should.equal(1)
```

len(b).

```js
vec.len(b).should.equal(5.830951894845301)
```

len(c).

```js
vec.len(c).should.equal(0)
```

<a name="geom-vec-lensq"></a>
### lenSq
lenSq(a).

```js
vec.lenSq(a).should.equal(1)
```

lenSq(b).

```js
vec.lenSq(b).should.equal(34)
```

lenSq(c).

```js
vec.lenSq(c).should.equal(0)
```

<a name="geom-vec-dist"></a>
### dist
dist(a,b).

```js
vec.dist(a,b).should.equal(5.385164807134504)
```

dist(b,b).

```js
vec.dist(b,b).should.equal(0)
```

<a name="geom-vec-distsq"></a>
### distSq
distSq(a,b).

```js
vec.distSq(a,b).should.equal(29)
```

distSq(b,b).

```js
vec.distSq(b,b).should.equal(0)
```

<a name="geom-vec-norm"></a>
### norm
norm(a).

```js
vec.norm(a).should.not.equal(a)
vec.norm(a).should.not.equal(m)
vec.norm(a).should.eql([1,0])
```

norm(b).

```js
var l = vec.len(b);
vec.norm(b).should.not.equal(a)
vec.norm(b).should.not.equal(b)
vec.norm(b).should.not.equal(m)
vec.norm(b).should.eql([3/l,-5/l])
```

norm(a,m).

```js
vec.norm(a,m).should.not.equal(a)
vec.norm(a,m).should.equal(m)
vec.norm(a,m).should.eql([1,0])
```

norm(a,a).

```js
vec.norm(a,a).should.not.equal(m) // [1,0]
vec.norm(a,a).should.equal(a)     // [1,0]
vec.norm(a,a).should.eql([1,0])
```

<a name="geom-vec-lerp"></a>
### lerp
lerp(a,b,0).

```js
vec.lerp(a,b,0).should.not.equal(a)
vec.lerp(a,b,0).should.not.equal(b)
vec.lerp(a,b,0).should.eql(a)
vec.lerp(a,b,0).should.not.eql(b)
```

lerp(a,b,1).

```js
vec.lerp(a,b,1).should.eql(b)
vec.lerp(a,b,1).should.not.eql(a)
```

lerp(a,b,.5).

```js
vec.lerp(a,b,.5).should.not.eql(a)
vec.lerp(a,b,.5).should.not.eql(b)
vec.lerp(a,b,.5).should.eql([2,-2.5])
```

lerp(a,b,-1).

```js
vec.lerp(a,b,-1).should.not.eql(a)
vec.lerp(a,b,-1).should.not.eql(b)
vec.lerp(a,b,-1).should.eql([-1,5])
```

lerp(a,b,2).

```js
vec.lerp(a,b,2).should.not.eql(a)
vec.lerp(a,b,2).should.not.eql(b)
vec.lerp(a,b,2).should.eql([5,-10])
```

<a name="geom-vec-rot"></a>
### rot
rot(a,Math.PI*2).

```js
vec.rot(a,Math.PI*2).should.not.equal(a)
vec.rot(a,Math.PI*2).should.eql(a) // 360!
```

rot(a,Math.PI).

```js
vec.rot(a,Math.PI).should.not.equal(a)
vec.rot(a,Math.PI).should.eql([-5,-5])
```

rot(a,-Math.PI,m).

```js
vec.rot(a,-Math.PI,m).should.not.equal(a)
vec.rot(a,-Math.PI,m).should.equal(m)
vec.rot(a,-Math.PI,m).should.eql([-5,-5])
```

rot(a,Math.PI/2,a).

```js
vec.rot(a,Math.PI/2,a).should.equal(a)
vec.rot(a,Math.PI/2,a).should.not.equal(m)
vec.rot(a,Math.PI/2,a).should.eql([-5,-5])
```

rot(a,Math.PI) (around origin).

```js
var a = vec.make(5,5)
var o = vec.make(10,10);
var t = vec.sub(a,o)
vec.rot(t,Math.PI,t)
vec.add(o,t).should.not.equal(a)
vec.add(o,t).should.not.equal(t)
vec.add(o,t).should.not.equal(o)
vec.add(o,t).should.not.eql(o)
vec.add(o,t).should.not.eql(t)
vec.add(o,t).should.not.eql(a)
vec.add(o,t).should.eql([15,15])
```

<a name="geom-vec-transform"></a>
### transform
transform(a,mat.rotate(Math.PI)).

```js
vec.transform(a,mat.rotate(Math.PI)).should.eql(vec.rot(a,Math.PI))
```

transform(a,mat.scale(5,0)).

```js
vec.transform(a,mat.scale(5,0)).should.eql(vec.mul(a,[5,0]))
```

transform(a,mat.translate(0,5)).

```js
vec.transform(a,mat.translate(-5,10)).should.eql(vec.add(a,[-5,10]))
```

<a name="geom-vec-reflect"></a>
### reflect
