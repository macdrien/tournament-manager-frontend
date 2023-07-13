import PropTypes from "prop-types";

const Match = function (props) {
  const { teams } = props;
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
  teams: PropTypes.arrayOf(PropTypes.string),
};

export default Match;
