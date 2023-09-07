import PropTypes from 'prop-types';
import Modal from "../../components/Modal/Modal";

const ResetModal = (props) => {
  const { cancelReset, validateReset } = props;

  return <Modal
    title="Validation"
    body="Es-tu sûr de vouloir supprimer tout ce que tu as saisis ?"
    onValidate={validateReset}
    onCancel={cancelReset}
  />;
}

ResetModal.propTypes = {
  cancelReset: PropTypes.func.isRequired,
  validateReset: PropTypes.func.isRequired,
}

export default ResetModal;