import React, { Fragment } from "react";
import { v4 as uuid } from "uuid";
import _ from "lodash";

function Headers({ headers, setHeaders }) {
  const addHeader = () => {
    setHeaders([...headers, { id: uuid(), field: "", value: "" }]);
  };

  const deleteHeader = (id) => {
    setHeaders(_.filter(headers, (header) => header.id !== id));
  };

  const onChange = (id, field, value) => {
    let header = _.find(headers, { id: id });
    let headerIndex = _.findIndex(headers, { id: id });
    header[field] = value;
    let newdata = [
      ...headers.slice(0, headerIndex),
      header,
      ...headers.slice(++headerIndex),
    ];
    setHeaders([...newdata]);
  };

  return (
    <Fragment>
      {_.get(headers, "length", 0) > 0
        ? _.map(headers, ({ id, field, value }) => (
            <Fragment key={id}>
              <div className="row">
                <div className="col-1"></div>
                <div className="col-4">
                  <input
                    className="raven-input"
                    placeholder="Field"
                    value={field}
                    onChange={(e) => onChange(id, "field", e.target.value)}
                  ></input>
                </div>
                <div className="col-5">
                  <input
                    className="raven-input"
                    placeholder="Value"
                    value={value}
                    onChange={(e) => onChange(id, "value", e.target.value)}
                  ></input>
                </div>
                <div className="col-1">
                  <i
                    className="ri-delete-bin-line"
                    onClick={() => deleteHeader(id)}
                  ></i>
                </div>
                <div className="col-1"></div>
              </div>
            </Fragment>
          ))
        : null}
      <div className="row">
        <div className="col-1"></div>
        <div className="col-9">
          <button className="raven-buton" onClick={addHeader}>
            <i className="ri-add-circle-line ri-lg"></i> Add More Headers
          </button>
        </div>
        <div className="col-2"></div>
      </div>
      <div className="row">
        <div className="col-1 col-md-7"></div>
        <div className="col-5 col-md-2">
          <button className="raven-buton">Cancel</button>
        </div>
        <div className="col-5 col-md-2">
          <button className="raven-buton">Save</button>
        </div>
        <div className="col-1 col-md-1"></div>
      </div>
    </Fragment>
  );
}

export default Headers;
