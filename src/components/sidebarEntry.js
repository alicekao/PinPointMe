import React from 'react';

const SideBarEntry = ({name, onClick, count}) => (
  <a
    onClick={ onClick }
    href="#"
    className="list-group-item list-group-item-action"
  >
    {name}
    <span className="tag tag-default tag-pill pull-xs-right">{count}</span>
  </a>
);

export default SideBarEntry;