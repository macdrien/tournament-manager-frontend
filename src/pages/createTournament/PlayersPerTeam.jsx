import React from 'react';
import PropTypes from 'prop-types';

const PlayersPerTeam = (props) => {
  const { onPlayersPerTeamChange, playersPerTeam } = props;

  return <div className='playersPerTeamSelection'>
    <p className='title'>Combien de joueurs
      <br/>
      par équipe ?
    </p>
    <div className="selectorDiv">
      <input
        type="number"
        name="playersPerTeam"
        value={playersPerTeam}
        min={1}
        max={10}
        onChange={event => {
          const valueAsNumber = event.target.valueAsNumber;
          return onPlayersPerTeamChange(Number.isNaN(valueAsNumber) ? 0 : valueAsNumber);
        }}/>
    </div>
  </div>;
}

PlayersPerTeam.propTypes = {
  onPlayersPerTeamChange: PropTypes.func.isRequired,
  playersPerTeam: PropTypes.number.isRequired,
};

PlayersPerTeam.defaultProps = {
  playersPerTeam: 1,
}

export default PlayersPerTeam;