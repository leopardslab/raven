import React, { useState, useEffect } from "react";
import _ from "lodash";
import { GetCheck } from "../services/Services";
import { useRecoilState, useRecoilValue } from "recoil";
import { checkState, filterState } from "../store/atoms";
import { filterSpaces } from "../store/selectors";
import { useToasts } from "react-toast-notifications";
import CheckCard from "../components/Checks/CheckCard";

function Checks() {
  let { addToast } = useToasts();
  const [check, setCheck] = useRecoilState(checkState);
  const [filter, setFilter] = useRecoilState(filterState);
  const filterspaces = useRecoilValue(filterSpaces);

  useEffect(() => {
    GetCheck((err, data) => {
      if (err) {
        addToast("Unable to fetch checks! Please try again!", {
          appearance: "error",
          autoDismiss: true,
        });
      } else {
        setCheck(data);
      }
    });
  }, [addToast, setCheck]);

  return (
    <div className="container">
      {_.map(check, (check) => (
        <CheckCard
          key={check.id}
          name={check.name}
          period={check.period}
          type={check.type}
          runs={check.runs}
        />
      ))}
    </div>
  );
}

export default Checks;
