import PropTypes from "prop-types";

const TournamentSection = (props) => {
  const {
    tournamentName,
    onTournamentNameChange,
    onCreateTournament,
    onResetClick,
    isGenerationEnable,
    isFormEmpty,
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

      <button onClick={(event) => onResetClick(event)} disabled={isFormEmpty}>
        Reset
      </button>
    </div>
  );
};

TournamentSection.propTypes = {
  tournamentName: PropTypes.string.isRequired,
  onTournamentNameChange: PropTypes.func.isRequired,
  onCreateTournament: PropTypes.func.isRequired,
  onResetClick: PropTypes.func.isRequired,
  isGenerationEnable: PropTypes.bool.isRequired,
  isFormEmpty: PropTypes.bool.isRequired,
};

export default TournamentSection;
