const listHelper = require('../utils/list_helper')

test('dummy return one', () => {
    expect(listHelper.dummy([])).toBe(1)
})