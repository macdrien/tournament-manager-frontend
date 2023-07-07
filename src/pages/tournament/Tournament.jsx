import { useSelector } from "react-redux";

const Tournament = () => {
  const teams = useSelector((state) => state.tournament.teams);
  return <div className="tournament">tournament {teams}</div>;
};

export default Tournament;
