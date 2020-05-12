import { USER_NAVIGATION } from "../constants";

const navigationAction = url => ({
    type: USER_NAVIGATION,
    url});

export default navigationAction;