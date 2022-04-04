import './App.css'
import { DisplayHomePage } from './DisplayHomePage'
import { IndividualCharacter } from './IndividualCharacter';
import { Route, Routes } from 'react-router';


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
