var vec = require('./index')

function benchAlloc(done){
  vec.alloc();
  var mem = process.memoryUsage()
    , ticks = 0;
  process.nextTick(function checkMem(){
    ticks++
    for( var i=0; i < 100; i++ ){
      var v = vec.alloc()
      vec.free(v);
    }

    var mem2 = process.memoryUsage();

    // gc happened!
    if( mem2.heapUsed < mem.heapUsed ){
      done(ticks)
    } else {
      mem = mem2
      process.nextTick(checkMem)
    }
  })
}

function benchArray(done){
  var mem = process.memoryUsage()
    , ticks = 0;
  process.nextTick(function checkMem(){
    ticks++
    for( var i=0; i < 100; i++ ){
      var v = new Array(2)
      v[0] = 0
      v[1] = 0
      // let it disappear
    }

    var mem2 = process.memoryUsage();

    // gc happened!
    if( mem2.heapUsed < mem.heapUsed ){
      done(ticks)
    } else {
      mem = mem2
      process.nextTick(checkMem)
    }
  })
}


benchArray(function(ticks){console.log('[]:',ticks)})
benchAlloc(function(ticks){console.log('v():',ticks)})