import './App.css';
import {useState, useEffect, useRef} from 'react';


const Timer = ({ initTime, ms = 1000 }) => {
  const [count, setCount] = useState(initTime);
  const [paused, setPaused] = useState(false);
  const intervalRef = useRef();

  useEffect(() => {
    if (!paused && count > 0) {
      intervalRef.current = setInterval(() => {
        setCount(count => count - 1);
      }, ms);
    }
    return () => clearInterval(intervalRef.current);
  }, [paused, count, ms]);

  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600).toString().padStart(2, '0');
    const m = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${h}:${m}:${s}`;
  };

  return (
    <div className='Task'>
      <span>Timer</span> 
      <div style={{ fontSize: '25px'}}>
        {formatTime(count)}
      </div>
      <button onClick={() => setPaused( paused => !paused)}>
        {'pause'}
      </button>
    </div>
  );
};


const TimerControl = () => {
  const [hours, setHours] = useState('');
  const [minutes, setMinutes] = useState('');
  const [seconds, setSeconds] = useState('');
  const [start, setStart] = useState(false);
  
  const totalSeconds = (+hours) * 3600 + (+minutes) * 60 + (+seconds);
  
  return (
    <div className='Task'>
      <h4>TimerControl</h4>

      <input
        type="number" value={hours} onChange={e => setHours(e.target.value)}
        min="0" max="24" placeholder="години"
      />

      <input type="number" value={minutes} onChange={e => setMinutes(e.target.value)}
        min="0"  max="59" placeholder="хвилини"
      />

      <input type="number" value={seconds} onChange={e => setSeconds(e.target.value)}
        min="0" max="59" placeholder="секунди"
      />
      
      <button onClick={() => setStart(true)}>Start</button>
      
      {start && (<Timer initTime={totalSeconds}/>)}

    </div>
  );
};


const SecondsTimer = ({ seconds }) => <h2>{seconds}</h2>;

const TimerContainer = ({ seconds, refresh, render }) => {
  const Render = render;
  const [time, setTime] = useState(seconds);
  const mountTimeRef = useRef(Date.now());
  const intervalRef = useRef();
  
  useEffect(() => {
    const updateTimer = () => {
      const updateSeconds = seconds - Math.floor((Date.now() - mountTimeRef.current) / 1000);
      setTime(updateSeconds);
    };

    intervalRef.current = setInterval(updateTimer, refresh);
    updateTimer();

    return () => clearInterval(intervalRef.current);
  }, [seconds, refresh]);

  useEffect(() => {
    mountTimeRef.current = Date.now();
    setTime(seconds);
  }, [seconds]);

  return <Render seconds={time}/>
};


const TimerLCD = ({ seconds }) => {
  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600).toString().padStart(2, '0');
    const m = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${h}:${m}:${s}`;
  };

  return (
    <div className='Task'>
      <div style={{fontSize: '25px'}}>
        {formatTime(seconds)}
      </div>
    </div>
  );
};


const Watch = ({ seconds }) => {
  const hours = Math.floor(seconds / 3600) % 12;
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  return (
    <div className="clockFace">
      <div
        className="clockHour"
        style={{ transform: `rotate(${hours * 30 + minutes * 0.5}deg)` }}
      ></div>
      <div
        className="clockMinute"
        style={{ transform: `rotate(${minutes * 6 + secs * 0.1}deg)` }}
      ></div>
      <div
        className="clockSecond"
        style={{  transform: `rotate(${secs * 6}deg)` }}
      ></div>
    </div>
  );
};


const TimerControlConteiner = () => {
  const [hours, setHours] = useState('');
  const [minutes, setMinutes] = useState('');
  const [seconds, setSeconds] = useState('');
  const [start, setStart] = useState(false);
  
  const totalSeconds = (+hours) * 3600 + (+minutes) * 60 + (+seconds);

  return (
    <div className='Task'>

      <h3>TimerControlConteiner</h3>

      <input type="number" value={hours}onChange={e => setHours(e.target.value)}
        min="0" max="24" placeholder="години"
      />

      <input type="number" value={minutes} onChange={e => setMinutes(e.target.value)}
        min="0" max="59" placeholder="хвилини"
      />

      <input type="number" value={seconds} onChange={e=> setSeconds(e.target.value)}
        min="0" max="59" placeholder="секунди"
      />

      <button onClick={() => setStart(true)}>Start</button>
      
      {start && (<TimerContainer seconds={totalSeconds} refresh={100} render={Watch}/>)}

    </div>
  );
};


const Phonebook = () => {
  const [phoneNumbers, setPhoneNumbers] = useState([]);

  const addNumber = () => {
    setPhoneNumbers(phoneNumbers => [...phoneNumbers, { id: Math.random(), number: '' }]);
  };

  const removeNumber = (id) => {
    setPhoneNumbers(phoneNumbers => phoneNumbers.filter(phone => phone.id !== id));
  };

  const moveUp = (id) => {
    setPhoneNumbers(phoneNumbers => {
      const index = phoneNumbers.findIndex(phone => phone.id === id);
      if (index > 0) {
        const newNumbers = [...phoneNumbers];
        [newNumbers[index - 1], newNumbers[index]] = [newNumbers[index], newNumbers[index - 1]];
        return newNumbers;
      }
      return phoneNumbers;
    });
  };

  const moveDown = (id) => {
    setPhoneNumbers(phoneNumbers => {
      const index = phoneNumbers.findIndex(phone => phone.id === id);
      if (index < phoneNumbers.length - 1) {
        const newNumbers = [...phoneNumbers];
        [newNumbers[index], newNumbers[index + 1]] = [newNumbers[index + 1], newNumbers[index]];
        return newNumbers;
      }
      return phoneNumbers;
    });
  };

  useEffect(() => {
    addNumber();
  }, []);

  return (
    <div className='Phonebook'> <h2>ТЕЛЕФОННА КНИГА</h2>
      {phoneNumbers.map(phone => (
        <div key={phone.id} style={{ marginBottom: '10px' }}>
          <input type="tel" value={phone.number} onChange={(e) => 
            setPhoneNumbers(phoneNumbers.map(p =>
                p.id === phone.id ? { ...p, number: e.target.value } : p
              ))}
            placeholder="введіть номер телефону"
          />

          <button onClick={() => moveUp(phone.id)} disabled={phoneNumbers.findIndex(p => p.id === phone.id) === 0}>
            вгору
          </button>

          <button onClick={() => moveDown(phone.id)} disabled={phoneNumbers.findIndex(p => p.id === phone.id) === phoneNumbers.length - 1}>
            вниз
          </button>

          <button onClick={() => removeNumber(phone.id)}>видалити</button>

        </div>
      ))}
      <button onClick={addNumber}>додати номер телефона</button>
    </div>
  );
};


function App() {
  return (
    <div className="App">

      <Timer initTime={1000}/>

      <TimerControl/>
      
      <div className='Task'>
        <h4>TimerContainer+SecondsTimer</h4>
        <TimerContainer seconds={1800} refresh={100} render={SecondsTimer} />
      </div>

      <div className='Task'>
        <h5>TimerContainer + TimerLCD</h5>
        <TimerContainer seconds={2000} refresh={100} render={TimerLCD} />
      </div>
      
      <div className='Task'>
        <h4>TimerContainer + Watch</h4>
        <TimerContainer seconds={3000} refresh={100} render={Watch} />
      </div>
      
      <TimerControlConteiner />
      
      <Phonebook/>

    </div>
  );
}
export default App;
