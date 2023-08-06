import PropTypes from "prop-types";

const Match = function (props) {
  const { match, isNextMatch } = props;
  const { teams } = match;

  return (
    <>
      <div className={`match ${isNextMatch ? 'isNextMatch' : ''}`}>
        <div className="teamSection">
          <div>{teams[0]?.name}</div>
          {match.matchDone ?
              <div className="teamScore">
                {match.result[0] > match.result[1] ? <div>&#9819;</div> : ''}
                {match.result[0]}
              </div>
            : ''}
          </div>
        <div className="matchSeparator"></div>
        <button className="vs" disabled={!(teams[0] && teams[1])}>
          VS
        </button>
        <div className="teamSection">
          <div>{teams[1]?.name}</div>
          {match.matchDone ?
              <div className="teamScore">
                {match.result[1] > match.result[0] ? <div>&#9819;</div> : ''}
                {match.result[1]}
              </div>
            : ''}
        </div>
      </div>
    </>
  );
};

Match.propTypes = {
  match: PropTypes.shape({
    teams: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string.isRequired,
      players: PropTypes.arrayOf(PropTypes.string),
    })),
    result: PropTypes.arrayOf(PropTypes.number),
    matchDone: PropTypes.bool,
  }),
  isNextMatch: PropTypes.bool
};

export default Match;
