const test = require('node:test');
const assert = require('node:assert/strict');

test('Application has the correct project name', () => {
    const packageInfo = require('../package.json');

    assert.equal(packageInfo.name, 'coderwanda-webapp');
});