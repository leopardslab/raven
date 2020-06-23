import React from "react";

function Space() {
  return (
    <div className="container">
      <div className="row">
        <div className="col-1 col-sm-2 col-md-3"></div>
        <div className="col-10 col-sm-8 col-md-6">
          <div className="raven-card">
            <div className="row">
              <div className="col-md-2"></div>
              <div className="col-md-8"></div>
              <div className="col-md-2"></div>
            </div>
            <div className="row">
              <div className="col-md-2"></div>
              <div className="col-md-8"></div>
              <div className="col-md-2"></div>
            </div>
            <div className="row">
              <div className="col-md-2"></div>
              <div className="col-md-8">
                <input className="raven-input" placeholder="Name"></input>
              </div>
              <div className="col-md-2"></div>
            </div>
          </div>
        </div>
        <div className="col-1 col-sm-2 col-md-3"></div>
      </div>
    </div>
  );
}

export default Space;
