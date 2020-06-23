import React from "react";

function Home() {
  return (
    <div className="container">
      <div className="row">
        <div className="col-1 col-sm-2 col-md-2"></div>
        <div className="col-10 col-sm-8 col-md-8">
          <div className="login">
            <div className="row">
              <div className="col-2"></div>
              <div className="col-8">
                <div>
                  <h3 className="tilte">Welcome</h3>
                </div>
              </div>
              <div className="col-2"></div>
            </div>
            <div className="row">
              <div className="col-2"></div>
              <div className="col-8">
                <div>
                  <h3 className="sub-title">Sign in to create personalized spaces</h3>
                </div>
              </div>
              <div className="col-2"></div>
            </div>
            <div className="row">
              <div className="col-2"></div>
              <div className="col-8">
                <button className="google">
                  <img className="logo-icon" src="assets/google.svg" />
                  Google
                </button>
              </div>
              <div className="col-2"></div>
            </div>
            <div className="row">
              <div className="col-2"></div>
              <div className="col-8">
                <button className="github">
                  <img className="logo-icon" src="assets/github.svg" />
                  Github
                </button>
              </div>
              <div className="col-2"></div>
            </div>
          </div>
        </div>
        <div className="col-1 col-sm-2 col-md-2"></div>
      </div>
    </div>
  );
}

export default Home;
