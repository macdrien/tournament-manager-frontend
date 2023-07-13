import PropTypes from "prop-types";

const NextMatch = (props) => {
  const { match } = props;
  const { teams } = match;

  return (
    <div className="nextMatch">
      <div className="nextMatchTeam">{teams[0]}</div>
      <input
        type="number"
        className="nextMatchScoreInput"
        value={match.result && match.result[0] ? match.result[0] : null}
      />
      <div className="nextMatchVs">VS</div>
      <input
        type="number"
        className="nextMatchScoreInput"
        value={match.result && match.result[0] ? match.result[1] : null}
      />
      <div className="nextMatchTeam">{teams[1]}</div>
    </div>
  );
};

NextMatch.propTypes = {
  match: PropTypes.shape({
    teams: PropTypes.arrayOf(PropTypes.string),
    result: PropTypes.arrayOf(PropTypes.number),
  }),
};

export default NextMatch;
