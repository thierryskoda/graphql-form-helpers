import * as isPlainObject from 'is-pojo';
import { invariant } from '../parseFormToMutation';

export interface IValues {
  id?: string;
  [key: string]: any;
}

// We don't call it `upsert`, because Prisma has a mutation named that way and we don't want to imply it is that.
export function update(values?: IValues[] | IValues | null) {
  invariant(
    values == null || Array.isArray(values) || isPlainObject(values),
    'Illegal value for update given'
  );

  if (values) {
    const output: { update?: any } = {};
    const updates: any[] = [];
    if (Array.isArray(values)) {
      values.forEach(value => {
        updates.push(value);
      });
      if (updates.length > 0) {
        output.update = updates;
      }
    } else {
      output.update = values;
    }
    return output;
  }
  return undefined;
}
