import PropTypes from "prop-types";
import { useState } from "react";
import Modal from "../../components/Modal/Modal";

const TournamentSection = (props) => {
  const {
    tournamentName,
    onTournamentNameChange,
    onResetClickProp,
    isGenerationEnable,
    isFormEmpty,
  } = props;

  const [state, setState] = useState({ isModalOpen: false });

  const onResetClick = (event) => {
    event.preventDefault();
    setState({ isModalOpen: true });
  };

  const cancelReset = (event) => {
    event.preventDefault();
    setState({ isModalOpen: false });
  };

  const validateReset = (event) => {
    event.preventDefault();
    onResetClickProp();
    setState({ isModalOpen: false });
  };

  return (
    <div className="tournamentSection">
      <input
        name="name"
        type="text"
        value={tournamentName}
        onChange={(event) => onTournamentNameChange(event.target.value)}
        placeholder="Tournament name"
      />
      <button disabled={!isGenerationEnable}>Generate</button>

      <button onClick={(event) => onResetClick(event)} disabled={isFormEmpty}>
        Reset
      </button>

      {state.isModalOpen && (
        <Modal
          title="Reset validation"
          text="Are you sure you want to reset all values?"
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
  onResetClickProp: PropTypes.func.isRequired,
  isGenerationEnable: PropTypes.bool.isRequired,
  isFormEmpty: PropTypes.bool.isRequired,
};

export default TournamentSection;
