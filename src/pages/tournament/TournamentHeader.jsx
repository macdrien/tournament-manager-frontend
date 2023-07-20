import PropTypes from "prop-types";

const TournamentHeader = (props) => {
  const { name } = props;

  return <div className="tournamentHeader">{name}</div>;
};

TournamentHeader.propTypes = {
  name: PropTypes.string.isRequired,
};

export default TournamentHeader;
