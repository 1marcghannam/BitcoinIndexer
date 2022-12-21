const { database } = require("../src/database/database");

describe("Connection to database", () => {
  test("table exists", async () => {
    const query = `
          SELECT *
          FROM index;
        `;
    const result = await database.query(query);
    expect(result.fields.length).toBeGreaterThan(0);
    database.end();
  });
});

//TODO: Add tests for insertTransaction and getTransactions
