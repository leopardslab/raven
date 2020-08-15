import React from "react";
import _ from "lodash";
import CheckCard from "../components/Checks/CheckCard";

function Checks() {
  return (
    <div className="container">
      {_.map(
        [
          { name: "a", period: "hourly" },
          { name: "b", period: "daily" },
          { name: "c", period: "minute" },
        ],
        (check) => (
          <CheckCard name={check.name} period={check.period} />
        )
      )}
    </div>
  );
}

export default Checks;
