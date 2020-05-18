import navigationAction from "../navigationAction";
import { USER_NAVIGATION } from "../../constants";

describe("navigationAction", () => {
  it("navigationAction", () => {
    const url = "www.google.pt";
    expect(navigationAction(url)).toEqual({
      type: USER_NAVIGATION,
      url
    });
  });
});
