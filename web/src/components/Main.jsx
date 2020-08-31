import React from "react";
import SpaceTimeGraph from "../components/Spaces/SpaceTimeGraph";
import { useHistory } from "react-router-dom";

function Main() {
  let history = useHistory();
  return (
    <div className="container">
      <div className="row">
        <div className="col-1 col-md-1"></div>
        <div className="col-10 col-md-10">
          <h1>
            Powerful uptime monitoring for websites, applications and APIs.
          </h1>
          <p>
            Raven provides uptime and performance monitoring with detailed
            reporting to help diagnose problems, flexible alerting to notify
            your team of any issues, public status pages to keep your customers
            informed and more. Website speed and uptime are crucial for search
            engine ranking, reducing customer support, and improving the
            customer experience.
          </p>
        </div>
        <div className="col-1 col-md-1"></div>
      </div>
      <div className="row">
        <div className="col-5 col-md-5"></div>
        <div className="col-2 col-md-2">
          <button
            className="raven-buton"
            onClick={() => history.push("/space")}
          >
            Create Space
          </button>
        </div>
        <div className="col-5 col-md-5"></div>
      </div>
      <div className="row">
        <div className="col-1 col-md-1"></div>
        <div className="col-10 col-md-10">
          <div style={{ height: "25px" }}></div>
        </div>
        <div className="col-1 col-md-1"></div>
      </div>
      <div className="row">
        <div className="col-1 col-md-1"></div>
        <div className="col-10 col-md-10">
          <h1>Gather metrics of REST API endpoint testing</h1>
          <h5>
            Get data on Conection durations, Uptime and response time and
            schdule checks
          </h5>
          <p>
            <SpaceTimeGraph
              runs={{
                Data: {
                  Connection: 254894681,
                  Duration: 1124967899,
                  Reponse: 870073218,
                },
              }}
            ></SpaceTimeGraph>
          </p>
        </div>
        <div className="col-1 col-md-1"></div>
      </div>
    </div>
  );
}

export default Main;
