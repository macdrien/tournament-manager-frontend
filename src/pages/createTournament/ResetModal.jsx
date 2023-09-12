import PropTypes from 'prop-types';
import Modal from "../../components/Modal/Modal";
import { useState } from 'react';
import Checkbox from '../../components/Checkbox/Checkbox';

const ResetModal = (props) => {
  const {
    canResetName,
    canResetTeams,
    canResetPlayers,
    cancelReset,
    validateReset,
  } = props;

  const [state, setState] = useState({
    resetNameChecked: true,
    resetTeamsChecked: true,
    resetPlayersChecked: true,
  });

  const toggleResetNameChecked = () => {
    setState({ ...state, resetNameChecked: !state.resetNameChecked });
  }

  const toggleResetTeamsChecked = () => {
    setState({ ...state, resetTeamsChecked: !state.resetTeamsChecked });
  }

  const toggleResetPlayersChecked = () => {
    setState({ ...state, resetPlayersChecked: !state.resetPlayersChecked });
  }

  const modalBody = <div className='resetModalBody'>
    <p>Que voulez-vous réinitialiser ?</p>
    { canResetName ? <Checkbox
      checked={state.resetNameChecked} 
      text="Nom du tournoi" 
      toggle={toggleResetNameChecked}
    /> : '' }
    { canResetTeams ? <Checkbox
      checked={state.resetTeamsChecked} 
      text="Noms des équipes" 
      toggle={toggleResetTeamsChecked}
    /> : '' }
    { canResetPlayers ? <Checkbox
      checked={state.resetPlayersChecked} 
      text="Noms des joueurs" 
      toggle={toggleResetPlayersChecked}
    /> : '' }
  </div>;

  return <Modal
    title="Validation"
    body={modalBody}
    onValidate={validateReset}
    onCancel={cancelReset}
  />;
}

ResetModal.defaultProps = {
  canResetName: false,
  canResetTeams: false,
  canResetPlayers: false,
}

ResetModal.propTypes = {
  cancelReset: PropTypes.func.isRequired,
  validateReset: PropTypes.func.isRequired,
}

export default ResetModal;