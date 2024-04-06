import './App.css';
import Title from './Components/Title';
import DropBox from './Components/DropBox';
import Resizer from './Components/Resizer';

function App() {
  return (
    <div className="App">
      <Title/>
      <div className='flex justify-center'>
        <DropBox/>
        <Resizer/>
      </div>
    </div>
  );
}

export default App;
