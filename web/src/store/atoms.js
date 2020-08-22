import { atom } from "recoil";

export const spaceState = atom({
  key: "raven-spaces",
  default: [],
});

export const checkState = atom({
  key: "raven-checks",
  default: [],
});

export const filterState = atom({
  key: "raven-spaces-filter",
  default: {
    name: "",
    request: "",
  },
});

export const userState = atom({
  key: "raven-user",
  default: null,
});
