import React from "react";
import Card from "./Card";
// import { ReactComponent as MyIcon } from "../svgtopng/"; // Import the SVG as a React component
import Lowlogo from "./icons_FEtask/Img - Low Priority.svg";
import Mediumlogo from "./icons_FEtask/Img - Medium Priority.svg";
import Highlogo from "./icons_FEtask/Img - High Priority.svg";
import Urgentlogo from "./icons_FEtask/SVG - Urgent Priority colour.svg";
import NoLogo from "./icons_FEtask/No-priority.svg";
import AddLogo from "./icons_FEtask/add.svg";
import threeDotLogo from "./icons_FEtask/3 dot menu.svg";
import todo from "./icons_FEtask/To-do.svg";
import inprogress from "./icons_FEtask/in-progress.svg";
import backlog from "./icons_FEtask/Backlog.svg";

const Column = ({ title, group, tickets }) => {
  console.log("printing title: ", title);
  console.log("printing tickets: ", tickets);

  let term;
  let logo;

  // Determine the term and logo based on the title
  if (title == 1) {
    term = "Low";
    logo = Lowlogo;
  }
  if (title == 2) {
    term = "Medium";
    logo = Mediumlogo;
  }
  if (title == 3) {
    term = "High";
    logo = Highlogo;
  }
  if (title == 4) {
    term = "Urgent";
    logo = Urgentlogo; // No image assigned for "Urgent" in the current setup
  }

  if (title == "No priority") {
    logo = NoLogo;
  }

  if (title == "Todo") {
    logo = todo;
  }

  if (title == "In progress") {
    logo = inprogress;
  }

  if (title == "Backlog") {
    logo = backlog;
  }

  // Count the number of tickets
  const cardCount = tickets.length;

  return (
    <div className="column">
      <div className="column-headers">
        <div className="left-main">
          {/* Display the logo */}
          {logo && <img src={logo} alt={`${term} Priority`} />}

          {/* Display title, term, and card count */}
          <h2>
            {title} {term} {cardCount}
          </h2>
        </div>

        <div className="right-main">
          {/* + */}
          <img src={AddLogo} alt="" />

          {/* ... */}
          <img src={threeDotLogo} alt="" />
        </div>
      </div>

      {/* Display each card */}
      {tickets.map((ticket) => (
        <Card key={ticket.id} ticket={ticket} />
      ))}
    </div>
  );
};

export default Column;