import PropTypes from "prop-types";
import "./Header.css";

const Header = (props) => {
  const { title } = props;
  return (
    <header>
      <h1>Tournament manager</h1>
      <h2>{title}</h2>
    </header>
  );
};

Header.propTypes = {
  title: PropTypes.string,
};

export default Header;
