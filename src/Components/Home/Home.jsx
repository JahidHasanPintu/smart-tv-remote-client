import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVolumeUp, faVolumeDown, faArrowUp, faArrowDown, faArrowLeft, faArrowRight, faHome, faCog, faChevronLeft, faChevronRight, faCircle, faKeyboard, faPowerOff,faBars,faVolumeMute, faRedo, faVideo, faDeleteLeft } from '@fortawesome/free-solid-svg-icons';

function Home() {
  const savedIpAddress = localStorage.getItem('tvIpAddress') || '';
  const [ipAddress, setIpAddress] = useState(savedIpAddress);

  const handleIPChange = (event) => {
    const { value } = event.target;
    setIpAddress(value);
  };

  const handlSaveIP = () => {
    // Save the IP address in local storage
    localStorage.setItem('tvIpAddress', ipAddress);
    console.log('TV IP address saved:', ipAddress);
  };

  const handleButtonClick = async (direction) => {
    const apiUrl = 'http://localhost:5000/arrow';
  
    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ direction }), // Send direction as JSON in the request body
      });
  
      if (response.ok) {
        console.log(`Command '${direction}' executed successfully`);
      } else {
        console.error(`Error executing command '${direction}'`);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
  const [searchText, setSearchText] = useState('');

  const handleInputChange = (event) => {
    const { value } = event.target;
    setSearchText(value);
  };

  const handleKeyPress = async (event) => {
    if (event.key === 'Enter') {
      // Call the API with the key in the request body
      const apiUrl = 'http://localhost:5000/keyboard';
      const key = searchText.split(' '); // Trim any leading/trailing spaces

      try {
        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ key }),
        });

        if (response.ok) {
          console.log(`Key '${key}' sent successfully to the server`);
        } else {
          console.error(`Error sending key '${key}' to the server`);
        }
      } catch (error) {
        console.error('Error:', error);
      }

      // Clear the textarea after sending the key
      setSearchText('');
    }
  };

  
  const handleYouTubeButtonClick = async () => {
    const apiUrl = 'http://localhost:5000/open/youtube';

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
      });

      if (response.ok) {
        console.log('YouTube app opened successfully');
      } else {
        console.error('Error opening YouTube app');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handlePowerOffButtonClick = async () => {
    const apiUrl = 'http://localhost:5000/power/off';

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
      });

      if (response.ok) {
        console.log('TV turned off successfully');
      } else {
        console.error('Error turning off the TV');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-1">Remote for Android TV</h2>
      <h6 className="mb-4">Developed By Pintu</h6>
      <div className="row">
        <div className="col">
          <button className="btn btn-primary m-2" onClick={() => handleButtonClick('vup')}>
            <FontAwesomeIcon icon={faVolumeUp} />
          </button>
          <button className="btn btn-primary m-2" onClick={() => handleButtonClick('vdown')}>
            <FontAwesomeIcon icon={faVolumeDown} />
          </button>
          <button className="btn btn-primary m-2" onClick={() => handleButtonClick('mute')}>
            <FontAwesomeIcon icon={faVolumeMute} />
          </button>
        </div>
      </div>
      <div className="row mt-2">
        <div className="col">
          <button className="btn btn-primary mr-2" onClick={() => handleButtonClick('up')}>
            <FontAwesomeIcon icon={faArrowUp} />
          </button>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <button className="btn btn-primary mr-2" onClick={() => handleButtonClick('left')}>
            <FontAwesomeIcon icon={faArrowLeft} />
          </button>
          <button className="btn btn-primary m-2" onClick={() => handleButtonClick('enter')}>
            Enter
          </button>
          <button className="btn btn-primary" onClick={() => handleButtonClick('right')}>
            <FontAwesomeIcon icon={faArrowRight} />
          </button>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <button className="btn btn-primary mr-2" onClick={() => handleButtonClick('down')}>
            <FontAwesomeIcon icon={faArrowDown} />
          </button>
        </div>
      </div>
      <div className="row mt-2">
        <div className="col">
          
          <button className="btn btn-primary m-2" onClick={() => handleButtonClick('back')}>
            <FontAwesomeIcon icon={faChevronLeft} /> Back
          </button>
          <button className="btn btn-primary m-2" onClick={() => handleButtonClick('home')}>
            <FontAwesomeIcon icon={faHome} /> Home
          </button>
          <button className="btn btn-primary m-2" onClick={() => handleButtonClick('menu')}>
            <FontAwesomeIcon icon={faBars} /> Menu
          </button>
          <button className="btn btn-primary m-2" onClick={() => handleButtonClick('backs')}>
            <FontAwesomeIcon icon={faDeleteLeft} /> 
          </button>
        </div>
      </div>
      <div className="row mt-2">
        <div className="col">
        <button className="btn btn-primary" onClick={() => handleYouTubeButtonClick()}>
        <FontAwesomeIcon icon={faVideo} /> YouTube
          </button>
          <button className="btn btn-danger m-2" onClick={() => handlePowerOffButtonClick()}>
            <FontAwesomeIcon icon={faPowerOff} /> Power OFF
          </button>
          
        </div>
      </div>
      <div className="row mt-2">
        <div className="col">
          <textarea rows="3"
          placeholder="Type Here for search"
          className="p-2"
          value={searchText}
          onChange={handleInputChange}
          onKeyDown={handleKeyPress}  
          cols="35" >

          </textarea>
          {/* Continue with other keyboard buttons as needed */}
        </div>
      </div>
      <div className="row mt-2">
        <div className="col">
          <input type='text'
          value={ipAddress}
          onChange={handleIPChange}
           className='p-1' placeholder='ip address'/> <button className="btn btn-warning m-2" onClick={() => handlSaveIP()}>
          Save
          </button>
          {/* Continue with other keyboard buttons as needed */}
        </div>
      </div>
    </div>
  );
}

export default Home;
