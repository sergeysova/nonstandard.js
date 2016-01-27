

if (typeof [1].first === 'undefined') {
  Object.defineProperty(Array.prototype, 'first', {
    enumerable: false,
    configurable: false,
    get: function () {
      return this[0];
    },
    set: function (value) {
      this[0] = value;
      return value;
    }
  });
}


if (typeof [1, 2].second === 'undefined') {
  Object.defineProperty(Array.prototype, 'second', {
    enumerable: false,
    configurable: false,
    get: function () {
      return this[1];
    },
    set: function (value) {
      this[1] = value;
      return value;
    }
  });
}


if (typeof [1].last === 'undefined') {
  Object.defineProperty(Array.prototype, 'last', {
    enumerable: false,
    configurable: false,
    get: function () {
      if (this.length === 0) return undefined;
      return this[this.length - 1];
    },
    set: function (value) {
      if (this.length > 0) {
        this[this.length - 1] = value;
        return value;
      }
      else {
        return undefined;
      }
    }
  });
}


if (typeof Array.prototype.clean === 'undefined') {
  Object.defineProperty(Array.prototype, 'clean', {
    enumerable: false,
    configurable: false,
    value: function (deleteValue) {
      for (var foundId = 0; foundId < this.length; foundId++) {
        if (this[foundId] === deleteValue || (typeof deleteValue === 'function' && deleteValue(this[foundId]))) {
          this.splice(foundId, 1);
          foundId--;
        }
      }
      return this;
    }
  });
}


if (typeof Array.prototype.includes === 'undefined') {
  Object.defineProperty(Array.prototype, 'includes', {
    enumerable: false,
    configurable: false,
    value: function (searchElements) {
      var that = this;

      if (!Array.isArray(searchElements)) {
        searchElements = [searchElements];
      }
      return searchElements.every(function(element){
        return that.indexOf(element) > -1;
      });
    }
  });
}


if (typeof Array.prototype.clone === 'undefined') {
  Object.defineProperty(Array.prototype, 'clone', {
    enumerable: false,
    configurable: false,
    value: function () {
      return this.slice(0);
    }
  });
}


if (typeof Object.clone === 'undefined') {
  Object.defineProperty(Object, 'clone', {
    enumerable: false,
    configurable: false,
    value: function (target) {
      if (typeof target !== 'object') throw new TypeError('Parameter `target` must be Object!');

      var newObj = {};
      var keys = Object.keys(target);

      for (var index in keys) {
        var key = keys[index];

        if (Array.isArray(target[key])) {
          newObj[key] = target[key].clone();
        }
        else if (typeof target[key] === 'object') {
          newObj[key] = Object.clone(target[key]);
        }
        else {
          newObj[key] = target[key];
        }
      }
      return newObj;
    }
  });
}


if (typeof Object.empty === 'undefined') {
  Object.defineProperty(Object, 'empty', {
    enumerable: false,
    configurable: false,
    value: function(target) {
      if (!Array.isArray(target) && typeof target !== 'object') throw new TypeError('Parameter `target` must be Object or Array!');

      if (Array.isArray(target)) {
        return target.length === 0;
      }

      return Object.keys(target).length === 0;
    }
  });
}


if (typeof Number.range === 'undefined') {
  Object.defineProperty(Number, 'range', {
    enumerable: false,
    configurable: false,
    value: function (min, max, step) {
      if (typeof min !== 'number'
          || typeof max !== 'number'
          || (typeof step !== 'undefined' && typeof step !== 'number')) {
        throw new TypeError('Arguments for Number.range() must be Number');
      }

      if (typeof step === 'undefined') step = 1;
      if (step <= 0) throw new Error('Step must be positive number!');
      if (min > max) throw new Error('Min must be less than Max!');

      var values = [min], it = min;

      while(it !== max) {
        values.push(it += step);
      }
      return values;
    }
  });
}

if (typeof Number.prototype.times === 'undefined') {
  Object.defineProperty(Number.prototype, 'times', {
    enumerable: false,
    configurable: false,
    value: function (callback) {
      if (typeof callback !== 'function') throw new TypeError('Parameter `callback` must be Function!');

      var result = [];
      var iterates = Number(this);
      for (var i = 0; i < iterates; i++) {
        result.push(callback(i + 0));
      }
      return result;
    }
  });
}


(function(){
  var definePipe = function(target, name) {
    if (!('pipe' in target)) {
      Object.defineProperty(target[name], 'pipe', {
        enumerable: false,
        configurable: false,
        value: function() {
          var caller = target[name];
          if (!(typeof process !== 'undefined' && process.env.NODE_ENV === "test")) {
            caller.apply(target, arguments);
          }
          return arguments[0];
        }
      });
    }
  };

  if (typeof global !== 'undefined' && global.console) {
    definePipe(global.console, 'error');
    definePipe(global.console, 'warn');
    definePipe(global.console, 'info');
    definePipe(global.console, 'log');

    if (!('pipe' in global.console)) {
      Object.defineProperty(global.console, 'pipe', {
        enumerable: false,
        configurable: false,
        value: function() {
          if (!(typeof process !== 'undefined' && process.env.NODE_ENV === "test")) {
            global.console.log.apply(global.console, arguments);
          }
          return arguments[0];
        }
      });
    }
  }

  if (typeof window !== 'undefined' && window.console) {
    definePipe(window.console, 'error');
    definePipe(window.console, 'warn');
    definePipe(window.console, 'info');
    definePipe(window.console, 'log');

    if (!('pipe' in window.console)) {
      Object.defineProperty(window.console, 'pipe', {
        enumerable: false,
        configurable: false,
        value: function() {
          if (!(typeof process !== 'undefined' && process.env.NODE_ENV === "test")) {
            window.console.log.apply(window.console, arguments);
          }
          return arguments[0];
        }
      });
    }
  }
})();




