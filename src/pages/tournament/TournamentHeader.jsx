import PropTypes from "prop-types";

const TournamentHeader = (props) => {
  const { name, onTeamsDisplayClick, teamsOpen } = props;

  return <div className="tournamentHeader">
    <button className={ teamsOpen ? "teamsDisplay open" : "teamsDisplay" } onClick={_e => onTeamsDisplayClick()} >Equipes</button>
    {name}
  </div>;
};

TournamentHeader.defaultProps = {
  teamsOpen: false,
}

TournamentHeader.propTypes = {
  name: PropTypes.string.isRequired,
  onTeamsDisplayClick: PropTypes.func.isRequired,
  teamsOpen: PropTypes.bool,
};

export default TournamentHeader;
