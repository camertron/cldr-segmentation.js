(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define('cldr/segmentation/uliExceptions/it', ['module', 'exports'], factory);
  } else if (typeof exports !== "undefined") {
    factory(module, exports);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod, mod.exports);
    global.cldrSegmentation.uliExceptions.it = mod.exports;
  }
})(this, function (module, exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = ['C.P.', 'Cfr.', 'D.', 'DC.', 'Geom.', 'Ing.', 'L.', 'Liv.', 'Ltd.', 'Mod.', 'N.B.', 'N.d.A.', 'N.d.E.', 'N.d.T.', 'O.d.G.', 'S.A.R.', 'S.M.A.R.T.', 'S.p.A.', 'Sig.', 'U.S.', 'U.S.A.', 'a.C.', 'ag.', 'all.', 'arch.', 'avv.', 'c.c.p.', 'd.C.', 'd.p.R.', 'div.', 'dott.', 'dr.', 'fig.', 'int.', 'mitt.', 'on.', 'p.', 'p.i.', 'pag.', 'rag.', 'sez.', 'tab.', 'tav.', 'ver.', 'vol.'];
  module.exports = exports['default'];
});
