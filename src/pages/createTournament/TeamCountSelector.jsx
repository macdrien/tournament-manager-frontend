import React from "react";

const TeamsCountSelector = (props) => {
    const {options, checkedValue, changeSelection} = props;

    return <div className="teamsCountSection">
    <p>
      How many teams
      <br />
      do you want?
    </p>
    <div className="teamsCountSelection">
      {options.map((option) => (
        <React.Fragment key={option}>
          <input
            type="radio"
            name="teamsNumber"
            value={option}
            checked={option === checkedValue}
            onChange={(event) => changeSelection(Number.parseInt(event.target.value))}
          />
          <label htmlFor={option}>{option}</label>
        </React.Fragment>
      ))}
    </div>
  </div>;
}

export default TeamsCountSelector;