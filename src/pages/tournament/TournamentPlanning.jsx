import PropTypes from "prop-types";
import Brackets from "./brackets/Brackets";
import NextMatch from "./NextMatch";

const TournamentPlanning = (props) => {
  const { brackets, onScoreChange } = props;

  const findNextMatch = () => {
    for (let counter = 0; counter < brackets.length; counter++) {
      const round = brackets[counter];
      for (let roundCounter = 0; roundCounter < round.length; roundCounter++) {
        const match = round[roundCounter];
        if (!match?.matchDone) {
          return { match };
        }
      }
    }
  };

  return (
    brackets.length && (
      <div className="tournamentPlanning">
        <Brackets brackets={brackets} />
        <div className="planningSeparator"></div>
        <NextMatch nextMatch={findNextMatch()} onScoreChange={onScoreChange} />
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
        matchDone: PropTypes.bool.isRequired,
      })
    )
  ),
  onScoreChange: PropTypes.func.isRequired,
};

export default TournamentPlanning;
