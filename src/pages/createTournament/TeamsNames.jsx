import { useState, useEffect } from 'react';
import PropTypes from "prop-types";

import { findDuplicates } from '../../utils.js';

const TeamsNames = (props) => {
  const { teams, onChange, teamsCount } = props;
  const [state, setState] = useState({ duplicates: [] });

  const analyseTeams = () => {
    setState({ duplicates: findDuplicates(teams) });
  }

  useEffect(() => {
    analyseTeams();
  }, []);

  return (
    <div className="teamsNames">
      <p className="title">Noms des équipes</p>
      <div className='selectorDiv'>
        {teams.slice(0, teamsCount).map((team, index) => (
          <input
            key={index}
            type="text"
            className={`${state.duplicates.length && state.duplicates.includes(team) ? 'error' : ''}`}
            name={`teams[${index}]`}
            value={team}
            onChange={(event) => { onChange(index, event.target.value); analyseTeams(); }}
            placeholder={["Equipe", index + 1].join(" ")}
          />
        ))}
      </div>
    </div>
  );
};

TeamsNames.propTypes = {
  teams: PropTypes.arrayOf(PropTypes.string).isRequired,
  onChange: PropTypes.func.isRequired,
  teamsCount: PropTypes.number.isRequired,
};

export default TeamsNames;
