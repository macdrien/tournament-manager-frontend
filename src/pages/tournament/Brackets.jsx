import PropTypes from "prop-types";
import Round from "./Round";
import Connectors from "./Connectors";

const Brackets = (props) => {
  const { brackets } = props;

  if (brackets?.length) {
    const height =
      (64 + 16) * brackets[0].length + 16 * (brackets[0].length - 1);
    console.log(height);
    return (
      <div className="brackets">
        {brackets.map((round, roundIndex) => {
          const matchGap = [
            80 * roundIndex +
              (roundIndex > 1 ? 80 * (roundIndex - 1) : 0) +
              16 * Math.pow(2, roundIndex),
            "px",
          ].join("");
          const connectorGap = [
            80 * (roundIndex + 1) + 16 * Math.pow(2, roundIndex),
            "px",
          ].join("");
          return (
            <div
              className="round"
              key={"roundIndex" + roundIndex}
              style={{ height: height }}
            >
              <Round round={round} gap={matchGap} />
              {roundIndex !== brackets.length - 1 && (
                <Connectors
                  roundSize={round.length}
                  round={roundIndex}
                  gap={connectorGap}
                />
              )}
            </div>
          );
        })}
      </div>
    );
  } else {
    return <div>No match right now</div>;
  }
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
