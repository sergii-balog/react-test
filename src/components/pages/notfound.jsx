import React from "react";

const NotFound = () => {
  return (
    <React.Fragment>
      <br />
      <div class="row">
        <div class="col-sm-6">
          <div class="card">
            <div class="card-header">Page not found</div>
            <div class="card-body">
              <h5 className="text-warning">
                <i class="fa fa-exclamation-triangle p-2" />
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
