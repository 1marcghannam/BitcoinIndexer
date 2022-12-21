const { getOpReturnData } = require("../src/utils/indexBlockTransactions");

describe("Index Block Transactions", () => {
  test("getOpReturnData returns correct data for valid scriptPubKey", () => {
    const scriptPubKey = "6a0665786f647573"; // valid scriptPubKey with OP_RETURN prefix
    const expectedData = "65786f647573"; // data following OP_RETURN prefix
    const result = getOpReturnData(scriptPubKey);
    expect(result).toEqual(expectedData);
  });

  test("getOpReturnData returns null for invalid scriptPubKey", () => {
    const scriptPubKey = "6b4c4f424553"; // invalid scriptPubKey with different prefix
    const result = getOpReturnData(scriptPubKey);
    expect(result).toBeNull();
  });
});

//TODO: Add tests for filterOpReturnData and getTransactionsWithOpReturn
