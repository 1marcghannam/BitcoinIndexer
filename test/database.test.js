const { database } = require("../src/database/database");

describe("Connection to database", () => {
  test("table exists", async () => {
    const query = `
          SELECT *
          FROM index;
        `;
    const result = await database.query(query);
    expect(result.rows.length).toBeGreaterThan(0);
    database.end();
  });
});
