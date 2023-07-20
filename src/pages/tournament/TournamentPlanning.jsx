import PropTypes from "prop-types";
import Brackets from "./brackets/Brackets";
import NextMatch from "./NextMatch";
import { useEffect, useState } from "react";

const TournamentPlanning = (props) => {
  const { brackets, onMatchDone } = props;

  const [nextMatch, setNextMatch] = useState(null);

  useEffect(() => {
    setNextMatch(findNextMatch());
  }, [brackets]);

  const findNextMatch = () => {
    for (let roundCounter = 0; roundCounter < brackets.length; roundCounter++) {
      const round = brackets[roundCounter];
      for (let matchCounter = 0; matchCounter < round.length; matchCounter++) {
        const match = round[matchCounter];
        if (!match?.matchDone) {
          return { round: roundCounter, matchIndex: matchCounter, match };
        }
      }
    }
  };

  return (
    brackets.length && (
      <div className="tournamentPlanning">
        <Brackets brackets={brackets} />
        <div className="planningSeparator"></div>
        <NextMatch nextMatch={nextMatch} onMatchDone={onMatchDone} />
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
  onMatchDone: PropTypes.func.isRequired,
};

export default TournamentPlanning;
