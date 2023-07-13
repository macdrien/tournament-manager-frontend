import PropTypes from "prop-types";

const Match = function (props) {
  const { match } = props;
  const { teams } = match;

  return (
    <>
      <div className="match">
        <div>{teams[0]}</div>
        <button className="vs" disabled={!(teams[0] && teams[1])}>
          VS
        </button>
        <div>{teams[1]}</div>
      </div>
    </>
  );
};

Match.propTypes = {
  match: PropTypes.shape({
    teams: PropTypes.arrayOf(PropTypes.string),
    result: PropTypes.arrayOf(PropTypes.number),
  }),
};

export default Match;
