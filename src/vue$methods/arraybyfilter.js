var timefilter = {};

timefilter.install = function(Vue) {

  var toString = Object.prototype.toString;
  var OBJECT_STRING = '[object Object]';

  function isPlainObject(obj) {
    return toString.call(obj) === OBJECT_STRING;
  }

  function containsAll(val, search, level) {
    if (level <= 0) {
      return false;
    }
    var i;
    if (isPlainObject(val)) {
      var keys = Object.keys(val);
      i = keys.length;
      while (i--) {
        if (containsAll(val[keys[i]], search, level - 1)) {
          return true;
        }
      }
    } else if (Array.isArray(val)) {
      i = val.length;
      while (i--) {
        if (containsAll(val[i], search, level - 1)) {
          return true;
        }
      }
    } else if (val != null) {
      return val.toString().toLowerCase().indexOf(search) > -1;
    }
  }

  function contains(val, key, search, level) {
    if (level <= 0) {
      return false;
    }
    var i;
    if (isPlainObject(val)) {
      var keys = Object.keys(val);
      i = keys.length;
      while (i--) {
        if (keys[i] == key && !(isPlainObject(val[keys[i]]) || Array.isArray(val[keys[i]]))) {
          return (val[keys[i]] || "").toString().toLowerCase().indexOf(search) > -1;
        } else {
          if (isPlainObject(val[keys[i]]) || Array.isArray(val[keys[i]])) {

            if (contains(val[keys[i]], key, search, level - 1)) {
              return true;
            }

          }

        }

      }
    } else if (Array.isArray(val)) {
      i = val.length;
      while (i--) {
        if (contains(val[i], key, search, level - 1)) {
          return true;
        }
      }
    } else if (val != null) {
      return val.toString().toLowerCase().indexOf(search) > -1;
    }
  }

  Vue.prototype.$arraybyfilter = function(value, search, key, level) {
    search = (search || "").toLowerCase();
    if (level) {} else {
      level = 9999;
    }
    if (Array.isArray(value)) {
      return value.filter(function(obj) {
        if (key) {
          return contains(obj, key, search, level);
        } else {
          return containsAll(obj, search, level);
        }

      })
    }
    return value;

  };

}

export default timefilter
