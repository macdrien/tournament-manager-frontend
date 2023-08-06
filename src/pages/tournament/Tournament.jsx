import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { random } from "../../utils/math";
import { cloneDeep } from "lodash";
import TournamentHeader from "./TournamentHeader";

import "./Tournament.css";
import TournamentPlanning from "./TournamentPlanning";

const loaderTournament = async ({ request }) => {
  const url = new URL(request.url);
  const tournament = JSON.parse(url.searchParams.get("tournament"));
  return { tournament };
};

const Tournament = () => {
  const { tournament } = useLoaderData();
  const [state, setState] = useState({ brackets: [], teamsOpen: false, });

  useEffect(() => {
    const teamsBuffer = cloneDeep(tournament.teams);
    const brackets = [];
    const round0 = [];

    // Duels selection
    while (teamsBuffer.length) {
      const match = { teams: [], result: [0, 0], matchDone: false };

      const firstIndex = random(teamsBuffer.length);
      match.teams.push(teamsBuffer[firstIndex]);
      teamsBuffer.splice(firstIndex, 1);

      const secondIndex = random(teamsBuffer.length);
      match.teams.push(teamsBuffer[secondIndex]);
      teamsBuffer.splice(secondIndex, 1);

      round0.push(match);
    }

    brackets.push(round0);

    for (let counter = tournament.teams.length / 2; counter > 1; counter /= 2) {
      const round = [];
      for (let bracket = 0; bracket < counter / 2; bracket++) {
        round.push({ teams: [], result: [0, 0], matchDone: false });
      }
      brackets.push(round);
    }

    setState({ brackets });
  }, []);

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

  return (
    <div className="tournament">
      <TournamentHeader name={tournament.name} onTeamsDisplayClick={onTeamsDisplayClick} teamsOpen={state.teamsOpen} />
      <TournamentPlanning brackets={state.brackets} teams={tournament.teams} onMatchDone={onMatchDone} teamsOpen={state.teamsOpen} />
    </div>
  );
};

export { loaderTournament };

export default Tournament;
