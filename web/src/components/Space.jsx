import React, { useState, useEffect } from "react";
import Basic from "./Spaces/Basic";
import Body from "./Spaces/Body";
import Headers from "./Spaces/Headers";
import SpaceCard from "./Spaces/SpaceCard";
import Select from "react-select";
import Tab from "./Common/Tab/Tab";
import Tabs from "./Common/Tab/Tabs";
import { v4 as uuid } from "uuid";
import dayjs from "dayjs";
import _ from "lodash";
import { CreateSpace, GetSpace, RunSpace } from "../services/Services";
import { useRecoilState, useRecoilValue } from "recoil";
import { spaceState, filterState } from "../store/atoms";
import { filterSpaces } from "../store/selectors";
import { useToasts } from "react-toast-notifications";

const request_types = [
  { value: "GET", label: "GET" },
  { value: "POST", label: "POST" },
  { value: "PUT", label: "PUT" },
  { value: "DELETE", label: "DELETE" },
  { value: "HEAD", label: "HEAD" },
  { value: "PATCH", label: "PATCH" },
  { value: "OPTIONS", label: "OPTIONS" },
];

function Space() {
  let { addToast } = useToasts();
  const [space, setSpace] = useRecoilState(spaceState);
  const [filter, setFilter] = useRecoilState(filterState);
  const filterspaces = useRecoilValue(filterSpaces);
  const [headers, setHeaders] = useState([
    { id: uuid(), field: "", value: "" },
  ]);
  const [body, setBody] = useState("");
  const [basic, setBasic] = useState({
    name: "",
    request: "",
    type: "",
    url: "",
  });

  useEffect(() => {
    GetSpace((err, data) => {
      if (err) {
        addToast("Unable to fetch space! Please try again!", {
          appearance: "error",
          autoDismiss: true,
        });
      } else {
        setSpace(data);
      }
    });
  }, []);

  const createSpace = () => {
    let newSpace = {
      ...basic,
      id: uuid(),
      headers,
      body,
      runs: [],
      created_at: dayjs().format(),
    };
    CreateSpace(newSpace, (err, data) => {
      if (err) {
        addToast("Unable to create space! Please try again!", {
          appearance: "error",
          autoDismiss: true,
        });
      } else {
        setSpace([...space, newSpace]);
      }
    });
  };

  const updateSpace = (id) => {};

  const deleteSpace = (id) => {};

  const runSpace = (id) => {
    RunSpace({ id: id }, (err, data) => {
      let selected = space.find((space) => space.id === id);
      let selectedIndex = space.findIndex((space) => space.id === id);
      selected = { ...selected, runs: data };
      setSpace([
        ...space.slice(0, selectedIndex),
        selected,
        ...space.slice(selectedIndex + 1),
      ]);
    });
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-2 col-md-2"></div>
        <div className="col-12 col-sm-8 col-md-8">
          <div className="raven-card">
            <div className="row">
              <div className="col-md-12">
                <Tabs>
                  <Tab label="BASIC" defult>
                    <Basic
                      basic={basic}
                      setBasic={setBasic}
                      createSpace={createSpace}
                    />
                  </Tab>
                  <Tab label="HEADER">
                    <Headers headers={headers} setHeaders={setHeaders} />
                  </Tab>
                  <Tab label="BODY">
                    <Body body={body} setBody={setBody} />
                  </Tab>
                </Tabs>
              </div>
            </div>
          </div>
        </div>
        <div className="col-sm-2 col-md-2"></div>
      </div>
      {_.get(filterspaces, "length", 0) > 0 ? (
        <div className="row">
          <div className="col-sm-2 col-md-2"></div>
          <div className="col-sm-8 col-md-8">
            <div className="raven-filter">
              <div className="row">
                <div className="col-sm-1 col-md-1"></div>

                <div className="col-sm-4 col-md-4">
                  <Select
                    options={request_types}
                    blurInputOnSelect
                    placeholder="Request Types"
                    value={_.find(request_types, { value: filter.request })}
                    onChange={(e) => setFilter({ ...filter, request: e.value })}
                  />
                </div>

                <div className="col-sm-4 col-md-4">
                  <input
                    className="raven-input"
                    placeholder="Space Name"
                    onChange={(e) =>
                      setFilter({ ...filter, name: e.target.value })
                    }
                  ></input>
                </div>
                <div className="col-sm-2 col-md-2"></div>
                <div className="col-sm-1 col-md-1"></div>
              </div>
            </div>
          </div>
          <div className="col-sm-2 col-md-2"></div>
        </div>
      ) : null}
      <div className="row">
        <div className="col-sm-2 col-md-2"></div>
        <div className="col-sm-8 col-md-8">
          {_.get(filterspaces, "length", 0) > 0
            ? _.map(filterspaces, (data) => {
                return (
                  <SpaceCard key={data.id} data={data} runSpace={runSpace} />
                );
              })
            : null}
        </div>
        <div className="col-sm-2 col-md-2"></div>
      </div>
    </div>
  );
}

export default Space;
