import React, { Fragment } from "react";

function Home() {
  return (
    <Fragment>
      <div className="context">
        <nav>
          <div className="row">
            <div className="col-1 col-md-1 col-lg-2"></div>
            <div className="col-10 col-md-10 col-lg-8">
              <h2>Raven</h2>
            </div>
            <div className="col-1 col-md-1 col-lg-2"></div>
          </div>
        </nav>
        <div className="container">
          <div className="row">
            <div className="col-1 col-sm-1 col-md-1"></div>
            <div className="col-10 col-sm-10 col-md-10">
              <h1>
                Powerful uptime monitoring for websites, applications and APIs.
              </h1>
              <p>
                Raven provides uptime and performance monitoring with detailed
                reporting to help diagnose problems, flexible alerting to notify
                your team of any issues, public status pages to keep your
                customers informed and more. Website speed and uptime are
                crucial for search engine ranking, reducing customer support,
                and improving the customer experience.
              </p>
            </div>
            <div className="col-1 col-sm-1 col-md-1"></div>
          </div>
          <div className="row">
            <div className="col-1 col-sm-1 col-md-1"></div>
            <div className="col-10 col-sm-10 col-md-10">
              <h1>Monitors all of your monitors in one spot</h1>
              <p>
                Get a clear overview of all websites and APIs you're monitoring
                in one simple view. See the uptime, mean response time over the
                past day, week, or month to get an idea of their health.
              </p>
            </div>
            <div className="col-1 col-sm-1 col-md-1"></div>
          </div>
        </div>
      </div>

      <div class="area">
        <ul class="circles">
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>
    </Fragment>
  );
}

export default Home;
