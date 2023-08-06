import React from "react";
import PropTypes from 'prop-types';

const TeamsNumber = (props) => {
    const { teamCountOptions, checkedNumberOfTeams, changeTeamCountSelection } = props;

    return <div className="teamsCountSelection">
      <p className="title">
        Combien d'équipes
        <br />
        veux-tu?
      </p>
      <div className="selectorDiv">
        <div>
          {teamCountOptions.map((option) => (
            <React.Fragment key={option}>
              <input
                type="radio"
                name="teamsNumber"
                value={option}
                checked={option === checkedNumberOfTeams}
                onChange={(event) => {
                  const valueAsNumber = Number.parseInt(event.target.value);
                  return changeTeamCountSelection(Number.isNaN(valueAsNumber) ? 0 : valueAsNumber);
                }}
              />
              <label htmlFor={option}>{option}</label>
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>;
}

TeamsNumber.propTypes = {
  teamCountOptions: PropTypes.array.isRequired,
  checkedNumberOfTeams: PropTypes.number.isRequired,
  changeTeamCountSelection: PropTypes.func.isRequired,
};

export default TeamsNumber;