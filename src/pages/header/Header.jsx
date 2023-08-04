import PropTypes from "prop-types";
import "./Header.css";

const Header = (props) => {
  const { title, onThemeChange, darkTheme } = props;
  return (
    <header>
      <h1>Tournament manager</h1>
      <h2>{title}</h2>
      <div className='toggleTheme'>
        <label>
          <input type='checkbox' value={darkTheme} onChange={onThemeChange}/>
          <span className='slider'></span>
        </label>
      </div>
    </header>
  );
};

Header.propTypes = {
  title: PropTypes.string,
  onThemeChange: PropTypes.func.isRequired,
  darkTheme: PropTypes.bool.isRequired,
};

export default Header;
