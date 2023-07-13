import PropTypes from "prop-types";
import Match from "./Match";

const Round = (props) => {
  const { round, gap } = props;
  return (
    <div className="pool" style={{ gap: gap }}>
      {round.map((match, matchIndex) => (
        <Match match={match} key={matchIndex} />
      ))}
    </div>
  );
};

Round.propTypes = {
  round: PropTypes.arrayOf(PropTypes.object),
};

export default Round;
