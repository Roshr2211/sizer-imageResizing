import './App.css';
import { useState, useRef } from 'react'
import Title from './Components/Title';
import DropBox from './Components/DropBox';
import Resizer from './Components/Resizer';


/*
{
  file: "image.png",
  w: 1080,
  h: 1080,
}
*/


function App() {
  const [details, setDetails] = useState(null)
  return (
    <div className="App">
      <Title/>
      <div className='flex justify-center'>
        <DropBox setting_img_details={setDetails}/>
        <Resizer get_img_details={details} set_img_details={setDetails}/>
        {console.log(details)}
      </div>
    </div>
  );
}

export default App;
