import { Header } from './pages';
import CreateTournament from './pages/createTournament/CreateTournament';
import './App.css';

function App() {
  return (
    <div className='app'>
      <Header />
      <div className='content'>
        <CreateTournament />
      </div>
    </div>
  );
}

export default App;
