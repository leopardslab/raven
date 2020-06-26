import React, { useState, useEffect } from "react";
import Basic from "./Spaces/Basic";
import Body from "./Spaces/Body";
import Headers from "./Spaces/Headers";
import SpaceCard from "./Spaces/SpaceCard";
import Tab from "./Common/Tab/Tab";
import Tabs from "./Common/Tab/Tabs";
import { v4 as uuid } from "uuid";
import { CreateSpace, GetSpace } from "../services/Services";

function Space() {
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
    GetSpace();
  }, []);

  const createSpace = () => {
    CreateSpace({ ...basic, id: uuid(), headers, body });
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
          {[1, 2, 3].map((space) => {
            return <SpaceCard />;
          })}
        </div>
        <div className="col-sm-2 col-md-2"></div>
      </div>
    </div>
  );
}

export default Space;
