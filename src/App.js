import './App.css';
import { useState } from 'react';
import Title from './Components/Title';
import DropBox from './Components/DropBox';
import Resizer from './Components/Resizer';

function App() {
  const [details, setDetails] = useState(null);

  return (
    <div className="App">
      <Title />
      <div className='flex justify-center'>
        <DropBox setting_img_details={setDetails} />
        <Resizer get_img_details={details} set_img_details={setDetails} />
      </div>
      {details && (
        <div className="image-preview">
          <h3>Resized Image Preview</h3>
          <img
            src={details.dataURL}
            alt={details.FileName}
            width={details.w}
            height={details.h}
          />
        </div>
      )}
    </div>
  );
}

export default App;
