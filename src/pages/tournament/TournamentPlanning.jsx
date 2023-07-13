import PropTypes from "prop-types";
import Brackets from "./brackets/Brackets";
import NextMatch from "./NextMatch";

const TournamentPlanning = (props) => {
  const { brackets } = props;
  console.log(brackets);

  const findNextMatch = () => {
    let nextMatch;
    for (const round of brackets) {
      console.log("round", round);
      for (const match of round) {
        console.log("match", match);
        if (!match?.result?.filter((score) => !!score)?.length) {
          return match;
        }
      }
    }
  };

  return (
    brackets.length && (
      <div className="tournamentPlanning">
        <Brackets brackets={brackets} />
        <div className="planningSeparator"></div>
        <NextMatch match={findNextMatch()} />
      </div>
    )
  );
};

TournamentPlanning.propTypes = {
  brackets: PropTypes.arrayOf(
    PropTypes.arrayOf(
      PropTypes.shape({
        teams: PropTypes.arrayOf(PropTypes.string),
        result: PropTypes.arrayOf(PropTypes.number),
      })
    )
  ),
};

export default TournamentPlanning;
