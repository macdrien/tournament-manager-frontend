import PropTypes from "prop-types";
import { useEffect, useState } from "react";

const NextMatch = (props) => {
  const { nextMatch, onMatchDone } = props;

  const [match, setMatch] = useState(null);

  useEffect(() => {
    if (nextMatch) {
      setMatch(nextMatch.match);
    }
  }, [nextMatch]);

  const onScoreChange = (value, teamIndex) => {
    const result = match.result;
    result[teamIndex] = value;
    setMatch({...match, result});
  }

  return match && (
    <div className="nextMatch">
      <div className="nextMatchTeam">{match.teams[0]}</div>
      <input
        type="number"
        className="nextMatchScoreInput"
        value={match.result[0]}
        onChange={event => onScoreChange(event.target.valueAsNumber, 0)}
      />
      <div className="nextMatchVs">VS</div>
      <input
        type="number"
        className="nextMatchScoreInput"
        value={match.result[1]}
        onChange={event => onScoreChange(event.target.valueAsNumber, 1)}
      />
      <div className="nextMatchTeam">{match.teams[1]}</div>
      <button onClick={event => onMatchDone(nextMatch.round, nextMatch.matchIndex, match)}>Terminer</button>
    </div>
  );
};

NextMatch.propTypes = {
  nextMatch: PropTypes.shape({
    round: PropTypes.number,
    matchIndex: PropTypes.number,
    match: PropTypes.shape({
      teams: PropTypes.arrayOf(PropTypes.string),
      result: PropTypes.arrayOf(PropTypes.number),
    }),
  }),
  onMatchDone: PropTypes.func.isRequired,
};

export default NextMatch;
