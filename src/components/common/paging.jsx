import React from "react";
import _ from "lodash";
import PropTypes from "prop-types";

const Paging = props => {
  const { totalItems, pageSize, selectedPage, onPageSelected } = props;

  const pagesCount = Math.ceil(totalItems / pageSize);
  const pages = _.range(1, pagesCount + 1);

  if (parseInt(pagesCount) === 1) return null;

  return (
    <nav aria-label="Paging area">
      <ul className="pagination">
        {pages.map(page => (
          <li
            key={page}
            className={selectedPage === page ? "page-item active" : "page-item"}
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
    </nav>
  );
};

Paging.propTypes = {
  totalItems: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  selectedPage: PropTypes.number.isRequired,
  onPageSelected: PropTypes.func.isRequired
};

export default Paging;
