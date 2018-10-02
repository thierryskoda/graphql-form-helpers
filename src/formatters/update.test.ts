import { parseFormToMutation, update, save } from '..';

test('update - handle empty case correctly', () => {
  expect(update(null)).toEqual(undefined);
});

test('update - accept object', () => {
  const values = {
    restaurant: {
      name: 'Red Wheelbarrow',
      organization: { name: 'fsociety' }
    }
  };
  const scheme = {
    restaurant: {
      __format: update,
      organization: update
    }
  };
  const formatted = parseFormToMutation(values, scheme);

  expect(formatted).toEqual({
    restaurant: {
      update: {
        name: 'Red Wheelbarrow',
        organization: { update: { name: 'fsociety' } }
      }
    }
  });
});

test('update - accept array', () => {
  const values = {
    categories: [
      {
        id: 'category-1',
        name: 'Drinks',
        items: [
          {
            name: 'Coca cola'
          },
          {
            name: 'Beer'
          }
        ]
      }
    ]
  };
  const scheme = {
    categories: {
      __format: save,
      items: update
    }
  };
  const formatted = parseFormToMutation(values, scheme);

  expect(formatted).toEqual({
    categories: {
      update: [
        {
          where: { id: 'category-1' },
          data: {
            name: 'Drinks',
            items: {
              update: [
                {
                  name: 'Coca cola'
                },
                {
                  name: 'Beer'
                }
              ]
            }
          }
        }
      ]
    }
  });
});

test('update - throw error on invalid value', () => {
  expect(() => update(1 as any)).toThrow('Illegal value for update given');
});
