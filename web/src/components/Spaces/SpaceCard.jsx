import React, { Fragment } from "react";
import _ from "lodash";
import Editor from "../Common/Editor";
import SpaceTimeGraph from "./SpaceTimeGraph";

const reuestColor = (request) => {
  switch (request) {
    case "POST":
      return "#2196f3";
    case "PUT":
      return "#4caf50";
    case "GET":
      return "#f44336";
    case "DELETE":
      return "#3f51b5";
    case "OPTION":
      return "#ffeb3b";
    default:
      return "#f44336";
  }
};

function SpaceCard({ data, runSpace }) {
  return (
    <div className="raven-card raven-space">
      <div className="row">
        <div className="col-1 col-md-1"></div>
        <div className="col-1 col-md-1">
          <div className="raven-space-start">
            <i
              className="ri-play-line ri-2x start-icon"
              onClick={() => runSpace(data.id)}
            ></i>
          </div>
        </div>
        <div className="col-5 col-md-5">
          <h4>{data.name}</h4>
        </div>
        <div className="col-5  col-md-5"></div>
      </div>
      {!_.isUndefined(data.runs) ? (
        <Fragment>
          <hr />
          <div className="row">
            <div className="col-1  col-md-1"></div>
            <div className="col-10  col-md-10">
              <SpaceTimeGraph runs={data.runs} />
            </div>
            <div className="col-1  col-md-1"></div>
          </div>
          <hr />
        </Fragment>
      ) : (
        <hr />
      )}
      <div className="row">
        <div className="col-1  col-md-1"></div>
        <div className="col-2  col-md-2">
          <div className="raven-space-type">
            <span
              className="get"
              style={{ backgroundColor: reuestColor(data.request) }}
            >
              {data.request}
            </span>
          </div>
        </div>
        <div className="col-8  col-md-8">
          <input
            className="raven-input"
            placeholder="Name"
            value={data.url}
            onChange={() => {}}
          ></input>
        </div>
        <div className="col-1  col-md-1"></div>
      </div>
      <div className="row">
        <div className="col-1  col-md-1"></div>
        <div className="col-3  col-md-3">
          <h5>Headers</h5>
        </div>
        <div className="col-8  col-md-8"></div>
      </div>
      <div className="row">
        <div className="col-1  col-md-1"></div>
        <div className="col-6  col-md-6">
          {_.get(data, "headers.length", 0) > 0
            ? _.get(data, "headers", []).map((header) => {
                return (
                  <div className="row" key={header.ID}>
                    <div className="col-6  col-md-6">
                      <input
                        className="raven-input"
                        placeholder="Name"
                        value={header.Field}
                        onChange={() => {}}
                      ></input>
                    </div>
                    <div className="col-6  col-md-6">
                      <input
                        className="raven-input"
                        placeholder="Name"
                        value={header.Value}
                        onChange={() => {}}
                      ></input>
                    </div>
                  </div>
                );
              })
            : null}
        </div>
        <div className="col-4"></div>
      </div>
      <div className="row">
        <div className="col-1"></div>
        <div className="col-3">
          <h5>Body</h5>
        </div>
        <div className="col-8"></div>
      </div>
      <div className="row">
        <div className="col-1"></div>
        <div className="col-10">
          <Editor name={data.id} value={data.body}></Editor>
        </div>
        <div className="col-1"></div>
      </div>
    </div>
  );
}

export default SpaceCard;
