
//Написать кеширующую функцию со следующим поведением:
//
//    Если getData не вызывалась, вызвать и закешировать результат
//    Если вызывалась недавно, то вернуть сохраненный результат
//    Если вызывалась давно, заново сходить за данными



function cachingFn(fn) {
  var cache = {};
  return function() {
    var key = JSON.stringify(arguments);
    var currentTime = new Date().getTime();
    if (!cache.hasOwnProperty(key) || currentTime - cache['time' + key] > 3000) {
      console.log('I work')
      cache['time' + key] = currentTime;
      cache[key] = fn.apply(this, arguments);
    }
    return cache[key];
  };
}


function f(a, b, c) {
  return a * b + c;
};

var cacheF = cachingFn(f);
cacheF(2, 2, "asdf"); //'I work'
cacheF(2, 2, "asdf");
cacheF(2, 3, "asdf"); //'I work'
cacheF(2, 3, "asdf");

setTimeout(() => cacheF(2, 3, "asdf"), 1000);
setTimeout(() => cacheF(2, 3, "asdf"), 5000); //'I work'
