import PropTypes from "prop-types";

const Brackets = (props) => {
  const { brackets } = props;
  console.log(brackets);

  return <div className="brackets">brackets</div>;
};

Brackets.propTypes = {
  brackets: PropTypes.arrayOf(
    PropTypes.arrayOf(
      PropTypes.shape({
        teams: PropTypes.arrayOf(PropTypes.string),
        result: PropTypes.arrayOf(PropTypes.number),
      })
    )
  ),
};

export default Brackets;
