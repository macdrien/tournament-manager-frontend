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
  const [state, setState] = useState({ brackets: [] });

  useEffect(() => {
    const teamsBuffer = cloneDeep(tournament.teams);
    const brackets = [];
    const round0 = [];

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
      brackets[round + 1][matchIndex % 2].teams[biggerScoreIndex] = match.teams[biggerScoreIndex];
    }

    console.log(round, matchIndex, match, brackets);
    setState({brackets});
  }

  return (
    <div className="tournament">
      <TournamentHeader name={tournament.name} />
      <TournamentPlanning brackets={state.brackets} onMatchDone={onMatchDone} />
    </div>
  );
};

export { loaderTournament };

export default Tournament;
