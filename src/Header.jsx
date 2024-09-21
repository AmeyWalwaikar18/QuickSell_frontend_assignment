import React from 'react';
import './Header.css'; // Make sure to create or update this file

const Header = ({ setGroupBy, setSortBy }) => {
  return (
    <div className="header-container">
      <div className="display-options">
        <button className="display-button">
          <span className="icon">≡</span> Display ▼
        </button>
        <div className="dropdown-menu">
          <div className="grouping-options">
            <label>Grouping</label>
            <select onChange={(e) => setGroupBy(e.target.value)}>
              <option value="status">Status</option>
              <option value="user">User</option>
              <option value="priority">Priority</option>
            </select>
          </div>
          <div className="sorting-options">
            <label>Ordering</label>
            <select onChange={(e) => setSortBy(e.target.value)}>
              <option value="priority">Priority</option>
              <option value="title">Title</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
