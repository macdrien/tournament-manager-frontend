import PropTypes from "prop-types";

const Connector = function (props) {
  const { style } = props;
  return <div className="connector" style={style}></div>;
};

Connector.propTypes = {
  style: PropTypes.shape({
    height: PropTypes.string,
  }),
};

const Connectors = function (props) {
  const { roundSize, round, gap } = props;
  const connectors = [];
  for (let counter = 0; counter < roundSize / 2; counter++) {
    connectors.push(
      <Connector
        key={"connector" + counter}
        style={{ height: [96 * Math.pow(2, round), "px"].join("") }}
      />
    );
  }

  return (
    <div className="connectors" style={{ gap: gap }}>
      {connectors}
    </div>
  );
};

Connectors.propTypes = {
  roundSize: PropTypes.number,
  round: PropTypes.number,
  gap: PropTypes.string,
};

export default Connectors;
