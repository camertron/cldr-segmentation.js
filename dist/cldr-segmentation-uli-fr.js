(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define('cldr/segmentation/uliExceptions/fr', ['module', 'exports'], factory);
  } else if (typeof exports !== "undefined") {
    factory(module, exports);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod, mod.exports);
    global.cldrSegmentation.uliExceptions.fr = mod.exports;
  }
})(this, function (module, exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = ['All.', 'C.', 'Comm.', 'D.', 'DC.', 'Desc.', 'Inc.', 'Jr.', 'L.', 'M.', 'MM.', 'Mart.', 'Op.', 'P.', 'P.-D. G.', 'P.O.', 'Prof.', 'S.A.', 'S.M.A.R.T.', 'U.', 'U.S.', 'U.S.A.', 'Var.', 'W.', 'acoust.', 'adr.', 'anc.', 'ann.', 'anon.', 'append.', 'aux.', 'broch.', 'bull.', 'cam.', 'categ.', 'coll.', 'collab.', 'config.', 'dest.', 'dict.', 'dir.', 'doc.', 'encycl.', 'exempl.', 'fig.', 'gouv.', 'graph.', 'hôp.', 'ill.', 'illustr.', 'imm.', 'imprim.', 'indus.', 'niv.', 'quart.', 'réf.', 'symb.', 'synth.', 'syst.', 'trav. publ.', 'voit.', 'éd.', 'édit.', 'équiv.', 'éval.'];
  module.exports = exports['default'];
});
