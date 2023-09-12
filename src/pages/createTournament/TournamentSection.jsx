import PropTypes from "prop-types";
import { useState } from "react";
import ResetModal from "./ResetModal";

const TournamentSection = (props) => {
  const {
    tournamentName,
    onTournamentNameChange,
    onResetClick,
    isGenerationEnable,
    isFormEmpty,
    canResetName,
    canResetTeams,
    canResetPlayers,
  } = props;

  const [state, setState] = useState({ isModalOpen: false });

  const openModal = (event) => {
    event.preventDefault();
    setState({ isModalOpen: true });
  };

  const cancelReset = (event) => {
    event.preventDefault();
    setState({ isModalOpen: false });
  };

  const validateReset = (event, resetName, resetTeams, resetPlayers) => {
    event.preventDefault();
    onResetClick(resetName, resetTeams, resetPlayers);
    setState({ isModalOpen: false });
  };

  return (
    <div className="tournamentSection">
      <input
        name="name"
        type="text"
        value={tournamentName}
        onChange={(event) => onTournamentNameChange(event.target.value)}
        placeholder="Nom du tournoi"
      />
      <button disabled={!isGenerationEnable}>Générer</button>

      <button onClick={openModal} disabled={isFormEmpty}>
        Réinitialiser
      </button>

      {state.isModalOpen && (
        <ResetModal
          canResetName={canResetName}
          canResetTeams={canResetTeams}
          canResetPlayers={canResetPlayers}
          cancelReset={cancelReset}
          validateReset={validateReset}
        />
      )}
    </div>
  );
};

TournamentSection.propTypes = {
  tournamentName: PropTypes.string.isRequired,
  onTournamentNameChange: PropTypes.func.isRequired,
  onResetClick: PropTypes.func.isRequired,
  isGenerationEnable: PropTypes.bool.isRequired,
  isFormEmpty: PropTypes.bool.isRequired,
  canResetName: PropTypes.bool.isRequired,
  canResetTeams: PropTypes.bool.isRequired,
  canResetPlayers: PropTypes.bool.isRequired,
};

export default TournamentSection;
