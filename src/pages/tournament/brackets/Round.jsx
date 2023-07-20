import PropTypes from "prop-types";
import Match from "./Match";

const Round = (props) => {
  const { round, gap, nextMatch } = props;
  return round && nextMatch ? (
    <div className="pool" style={{ gap: gap }}>
      {round.map((match, matchIndex) => (
        <Match match={match} key={matchIndex} isNextMatch={match.teams[0] === nextMatch.match.teams[0] && match.teams[1] === nextMatch.match.teams[1]}/>
        )
      )}
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
      teams: PropTypes.arrayOf(PropTypes.string),
      result: PropTypes.arrayOf(PropTypes.number),
    }),
  }),
};

export default Round;
