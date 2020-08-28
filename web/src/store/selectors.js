import { spaceState, checkState, filterState } from "./atoms";
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
      let space_name = space && space.name;
      let filter_name = filter && filter.name;
      return space_name && space_name.indexOf(filter_name) !== -1;
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

export const filterChecks = selector({
  key: "filterChecks",
  get: ({ get }) => {
    const checks = get(checkState);
    const filter = get(filterState);

    const request_filtered = _.filter(
      checks,
      (check) => check.request === filter.request
    );

    const name_filtered = _.filter(checks, (check) => {
      let check_name = check && check.name;
      let filter_name = filter && filter.name;
      return check_name.indexOf(filter_name) !== -1;
    });

    if (request_filtered.length > 0) {
      return request_filtered;
    } else if (name_filtered.length > 0) {
      return name_filtered;
    } else {
      return checks;
    }
  },
});
