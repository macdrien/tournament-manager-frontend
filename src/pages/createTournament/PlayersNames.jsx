import {useState, useEffect} from 'react';
import PropTypes from "prop-types";

import { findDuplicates } from '../../utils.js';

const PlayersNames = (props) => {
  const { players, onChange, playersCount } = props;
  const [state, setState] = useState({ duplicates: [] });

  const analysePlayers = () => {
    setState({ duplicates: findDuplicates(players) });
  }

  useEffect(() => {
    analysePlayers();
  }, []);

  return (
    <div className="playersNames">
      <p className="title">Noms des joueurs</p>
      <div className='selectorDiv'>
        {players.slice(0, playersCount).map((player, index) => (
          <input
            key={index}
            className={`${state.duplicates.length && state.duplicates.includes(player) ? 'error' : ''}`}
            type="text"
            name={`players[${index}]`}
            value={player}
            onChange={(event) => { onChange(index, event.target.value); analysePlayers(); }}
            placeholder={["Joueur ", index + 1].join(" ")}
          />
        ))}
      </div>
    </div>
  );
};

PlayersNames.propTypes = {
  players: PropTypes.arrayOf(PropTypes.string).isRequired,
  onChange: PropTypes.func.isRequired,
  playersCount: PropTypes.number.isRequired,
};

export default PlayersNames;
