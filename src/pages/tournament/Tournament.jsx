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
      const match = { teams: [] };

      const firstIndex = random(teamsBuffer.length);
      match.teams.push(teamsBuffer[firstIndex]);
      teamsBuffer.splice(firstIndex, 1);

      const secondIndex = random(teamsBuffer.length);
      match.teams.push(teamsBuffer[secondIndex]);
      teamsBuffer.splice(secondIndex, 1);

      round0.push(match);
    }

    brackets.push(round0);
    setState({ brackets });
  }, []);

  return (
    <div className="tournament">
      <TournamentHeader name={tournament.name} />
      <TournamentPlanning brackets={state.brackets} />
    </div>
  );
};

export { loaderTournament };

export default Tournament;
