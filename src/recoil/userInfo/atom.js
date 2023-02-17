import { atom } from "recoil";

const userInfoAtom = atom({
  key: "userInfo",
  default: { user_id: "root", profileURL: "", password: "testpassword" },
});

export default userInfoAtom;
