import React from "react";

const NotFound = () => {
  return (
    <React.Fragment>
      <br />
      <div className="row">
        <div className="col-sm-6">
          <div className="card">
            <div className="card-header">Page not found</div>
            <div className="card-body">
              <h5 className="text-warning">
                <i className="fa fa-exclamation-triangle p-2" />
                <span className="text-dark">
                  Oops... we can not find the page requested.
                </span>
              </h5>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default NotFound;
