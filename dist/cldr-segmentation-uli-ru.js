(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define('cldr/segmentation/uliExceptions/ru', ['module', 'exports'], factory);
  } else if (typeof exports !== "undefined") {
    factory(module, exports);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod, mod.exports);
    global.cldrSegmentation.uliExceptions.ru = mod.exports;
  }
})(this, function (module, exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = ['кв.', 'отд.', 'проф.', 'руб.', 'тел.', 'тыс.', 'ул.'];
  module.exports = exports['default'];
});
