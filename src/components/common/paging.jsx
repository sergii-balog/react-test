import React from "react";
import _ from "lodash";
import PropTypes from "prop-types";

const Paging = props => {
  const { totalItems, pageSize, selectedPage, onPageSelected } = props;

  const pagesCount = Math.ceil(totalItems / pageSize);
  const pages = _.range(1, pagesCount + 1);

  if (parseInt(pagesCount) === 1) return null;

  return (
    <React.Fragment>
      <nav aria-label="Paging area">
        <div className="row">
          <div className="col">
            <ul className="pagination">
              {pages.map(page => (
                <li
                  key={page}
                  className={
                    selectedPage === page ? "page-item active" : "page-item"
                  }
                >
                  <a
                    className="page-link"
                    href="# "
                    onClick={() => {
                      onPageSelected(page);
                    }}
                  >
                    {page}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="col-2 text-right">
            <span>
              {(selectedPage - 1) * pageSize + 1}-{selectedPage * pageSize} of{" "}
              {totalItems}
            </span>
          </div>
        </div>
      </nav>
    </React.Fragment>
  );
};

Paging.propTypes = {
  totalItems: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  selectedPage: PropTypes.number.isRequired,
  onPageSelected: PropTypes.func.isRequired
};

export default Paging;
