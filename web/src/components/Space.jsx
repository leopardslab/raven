import React from "react";
import Select from "react-select";
import Tab from "./Common/Tab/Tab";
import Tabs from "./Common/Tab/Tabs";

const http_options = [
  { value: "GET", label: "GET" },
  { value: "POST", label: "POST" },
  { value: "PUT", label: "PUT" },
  { value: "DELETE", label: "DELETE" },
  { value: "HEAD", label: "HEAD" },
  { value: "PATCH", label: "PATCH" },
  { value: "OPTIONS", label: "OPTIONS" },
];

const http_type = [
  { value: "http://", label: "http://" },
  { value: "https://", label: "https://" },
];

function Space() {
  return (
    <div className="container">
      <div className="row">
        <div className="col-1 col-sm-2 col-md-2"></div>
        <div className="col-10 col-sm-8 col-md-8">
          <div className="raven-card">
            <div className="row">
              <div className="col-md-12">
                <Tabs>
                  <Tab label="BASIC" defult>
                    <div className="row">
                      <div className="col-md-1"></div>
                      <div className="col-md-10">
                        <input
                          className="raven-input"
                          placeholder="Name"
                        ></input>
                      </div>
                      <div className="col-md-1"></div>
                    </div>
                    <div className="row">
                      <div className="col-md-1"></div>
                      <div className="col-md-3">
                        <Select
                          options={http_options}
                          blurInputOnSelect
                          placeholder="Request"
                        />
                      </div>
                      <div className="col-md-3">
                        <Select
                          options={http_type}
                          blurInputOnSelect
                          placeholder="Type"
                        />
                      </div>
                      <div className="col-md-4">
                        <input
                          className="raven-input"
                          placeholder="URL"
                        ></input>
                      </div>
                      <div className="col-md-1"></div>
                    </div>
                    <div className="row">
                      <div className="col-md-7"></div>
                      <div className="col-md-2">
                        <button className="raven-buton">Cancel</button>
                      </div>
                      <div className="col-md-2">
                        <button className="raven-buton">Save</button>
                      </div>
                      <div className="col-md-1"></div>
                    </div>
                  </Tab>
                  <Tab label="HEADER"></Tab>
                  <Tab label="BODY"></Tab>
                </Tabs>
              </div>
            </div>
          </div>
        </div>
        <div className="col-1 col-sm-2 col-md-2"></div>
      </div>
    </div>
  );
}

export default Space;
