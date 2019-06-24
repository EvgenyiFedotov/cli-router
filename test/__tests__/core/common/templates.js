const templates = require('../../../../src/core/common/templates');

const helpers = require('../../../helpers');

test('createTemplate()', () => {
  const pathModules = helpers.createPathConfig();

  expect(templates.createTemplate).toThrow();
});

test.todo('deleteTemplate()');

test.todo('runTemplate()');

test.todo('getListTemplates()');
