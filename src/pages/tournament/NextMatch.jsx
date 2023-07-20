import PropTypes from "prop-types";
import { useEffect, useState } from "react";

const NextMatch = (props) => {
  const { nextMatch } = props;

  const [match, setMatch] = useState(null);

  useEffect(() => {
    console.log(nextMatch);
    setMatch(nextMatch.match);
  }, []);

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
    </div>
  );
};

NextMatch.propTypes = {
  nextMatch: PropTypes.shape({
    match: PropTypes.shape({
      teams: PropTypes.arrayOf(PropTypes.string),
      result: PropTypes.arrayOf(PropTypes.number),
    }),
  }),
};

export default NextMatch;
