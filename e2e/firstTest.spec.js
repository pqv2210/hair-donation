// For more info on how to write Detox tests, see the official docs:
// https://github.com/wix/Detox/blob/master/docs/README.md

const { reloadApp } = require("./reload")

describe("Example", () => {
  beforeEach(async () => {
    await reloadApp()
  })

  it("should have welcome screen", async () => {
    await expect(element(by.id("HomeScreen"))).toBeVisible()
  })
})
