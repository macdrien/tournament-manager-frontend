const Teams = (props) => {
  const { teams } = props;
  
  return <div className="teamsSection" style={{ gridTemplateColumns: `repeat(${teams.length < 5 ? 2 : 4}, 1fr)`}}>
    { teams.map(team => <div key={teams.name}>
      <div className="teamName">{team.name}</div>
      <ul className="teamPlayers">
        { team.players.map(player => <li>{player}</li>) }
      </ul>
    </div>) }
  </div>;
}

export default Teams;