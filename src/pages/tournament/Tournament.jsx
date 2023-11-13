import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { cloneDeep } from "lodash";

import "./Tournament.css";
import Teams from "./Teams.jsx";
import Brackets from "./brackets/Brackets.jsx";
import NextMatch from "./NextMatch.jsx";

const loaderTournament = async ({ request }) => {
  const url = new URL(request.url);
  const tournament = JSON.parse(url.searchParams.get("tournament"));
  return { tournament };
};

const Tournament = () => {
  const { tournament } = useLoaderData();

  const [state, setState] = useState({ brackets: [], teamsOpen: false, });
  const [nextMatch, setNextMatch] = useState(null);

  useEffect(() => {
    if (tournament?.brackets) {
      setState({ ...state, brackets: tournament.brackets });
    }
  }, []);

  useEffect(() => {
    setNextMatch(findNextMatch());
  }, [state.brackets]);

  const onMatchDone = (round, matchIndex, match) => {
    const brackets = cloneDeep(state.brackets);
    match.matchDone = true;
    brackets[round][matchIndex] = match;

    const biggerScoreIndex = match.result[0] > match.result[1] ? 0 : 1;
    if (round < brackets.length - 1) {
      const newPosition = matchIndex / 2;
      const newMatchIndex = Number.parseInt(newPosition);
      const newTeamIndex = Number.isInteger(newPosition) ? 0 : 1;
      brackets[round + 1][newMatchIndex].teams[newTeamIndex] = match.teams[biggerScoreIndex];
    }

    setState({brackets});
  }

  const onTeamsDisplayClick = () => {
    setState({ ...state, teamsOpen: !state.teamsOpen });
  }

  const findNextMatch = () => {
    for (let roundCounter = 0; roundCounter < state.brackets.length; roundCounter++) {
      const round = state.brackets[roundCounter];
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
    <div className="tournament">
      <div className="tournamentHeader">
        { tournament.playersPerTeam !== 1 && <button className={ state.teamsOpen ? "teamsDisplay open" : "teamsDisplay" } onClick={onTeamsDisplayClick} >Equipes</button> }
        {name}
      </div>

      <div className="tournamentPlanning">
        {state.teamsOpen ? <Teams teams={tournament.teams} /> : <Brackets brackets={state.brackets} nextMatch={nextMatch} />}
        { nextMatch && <>
          <div className="planningSeparator"></div>
          <NextMatch nextMatch={nextMatch} onMatchDone={onMatchDone} />
        </> }
      </div>
    </div>
  );
};

export { loaderTournament };

export default Tournament;
