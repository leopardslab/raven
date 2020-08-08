import { spaceState, filterState } from "./atoms";
import { selector } from "recoil";
import _ from "lodash";

export const filterSpaces = selector({
  key: "filterSpace",
  get: ({ get }) => {
    const spaces = get(spaceState);
    const filter = get(filterState);

    const request_filtered = _.filter(
      spaces,
      (space) => space.request === filter.request
    );

    const name_filtered = _.filter(spaces, (space) => {
      return space.name.indexOf(filter.name) != -1;
    });

    if (request_filtered.length > 0) {
      return request_filtered;
    } else if (name_filtered.length > 0) {
      return name_filtered;
    } else {
      return spaces;
    }
  },
});
