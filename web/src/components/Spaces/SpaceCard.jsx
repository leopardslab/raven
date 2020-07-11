import React from "react";
import Editor from "../Common/Editor";

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
      <hr />
      <div className="row">
        <div className="col-1  col-md-1"></div>
        <div className="col-5  col-md-5">
          <h4>{data.name}</h4>
        </div>
        <div className="col-6  col-md-6"></div>
      </div>
      <div className="row">
        <div className="col-1  col-md-1"></div>
        <div className="col-2  col-md-2">
          <div className="raven-space-type">
            <span className="get">{data.type}</span>
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
          {data.headers.map((header) => {
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
          })}
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
