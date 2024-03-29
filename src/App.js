import './App.css'
import { DisplayHomePage } from './components/DisplayHomePage'
import { IndividualCharacter } from './components/IndividualCharacter';
import { Route, Routes } from 'react-router';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
    <>
    <Routes>
      <Route path='/' element={<DisplayHomePage />} />
      <Route path='character/:name' element={<IndividualCharacter />} />
    </Routes>
    </>

  );
}

export default App;
