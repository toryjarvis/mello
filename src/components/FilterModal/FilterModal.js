import React, { useState, useEffect, useContext } from "react";
// new imports for after the postgres migration

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { ThemeContext } from "../../contexts/ThemeContext";
import CloseIcon from "@mui/icons-material/Close";

import "./FilterModal.css";

const FilterModal = ({ isOpen, onClose }) => {
  const [filterText, setFilterText] = useState("");
  const [status, setStatus] = useState("all");
  const [lastChanged, setLastChanged] = useState("all");
  const [creationDate, setCreationDate] = useState("all");
  //   const [team, setTeam] = useState("");
  const [starred, setStarred] = useState("all");
  const { currentTheme } = useContext(ThemeContext);

  useEffect(() => {
    if (isOpen) {
      setFilterText("");
      setStatus("all");
      setLastChanged("all");
      setCreationDate("all");
      //   setTeam("");
      setStarred("all");
    }
  }, [isOpen]);

  //   const handleApplyFilter = () => {
  //     handleApplyFilter(filterText);
  //     onClose();
  //   };

  if (!isOpen) return null;

  return (
    <div className="filter-modal-overlay" aria-modal="true" role="dialog">
      <div
        className={`filter-modal ${currentTheme}`}
        data-testid="filter-modal"
      >
        <div className="filter-modal-header">
          <h2>Filter Boards</h2>
          <Button onClick={onClose}>
            <CloseIcon />
          </Button>
        </div>
        <div className="filter-modal-body">
          <div className="filter-options">
            {/* Text input for board name (soft search) */}
            <TextField
              label="Filter By Board Name"
              variant="outlined"
              value={filterText}
              onChange={(e) => setFilterText(e.target.value)}
            />
            {/* Radio buttons for status (active, archived, default) */}
            <div className="filter-status-radio-group">
              <label>Status:</label>
              <label>
                <input
                  type="radio"
                  value="active"
                  checked={status === "active"}
                  onChange={(e) => setStatus(e.target.value)}
                />
                Active
              </label>
              <label>
                <input
                  type="radio"
                  value="archived"
                  checked={status === "archived"}
                  onChange={(e) => setStatus(e.target.value)}
                />
                Archived
              </label>
              <label>
                <input
                  type="radio"
                  value="all"
                  checked={status === "all"}
                  onChange={(e) => setStatus(e.target.value)}
                />
                All
              </label>
            </div>
            {/* Radio buttons for starred vs unstarred */}
            <div className="filter-starred-radio-group">
              <label>Starred:</label>
              <label>
                <input
                  type="radio"
                  value="starred"
                  checked={starred === "starred"}
                  onChange={(e) => setStarred(e.target.value)}
                />
                Starred
              </label>
              <label>
                <input
                  type="radio"
                  value="unstarred"
                  checked={starred === "unstarred"}
                  onChange={(e) => setStarred(e.target.value)}
                />
                Unstarred
              </label>
            </div>
            {/* Drop down for last changed (last week, last month, last year) */}
            <div className="filter-last-changed-dropdown">
              <label>Last Changed:</label>
              <select
                value={lastChanged}
                onChange={(e) => setLastChanged(e.target.value)}
              >
                <option value="all">All</option>
                <option value="last-week">Last Week</option>
                <option value="last-month">Last Month</option>
                <option value="last-year">Last Year</option>
              </select>
            </div>
            {/* Drop down for creation date (last week, last month, last year) */}
            <div className="filter-creation-date-dropdown">
              <label>Creation Date:</label>
              <select
                value={creationDate}
                onChange={(e) => setCreationDate(e.target.value)}
              >
                <option value="all">All</option>
                <option value="last-week">Last Week</option>
                <option value="last-month">Last Month</option>
                <option value="last-year">Last Year</option>
              </select>
            </div>
            {/* text input for team (codes?) commented out for now, future enterprise idea
          <div className="filter-team-input">
            <label>Team:</label>
            <TextField
              label="Filter By Team"
              variant="outlined"
              value={team}
              onChange={(e) => setTeam(e.target.value)}
            />
          </div> */}
          </div>
        </div>
        <div className="filter-modal-footer">
          <Button
            variant="contained"
            onClick={() => console.log("Filter applied: ", filterText)}
          >
            Apply Filter
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FilterModal;
