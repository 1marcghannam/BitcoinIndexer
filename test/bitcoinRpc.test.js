const requestRpc = require("../src/utils/rpc");

describe("Bitcoin RPC", () => {
  test("getblockchaininfo", async () => {
    const response = await requestRpc("getblockchaininfo");
    expect(response.blocks).toBeGreaterThan(0);
  });
});
