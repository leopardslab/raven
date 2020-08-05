import React, { useState, useEffect } from "react";
import Basic from "./Spaces/Basic";
import Body from "./Spaces/Body";
import Headers from "./Spaces/Headers";
import SpaceCard from "./Spaces/SpaceCard";
import Tab from "./Common/Tab/Tab";
import Tabs from "./Common/Tab/Tabs";
import { v4 as uuid } from "uuid";
import dayjs from "dayjs";
import _ from "lodash";
import { CreateSpace, GetSpace, RunSpace } from "../services/Services";
import { useRecoilState } from "recoil";
import { spaceState } from "../store/atoms";
import { useToasts } from "react-toast-notifications";

function Space() {
  let { addToast } = useToasts();
  const [space, setSpace] = useRecoilState(spaceState || []);
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
      console.log("space", data);
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
      <div className="row">
        <div className="col-sm-2 col-md-2"></div>
        <div className="col-sm-8 col-md-8">
          {_.get(space, "length", 0) > 0
            ? _.map(space, (data) => {
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
