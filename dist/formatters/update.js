'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
var isPlainObject = require('is-pojo');
var parseFormToMutation_1 = require('../parseFormToMutation');
// We don't call it `upsert`, because Prisma has a mutation named that way and we don't want to imply it is that.
function update(values) {
  parseFormToMutation_1.invariant(
    values == null || Array.isArray(values) || isPlainObject(values),
    'Illegal value for update given'
  );
  if (values) {
    var output = {};
    var updates_1 = [];
    if (Array.isArray(values)) {
      values.forEach(function(value) {
        updates_1.push(value);
      });
      if (updates_1.length > 0) {
        output.update = updates_1;
      }
    } else {
      output.update = values;
    }
    return output;
  }
  return undefined;
}
exports.update = update;
