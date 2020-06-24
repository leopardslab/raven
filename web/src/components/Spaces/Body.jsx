import React, { Fragment } from "react";

function Body({ body, setBody }) {
  return (
    <Fragment>
      <div className="row">
        <div className="col-md-1"></div>
        <div className="col-md-10">
          <textarea
            className="raven-input"
            rows="8"
            value={body}
            onChange={(e) => setBody(e.target.value)}
          ></textarea>
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
    </Fragment>
  );
}

export default Body;
