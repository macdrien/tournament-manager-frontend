import PropTypes from "prop-types";

const NextMatch = (props) => {
  const { nextMatch, onScoreChange } = props;
  const { teams } = nextMatch.match;

  return (
    <div className="nextMatch">
      <div className="nextMatchTeam">{teams[0]}</div>
      <input
        type="number"
        className="nextMatchScoreInput"
        value={nextMatch.match.result[0]}
        onChange={(event) => onScoreChange(event.target.valueAsNumber, 0)}
      />
      <div className="nextMatchVs">VS</div>
      <input
        type="number"
        className="nextMatchScoreInput"
        value={nextMatch.match.result[1]}
        onChange={(event) => onScoreChange(event.target.valueAsNumber, 1)}
      />
      <div className="nextMatchTeam">{teams[1]}</div>
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
  onScoreChange: PropTypes.func.isRequired,
};

export default NextMatch;
