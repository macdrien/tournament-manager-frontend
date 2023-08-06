import PropTypes from "prop-types";
import Brackets from "./brackets/Brackets";
import NextMatch from "./NextMatch";
import { useEffect, useState } from "react";
import Teams from "./Teams.jsx";

const TournamentPlanning = (props) => {
  const { brackets, onMatchDone, teamsOpen, teams } = props;

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
    return null;
  };

  return (
    brackets.length && (
      <div className="tournamentPlanning">
        {teamsOpen ? <Teams teams={teams} /> : <Brackets brackets={brackets} nextMatch={nextMatch} />}
        {nextMatch && <>
        <div className="planningSeparator"></div>
          <NextMatch nextMatch={nextMatch} onMatchDone={onMatchDone} />
        </>
          }
      </div>
    )
  );
};

TournamentPlanning.defaultProps = {
  teamsOpen: false,
}

TournamentPlanning.propTypes = {
  teams: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    players: PropTypes.arrayOf(PropTypes.string),
  })),
  brackets: PropTypes.arrayOf(
    PropTypes.arrayOf(
      PropTypes.shape({
        teams: PropTypes.arrayOf(PropTypes.shape({
          name: PropTypes.string.isRequired,
          players: PropTypes.arrayOf(PropTypes.string),
        })),
        result: PropTypes.arrayOf(PropTypes.number),
        matchDone: PropTypes.bool.isRequired,
      })
    )
  ),
  onMatchDone: PropTypes.func.isRequired,
  teamsOpen: PropTypes.bool,
};

export default TournamentPlanning;
