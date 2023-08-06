import PropTypes from "prop-types";

const PlayersNames = (props) => {
  const { players, onChange, playersCount } = props;

  return (
    <div className="playersNames">
      <p className="title">Noms des joueurs</p>
      <div className='selectorDiv'>
        {players.slice(0, playersCount).map((player, index) => (
          <input
            key={index}
            type="text"
            name={`players[${index}]`}
            value={player}
            onChange={(event) => onChange(index, event.target.value)}
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
