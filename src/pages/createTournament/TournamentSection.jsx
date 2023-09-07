import PropTypes from "prop-types";
import { useState } from "react";
import Modal from "../../components/Modal/Modal";

const TournamentSection = (props) => {
  const {
    tournamentName,
    onTournamentNameChange,
    onResetClick,
    isGenerationEnable,
    isFormEmpty,
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

  const validateReset = (event) => {
    event.preventDefault();
    onResetClick(true, true, true);
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
        <Modal
          title="Validation"
          body="Es-tu sûr de vouloir supprimer tout ce que tu as saisis ?"
          onValidate={validateReset}
          onCancel={cancelReset}
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
};

export default TournamentSection;
