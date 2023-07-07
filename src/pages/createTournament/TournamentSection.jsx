import PropTypes from "prop-types";

const TournamentSection = (props) => {
  const {
    tournamentName,
    onTournamentNameChange,
    onCreateTournament,
    isGenerationEnable,
  } = props;

  return (
    <div className="tournamentSection">
      <input
        type="text"
        value={tournamentName}
        onChange={(event) => onTournamentNameChange(event.target.value)}
        placeholder="Tournament name"
      />
      <button onClick={onCreateTournament} disabled={!isGenerationEnable}>
        Generate
      </button>
    </div>
  );
};

TournamentSection.propTypes = {
  tournamentName: PropTypes.string.isRequired,
  onTournamentNameChange: PropTypes.func.isRequired,
  onCreateTournament: PropTypes.func.isRequired,
  isGenerationEnable: PropTypes.bool.isRequired,
};

export default TournamentSection;
