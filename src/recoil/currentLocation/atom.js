import { atom } from "recoil";

const currentLocationAtom = atom({
  key: "currentLocation",
  default: {},
});

export default currentLocationAtom;
