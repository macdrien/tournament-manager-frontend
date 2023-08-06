import PropTypes from "prop-types";
import Match from "./Match";

const Round = (props) => {
  const { round, gap, nextMatch } = props;

  return round ? (
    <div className="pool" style={{ gap: gap }}>
      {round.map((match, matchIndex) => (
        <Match match={match} key={matchIndex} isNextMatch={nextMatch && match?.teams[0]?.name === nextMatch.match.teams[0]?.name && match.teams[1]?.name === nextMatch.match.teams[1]?.name}/>
      ))}
    </div>
  ) : '';
};

Round.propTypes = {
  round: PropTypes.arrayOf(PropTypes.object),
  gap: PropTypes.string,
  nextMatch: PropTypes.shape({
    round: PropTypes.number,
    matchIndex: PropTypes.number,
    match: PropTypes.shape({
      teams: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string.isRequired,
        players: PropTypes.arrayOf(PropTypes.string),
      })),
      result: PropTypes.arrayOf(PropTypes.number),
    }),
  }),
};

export default Round;
