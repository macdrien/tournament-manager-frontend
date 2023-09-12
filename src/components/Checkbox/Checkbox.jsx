import PropTypes from 'prop-types';
import './Checkbox.css';

const Checkbox = (props) => {
    const { checked, text, toggle } = props;

    return <div className='checkbox' onClick={toggle}>
        <input
        type="checkbox"
        name="text"
        checked={checked}
        onChange={toggle}
        />
        {text ? <label htmlFor='text'>{text}</label> : ''}
    </div>;
};

Checkbox.defaultProps = {
    checked: false,
};

Checkbox.propTypes = {
    checked: PropTypes.bool,
    text: PropTypes.string,
    toggle: PropTypes.func.isRequired,
};

export default Checkbox;