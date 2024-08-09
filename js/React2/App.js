import './App.css';
import {useState} from 'react';

const Spoiler = ({ header = "+", open, children }) => {
  const [isOpen, setIsOpen] = useState(!open);
  return (
    <div className='spoiler'>
      <div onClick={() => setIsOpen(isOpen => !isOpen)} style={{cursor: 'pointer'}}>
        {header}
        {isOpen && <div>{children}</div>}
      </div>
    </div>
  );
};

const RangeInput = ({ min, max, ...probs}) => {
  const [text, setText] = useState("text")
  
  return (
    <input type="text" value={text} onChange={e => setText(e.target.value)} 
    style={{border: text && (text.length < min || text.length> max)  && ' 2px solid red' }}
      {...probs}
    />
  );
}

const LoginForm = ({ onLogin }) => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  
  return (
    <div>
      <form>
        <input type="text" value={login} onChange={e => setLogin(e.target.value)} placeholder="login"/>
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="password"/>
        <button type="button" onClick={() => onLogin(login, password)} disabled={!(login.length && password.length)}>
          Log in
        </button>
      </form>
    </div>
  );
};

const PasswordConfirm =({min}) => {
  const [password, setPassword] = useState ('');
  const [repeatPassword, setRepeatPassword] = useState('');

  const isValid = password.length >= min && password === repeatPassword;
  
  return (
    <div style={{height: '90px'}}>
      <input type="password" value={password} onChange={e => setPassword(e.target.value)}
        placeholder= "password"
         style={{ border: password && !isValid && '2px solid red'}}
      />
      <input type="password" value={repeatPassword} onChange={e => setRepeatPassword(e.target.value)}
        placeholder= "repeat password"
        style={{ border: repeatPassword && !isValid && '2px solid red'}}
      />
      <button disabled={!isValid}>Confirm</button>
      {!isValid &&  (<div style={{ color: 'red'}}>
                      {password && password.length < min && <p>Пароль має містити щонайменше {min} символи.</p>}
                      {password && repeatPassword && password !== repeatPassword && <p>Паролі не співпадають.</p>}
                      {repeatPassword && !password && <p>Забули ввести перший пароль.</p>}
                    </div>)}
      {isValid && <div style={{ color: 'green'}}><p>Паролі співпали.</p></div>}
    </div>
  );
};

const Thumbnails = ({ images, current, onChange }) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', gap:'8px', margin: '10px' }}>
      {images.map((img, index) => (
        <img key={index} src={img} alt={`Thumbnail ${index}`} 
          onClick={() => onChange(index)}
          style={{height: '50px', cursor: 'pointer', padding:'2px', border: index === current && '3px solid grey'
          }}
        />
      ))}
    </div>
  );
};

const Carousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNextImage = () => {
    setCurrentIndex((currentIndex + 1) % images.length);
  };
  
  const handlePrevImage = () => {
    setCurrentIndex((currentIndex - 1 + images.length) % images.length);
  };

  const handleImageClick = (e) => {
    const { clientX, target } = e;
    const { left, width } = target.getBoundingClientRect();
    const clickX = clientX - left;

    const thirdWidth = width / 3;
    if (clickX < (thirdWidth)) {
      handlePrevImage();
    } else if (clickX > 2 * thirdWidth) {
      handleNextImage();
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'center'}}>
        <img src={images[currentIndex]} alt={`Carousel ${currentIndex}`}
          style={{ height: '400px', cursor: 'pointer'}} onClick={handleImageClick}/>
      </div>
      <Thumbnails images={images} current={currentIndex} onChange={index => setCurrentIndex(index)} />
    </div>
  );
};

const Content = ({page}) => 
  <div style={{fontSize: '5em'}}>
      Сторінка №{page}
  </div>
; 
const Color = ({page}) =>
  <div style={{color: `rgb(${page*16},${page*16},${page*16})`}}>
      {page}
  </div>
; 
  
const Pagination = ({ render, max }) => {
  const [page, setPage] = useState(1);
  const Render = render;

  return (
    <div>
      <Render page={page}/>
      
      <div style={{ display: 'flex', justifyContent: 'center'}}>
        
        <button   onClick={() => setPage(1)} disabled={page === 1} style={{cursor: 'pointer'}}>
          {'<<'}
        </button>
       
        <button  onClick={() => setPage(page - 1)} disabled={page === 1} style={{cursor:'pointer'}}>
          {'<'}
        </button>
        
        {[...Array(max).keys()].map(i => (
            <button onClick={() => setPage(i + 1)}
              style={{ backgroundColor: i + 1 === page && 'lightgray', cursor: 'pointer'}}
              disabled={i + 1=== page} 
            >
              {i + 1}
            </button>
          )
        )}

        <button onClick={() => setPage(page + 1)} disabled={page === max} style={{cursor: 'pointer'}} >
          {'>'}
        </button>

        <button onClick={() => setPage(max)} disabled={page === max} style={{cursor: 'pointer'}}>
          {'>>'}
        </button>

      </div>
    </div>
  );
};


function App() {
  return (
    <div className="App">

      <Spoiler header={<h1>Заголовок</h1>} open>
        Контент 1
        <p>
          лорем іпсум тралівалі і тп.
        </p>
      </Spoiler>

      <Spoiler>
        <h2>Контент 2</h2>
        <p>
          лорем іпсум тралівалі і тп.
        </p>
      </Spoiler>
      
      <RangeInput min={2} max={10}/>

      <LoginForm onLogin={(login, password) => console.log(`Ось такий логін: ${login}, та ось такий пароль: ${password}`)}/>
        
      <LoginForm onLogin={(login, password) => console.log({login, password})}/>

      <PasswordConfirm min={2}/>

      <Carousel images={["https://ukrainetrek.com/blog/wp-content/uploads/2016/12/top-10-photos-ukrainian-nature-2016-1.jpg",
                   "https://ukrainetrek.com/blog/wp-content/uploads/2016/12/top-10-photos-ukrainian-nature-2016-2.jpg",
                   "https://ukrainetrek.com/blog/wp-content/uploads/2016/12/top-10-photos-ukrainian-nature-2016-3.jpg",
                   "https://ukrainetrek.com/blog/wp-content/uploads/2016/12/top-10-photos-ukrainian-nature-2016-4.jpg",
                   "https://ukrainetrek.com/blog/wp-content/uploads/2016/12/top-10-photos-ukrainian-nature-2016-5.jpg"]}
      />
      
      <Pagination max={10} render={Content}/>
        
      <Pagination max={16} render={Color}/>

    </div>
  );
}
export default App;