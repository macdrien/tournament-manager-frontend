import PropTypes from "prop-types";
import Round from "./Round";
import Connectors from "./Connectors";

const Brackets = (props) => {
  const { brackets, nextMatch } = props;

  const winnerName = () => {
    const lastMatch = brackets[brackets.length - 1][0];
    return lastMatch.teams[lastMatch.result[0] > lastMatch.result[1] ? 0 : 1];
  }

  if (brackets?.length) {
    const height =
      (64 + 16) * brackets[0].length + 16 * (brackets[0].length - 1);

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
              <Round round={round} gap={matchGap} nextMatch={nextMatch} />
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
        {!nextMatch && <div className="winner">The winner is &#9819;<span>{winnerName()}</span>&#9819;</div>}
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
  nextMatch: PropTypes.shape({
    round: PropTypes.number,
    matchIndex: PropTypes.number,
    match: PropTypes.shape({
      teams: PropTypes.arrayOf(PropTypes.string),
      result: PropTypes.arrayOf(PropTypes.number),
    }),
  }),
};

export default Brackets;
