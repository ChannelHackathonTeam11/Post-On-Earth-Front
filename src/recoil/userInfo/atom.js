import { atom } from "recoil";

const userInfoAtom = atom({
  key: "userInfo",
  default: { user_id: "", profileURL: "", password: "" },
});

export default userInfoAtom;
