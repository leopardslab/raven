import React, { Fragment } from "react";
import Select from "react-select";
import _ from "lodash";

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

function Basic({ basic, setBasic, createSpace }) {
  return (
    <Fragment>
      <div className="row">
        <div className="col-1 col-md-1"></div>
        <div className="col-10 col-md-10">
          <input
            className="raven-input"
            placeholder="Name"
            value={basic.name}
            onChange={(e) => setBasic({ ...basic, name: e.target.value })}
          ></input>
        </div>
        <div className="col-1 col-md-1"></div>
      </div>
      <div className="row">
        <div className="col-1 col-md-1"></div>
        <div className="col-10 col-md-3">
          <Select
            options={http_options}
            blurInputOnSelect
            placeholder="Request"
            value={_.find(http_options, { value: basic.request })}
            onChange={(e) => setBasic({ ...basic, request: e.value })}
          />
        </div>
        <div className="col-1 d-sm-none"></div>
        <div className="col-1 d-sm-none"></div>
        <div className="col-10 col-md-3">
          <Select
            options={http_type}
            blurInputOnSelect
            placeholder="Type"
            value={_.find(http_type, { value: basic.type })}
            onChange={(e) => setBasic({ ...basic, type: e.value })}
          />
        </div>
        <div className="col-1 d-sm-none"></div>
        <div className="col-1 d-sm-none"></div>
        <div className="col-10 col-md-4">
          <input
            className="raven-input"
            placeholder="URL"
            value={basic.url}
            onChange={(e) => setBasic({ ...basic, url: e.target.value })}
          ></input>
        </div>
        <div className="col-1 col-md-1"></div>
      </div>
      <div className="row">
        <div className="col-1 col-md-7"></div>
        <div className="col-5 col-md-2">
          <button
            className="raven-buton"
            onClick={(e) =>
              setBasic({
                name: "",
                request: "",
                type: "",
                url: "",
              })
            }
          >
            Cancel
          </button>
        </div>
        <div className="col-5 col-md-2">
          <button className="raven-buton" onClick={(e) => createSpace()}>
            Save
          </button>
        </div>
        <div className="col-1 col-md-1"></div>
      </div>
    </Fragment>
  );
}

export default Basic;
