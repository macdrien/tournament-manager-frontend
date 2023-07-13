const NextMatch = (props) => {
  const { match } = props;
  const { teams } = match;
  console.log(match);

  return (
    <div className="nextMatch">
      <div className="nextMatchTeam">{teams[0]}</div>
      VS
      <div className="nextMatchTeam">{teams[1]}</div>
    </div>
  );
};

export default NextMatch;
