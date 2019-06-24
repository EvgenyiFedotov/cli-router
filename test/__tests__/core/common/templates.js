const templates = require("../../../../src/core/common/templates");

test("createTemplate()", async () => {
  await expect(templates.createTemplate()).rejects.toThrow();
});
