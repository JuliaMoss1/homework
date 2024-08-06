import './App.css';

const data = [
  {
    "ID Nation": "01000US",
    "Nation": "United States",
    "ID Year": 2016,
    "Year": "2016",
    "Population": 323127515,
    "Slug Nation": "united-states"
  },
  {
    "ID Nation": "01000US",
    "Nation": "United States",
    "ID Year": 2015,
    "Year": "2015",
    "Population": 321418821,
    "Slug Nation": "united-states"
  },
  {
    "ID Nation": "01000US",
    "Nation": "United States",
    "ID Year": 2014,
    "Year": "2014",
    "Population": 318857056,
    "Slug Nation": "united-states"
  },
  {
    "ID Nation": "01000US",
    "Nation": "United States",
    "ID Year": 2013,
    "Year": "2013",
    "Population": 316128839,
    "Slug Nation": "united-states"
  }
];

const CartNation  = ({data:{"ID Nation": idNation, "ID Year": idYear, Nation, Year, Population, "Slug Nation": sludNation}}) =>
<div className='CartNation' style={{width: '300px', border: 'solid 1px rgb(192, 185, 185)'}}> 
  <span>id-країни: {idNation}</span>
  <h1>{Nation}</h1>
  <p>{idYear}</p>
  <h4>у {Year} році</h4>
  <div>населення: {Population} чол.</div>
  <p>{sludNation}</p>
</div>


function App() {
  return (
    <div className="App">

      <div className='nationConteiner'>
        {data.map(item => <CartNation data={item}/>)}  
      </div>

      <div className='swapiConteiner'>
        {results.map(item => <Swapi resalt={item}/>)}
      </div>

      <Episodes  episodes={episodes}/> 
     
      <Characters data ={characters}/> 
     
    </div>
  );
}
export default App;


const Swapi = ({resalt:{name, height, mass, hair_color, skin_color, eye_color, birth_year, gender, homeworld, films, starships}}) =>
  <div className='SwapiCart'>
    <h4>ім'я: {name} </h4>
    <span>зріст: {height} см</span>
    <span>вага: {mass} кг</span>
    {hair_color !== 'n/a' && hair_color !== 'none' && <span>колір волосся: {hair_color}</span>}
    <span>колір шкіри: {skin_color}</span>
    <div style={{ color: eye_color }}>колір очей: {eye_color}</div>
    <span>рік народження: {birth_year}</span>
    {gender !== 'n/a' && gender !== 'none' && <span>стать: {gender}</span>}
    <span>рідна планета: <a href={homeworld}>{homeworld}</a><a/></span>
    {<ol>фільми: {films.map((filmUrl, index) => 
        <li key={index}>
           <a href={filmUrl} target="_blank">{filmUrl}</a>
        </li>
      )}
    </ol>}

    {starships.length > 0  && <List items={starships}>
                                <span>зорельоти:</span>
                              </List>}
</div>

const List = ({ items, children }) => 
  <div className='List'>
    {children}
    <ol>
      {items.map((item, index) => (
        <li key={index}>
          <a href={item} target="_blank">
            {item}
          </a>
        </li>
      ))}
    </ol>
  </div>
;

const Episode = ({data:{ name, air_date, characters}}) => (
  <div className='Episode'>
    <span>Назва епізода: {name}</span>
    <span>Дата випуску: {air_date}</span>
    {characters && characters.length > 0 && (
      <div className='Characterss'>
        <h3>Персонажі:</h3>
        {characters.map((character) => 
          <span>{character.name}</span>
        )}
      </div>
    )}
  </div>
);

const Episodes = ({episodes}) => (
  <div className='Episodes'>
    {episodes.map(episode => <Episode key={episode.id} data = {episode}/>)}
  </div>
);

const Character =({data: {name, gender, image, episode}}) => (
  <div className='Character'>
    <h4>Персонаж: {name}</h4>
    <span>Стать: {gender}</span>
    <br/>
    <div style={{ width: '100%', height: '300px', backgroundImage: `url(${image})`}}></div>
    <div>
      <h4>Епізоди у яких з'являвся:</h4>
      <Episodes episodes={episode}/>
    </div>
 </div>
);

const Characters = ({data}) => (
  <div className='Characters'>
    {data && data.length > 0 && data.map(character=> <Character data={character}/>)}
  </div>
);

const results = [
      {
          "name": "Luke Skywalker", 
          "height": "172", 
          "mass": "77", 
          "hair_color": "blond", 
          "skin_color": "fair", 
          "eye_color": "blue", 
          "birth_year": "19BBY", 
          "gender": "male", 
          "homeworld": "https://swapi.dev/api/planets/1/", 
          "films": [
              "https://swapi.dev/api/films/1/", 
              "https://swapi.dev/api/films/2/", 
              "https://swapi.dev/api/films/3/", 
              "https://swapi.dev/api/films/6/"
          ], 
          "species": [], 
          "vehicles": [
              "https://swapi.dev/api/vehicles/14/", 
              "https://swapi.dev/api/vehicles/30/"
          ], 
          "starships": [
              "https://swapi.dev/api/starships/12/", 
              "https://swapi.dev/api/starships/22/"
          ], 
          "created": "2014-12-09T13:50:51.644000Z", 
          "edited": "2014-12-20T21:17:56.891000Z", 
          "url": "https://swapi.dev/api/people/1/"
      }, 
      {
          "name": "C-3PO", 
          "height": "167", 
          "mass": "75", 
          "hair_color": "n/a", 
          "skin_color": "gold", 
          "eye_color": "yellow", 
          "birth_year": "112BBY", 
          "gender": "n/a", 
          "homeworld": "https://swapi.dev/api/planets/1/", 
          "films": [
              "https://swapi.dev/api/films/1/", 
              "https://swapi.dev/api/films/2/", 
              "https://swapi.dev/api/films/3/", 
              "https://swapi.dev/api/films/4/", 
              "https://swapi.dev/api/films/5/", 
              "https://swapi.dev/api/films/6/"
          ], 
          "species": [
              "https://swapi.dev/api/species/2/"
          ], 
          "vehicles": [], 
          "starships": [], 
          "created": "2014-12-10T15:10:51.357000Z", 
          "edited": "2014-12-20T21:17:50.309000Z", 
          "url": "https://swapi.dev/api/people/2/"
      }, 
      {
          "name": "R2-D2", 
          "height": "96", 
          "mass": "32", 
          "hair_color": "n/a", 
          "skin_color": "white, blue", 
          "eye_color": "red", 
          "birth_year": "33BBY", 
          "gender": "n/a", 
          "homeworld": "https://swapi.dev/api/planets/8/", 
          "films": [
              "https://swapi.dev/api/films/1/", 
              "https://swapi.dev/api/films/2/", 
              "https://swapi.dev/api/films/3/", 
              "https://swapi.dev/api/films/4/", 
              "https://swapi.dev/api/films/5/", 
              "https://swapi.dev/api/films/6/"
          ], 
          "species": [
              "https://swapi.dev/api/species/2/"
          ], 
          "vehicles": [], 
          "starships": [], 
          "created": "2014-12-10T15:11:50.376000Z", 
          "edited": "2014-12-20T21:17:50.311000Z", 
          "url": "https://swapi.dev/api/people/3/"
      }, 
      {
          "name": "Darth Vader", 
          "height": "202", 
          "mass": "136", 
          "hair_color": "none", 
          "skin_color": "white", 
          "eye_color": "yellow", 
          "birth_year": "41.9BBY", 
          "gender": "male", 
          "homeworld": "https://swapi.dev/api/planets/1/", 
          "films": [
              "https://swapi.dev/api/films/1/", 
              "https://swapi.dev/api/films/2/", 
              "https://swapi.dev/api/films/3/", 
              "https://swapi.dev/api/films/6/"
          ], 
          "species": [], 
          "vehicles": [], 
          "starships": [
              "https://swapi.dev/api/starships/13/"
          ], 
          "created": "2014-12-10T15:18:20.704000Z", 
          "edited": "2014-12-20T21:17:50.313000Z", 
          "url": "https://swapi.dev/api/people/4/"
      }, 
      {
          "name": "Leia Organa", 
          "height": "150", 
          "mass": "49", 
          "hair_color": "brown", 
          "skin_color": "light", 
          "eye_color": "brown", 
          "birth_year": "19BBY", 
          "gender": "female", 
          "homeworld": "https://swapi.dev/api/planets/2/", 
          "films": [
              "https://swapi.dev/api/films/1/", 
              "https://swapi.dev/api/films/2/", 
              "https://swapi.dev/api/films/3/", 
              "https://swapi.dev/api/films/6/"
          ], 
          "species": [], 
          "vehicles": [
              "https://swapi.dev/api/vehicles/30/"
          ], 
          "starships": [], 
          "created": "2014-12-10T15:20:09.791000Z", 
          "edited": "2014-12-20T21:17:50.315000Z", 
          "url": "https://swapi.dev/api/people/5/"
      }, 
      {
          "name": "Owen Lars", 
          "height": "178", 
          "mass": "120", 
          "hair_color": "brown, grey", 
          "skin_color": "light", 
          "eye_color": "blue", 
          "birth_year": "52BBY", 
          "gender": "male", 
          "homeworld": "https://swapi.dev/api/planets/1/", 
          "films": [
              "https://swapi.dev/api/films/1/", 
              "https://swapi.dev/api/films/5/", 
              "https://swapi.dev/api/films/6/"
          ], 
          "species": [], 
          "vehicles": [], 
          "starships": [], 
          "created": "2014-12-10T15:52:14.024000Z", 
          "edited": "2014-12-20T21:17:50.317000Z", 
          "url": "https://swapi.dev/api/people/6/"
      }, 
      {
          "name": "Beru Whitesun lars", 
          "height": "165", 
          "mass": "75", 
          "hair_color": "brown", 
          "skin_color": "light", 
          "eye_color": "blue", 
          "birth_year": "47BBY", 
          "gender": "female", 
          "homeworld": "https://swapi.dev/api/planets/1/", 
          "films": [
              "https://swapi.dev/api/films/1/", 
              "https://swapi.dev/api/films/5/", 
              "https://swapi.dev/api/films/6/"
          ], 
          "species": [], 
          "vehicles": [], 
          "starships": [], 
          "created": "2014-12-10T15:53:41.121000Z", 
          "edited": "2014-12-20T21:17:50.319000Z", 
          "url": "https://swapi.dev/api/people/7/"
      }, 
      {
          "name": "R5-D4", 
          "height": "97", 
          "mass": "32", 
          "hair_color": "n/a", 
          "skin_color": "white, red", 
          "eye_color": "red", 
          "birth_year": "unknown", 
          "gender": "n/a", 
          "homeworld": "https://swapi.dev/api/planets/1/", 
          "films": [
              "https://swapi.dev/api/films/1/"
          ], 
          "species": [
              "https://swapi.dev/api/species/2/"
          ], 
          "vehicles": [], 
          "starships": [], 
          "created": "2014-12-10T15:57:50.959000Z", 
          "edited": "2014-12-20T21:17:50.321000Z", 
          "url": "https://swapi.dev/api/people/8/"
      }, 
      {
          "name": "Biggs Darklighter", 
          "height": "183", 
          "mass": "84", 
          "hair_color": "black", 
          "skin_color": "light", 
          "eye_color": "brown", 
          "birth_year": "24BBY", 
          "gender": "male", 
          "homeworld": "https://swapi.dev/api/planets/1/", 
          "films": [
              "https://swapi.dev/api/films/1/"
          ], 
          "species": [], 
          "vehicles": [], 
          "starships": [
              "https://swapi.dev/api/starships/12/"
          ], 
          "created": "2014-12-10T15:59:50.509000Z", 
          "edited": "2014-12-20T21:17:50.323000Z", 
          "url": "https://swapi.dev/api/people/9/"
      }, 
      {
          "name": "Obi-Wan Kenobi", 
          "height": "182", 
          "mass": "77", 
          "hair_color": "auburn, white", 
          "skin_color": "fair", 
          "eye_color": "blue-gray", 
          "birth_year": "57BBY", 
          "gender": "male", 
          "homeworld": "https://swapi.dev/api/planets/20/", 
          "films": [
              "https://swapi.dev/api/films/1/", 
              "https://swapi.dev/api/films/2/", 
              "https://swapi.dev/api/films/3/", 
              "https://swapi.dev/api/films/4/", 
              "https://swapi.dev/api/films/5/", 
              "https://swapi.dev/api/films/6/"
          ], 
          "species": [], 
          "vehicles": [
              "https://swapi.dev/api/vehicles/38/"
          ], 
          "starships": [
              "https://swapi.dev/api/starships/48/", 
              "https://swapi.dev/api/starships/59/", 
              "https://swapi.dev/api/starships/64/", 
              "https://swapi.dev/api/starships/65/", 
              "https://swapi.dev/api/starships/74/"
          ], 
          "created": "2014-12-10T16:16:29.192000Z", 
          "edited": "2014-12-20T21:17:50.325000Z", 
          "url": "https://swapi.dev/api/people/10/"
      }
];

const episodes = [
        {
          "name": "Pilot",
          "air_date": "December 2, 2013",
          "characters": [
            {
              "name": "Rick Sanchez"
            },
            {
              "name": "Morty Smith"
            },
            {
              "name": "Bepisian"
            },
            {
              "name": "Beth Smith"
            },
            {
              "name": "Canklanker Thom"
            },
            {
              "name": "Davin"
            },
            {
              "name": "Frank Palicky"
            },
            {
              "name": "Glenn"
            },
            {
              "name": "Hookah Alien"
            },
            {
              "name": "Jerry Smith"
            },
            {
              "name": "Jessica"
            },
            {
              "name": "Jessica's Friend"
            },
            {
              "name": "Mr. Goldenfold"
            },
            {
              "name": "Mrs. Sanchez"
            },
            {
              "name": "Principal Vagina"
            },
            {
              "name": "Summer Smith"
            },
            {
              "name": "Davin"
            },
            {
              "name": "Greebybobe"
            },
            {
              "name": "Pripudlian"
            }
          ]
        },
        {
          "name": "Lawnmower Dog",
          "air_date": "December 9, 2013",
          "characters": [
            {
              "name": "Rick Sanchez"
            },
            {
              "name": "Morty Smith"
            },
            {
              "name": "Beth Smith"
            },
            {
              "name": "Bill"
            },
            {
              "name": "Centaur"
            },
            {
              "name": "Creepy Little Girl"
            },
            {
              "name": "Jerry Smith"
            },
            {
              "name": "Melissa"
            },
            {
              "name": "Mr. Goldenfold"
            },
            {
              "name": "Mrs. Pancakes"
            },
            {
              "name": "Scary Brandon"
            },
            {
              "name": "Scary Glenn"
            },
            {
              "name": "Scary Terry"
            },
            {
              "name": "Snuffles (Snowball)"
            },
            {
              "name": "Summer Smith"
            },
            {
              "name": "Scary Teacher"
            },
            {
              "name": "Fido"
            },
            {
              "name": "Accountant dog"
            },
            {
              "name": "Trunkphobic suspenders guy"
            }
          ]
        },
        {
          "name": "Anatomy Park",
          "air_date": "December 16, 2013",
          "characters": [
            {
              "name": "Rick Sanchez"
            },
            {
              "name": "Morty Smith"
            },
            {
              "name": "Alexander"
            },
            {
              "name": "Annie"
            },
            {
              "name": "Beth Smith"
            },
            {
              "name": "Bill"
            },
            {
              "name": "Tuberculosis"
            },
            {
              "name": "Gonorrhea"
            },
            {
              "name": "Hepatitis A"
            },
            {
              "name": "Hepatitis C"
            },
            {
              "name": "Bubonic Plague"
            },
            {
              "name": "E. Coli"
            },
            {
              "name": "Dr. Xenon Bloom"
            },
            {
              "name": "Eric McMan"
            },
            {
              "name": "Ethan"
            },
            {
              "name": "Jacob"
            },
            {
              "name": "Jerry Smith"
            },
            {
              "name": "Joyce Smith"
            },
            {
              "name": "Leonard Smith"
            },
            {
              "name": "Poncho"
            },
            {
              "name": "Roger"
            },
            {
              "name": "Ruben"
            },
            {
              "name": "Summer Smith"
            },
            {
              "name": "Tom Randolph"
            }
          ]
        }
];

const characters =  [
        {
          "name": "Rick Sanchez",
          "gender": "Male",
          "image": "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
          "episode": [
            {
              "name": "Pilot",
              "air_date": "December 2, 2013"
            },
            {
              "name": "Lawnmower Dog",
              "air_date": "December 9, 2013"
            },
            {
              "name": "Anatomy Park",
              "air_date": "December 16, 2013"
            },
            {
              "name": "M. Night Shaym-Aliens!",
              "air_date": "January 13, 2014"
            },
            {
              "name": "Meeseeks and Destroy",
              "air_date": "January 20, 2014"
            },
            {
              "name": "Rick Potion #9",
              "air_date": "January 27, 2014"
            },
            {
              "name": "Raising Gazorpazorp",
              "air_date": "March 10, 2014"
            },
            {
              "name": "Rixty Minutes",
              "air_date": "March 17, 2014"
            },
            {
              "name": "Something Ricked This Way Comes",
              "air_date": "March 24, 2014"
            },
            {
              "name": "Close Rick-counters of the Rick Kind",
              "air_date": "April 7, 2014"
            },
            {
              "name": "Ricksy Business",
              "air_date": "April 14, 2014"
            },
            {
              "name": "A Rickle in Time",
              "air_date": "July 26, 2015"
            },
            {
              "name": "Mortynight Run",
              "air_date": "August 2, 2015"
            },
            {
              "name": "Auto Erotic Assimilation",
              "air_date": "August 9, 2015"
            },
            {
              "name": "Total Rickall",
              "air_date": "August 16, 2015"
            },
            {
              "name": "Get Schwifty",
              "air_date": "August 23, 2015"
            },
            {
              "name": "The Ricks Must Be Crazy",
              "air_date": "August 30, 2015"
            },
            {
              "name": "Big Trouble in Little Sanchez",
              "air_date": "September 13, 2015"
            },
            {
              "name": "Interdimensional Cable 2: Tempting Fate",
              "air_date": "September 20, 2015"
            },
            {
              "name": "Look Who's Purging Now",
              "air_date": "September 27, 2015"
            },
            {
              "name": "The Wedding Squanchers",
              "air_date": "October 4, 2015"
            },
            {
              "name": "The Rickshank Rickdemption",
              "air_date": "April 1, 2017"
            },
            {
              "name": "Rickmancing the Stone",
              "air_date": "July 30, 2017"
            },
            {
              "name": "Pickle Rick",
              "air_date": "August 6, 2017"
            },
            {
              "name": "Vindicators 3: The Return of Worldender",
              "air_date": "August 13, 2017"
            },
            {
              "name": "The Whirly Dirly Conspiracy",
              "air_date": "August 20, 2017"
            },
            {
              "name": "Rest and Ricklaxation",
              "air_date": "August 27, 2017"
            },
            {
              "name": "The Ricklantis Mixup",
              "air_date": "September 10, 2017"
            },
            {
              "name": "Morty's Mind Blowers",
              "air_date": "September 17, 2017"
            },
            {
              "name": "The ABC's of Beth",
              "air_date": "September 24, 2017"
            },
            {
              "name": "The Rickchurian Mortydate",
              "air_date": "October 1, 2017"
            },
            {
              "name": "Edge of Tomorty: Rick, Die, Rickpeat",
              "air_date": "November 10, 2019"
            },
            {
              "name": "The Old Man and the Seat",
              "air_date": "November 17, 2019"
            },
            {
              "name": "One Crew Over the Crewcoo's Morty",
              "air_date": "November 24, 2019"
            },
            {
              "name": "Claw and Hoarder: Special Ricktim's Morty",
              "air_date": "December 8, 2019"
            },
            {
              "name": "Rattlestar Ricklactica",
              "air_date": "December 15, 2019"
            },
            {
              "name": "Never Ricking Morty",
              "air_date": "May 3, 2020"
            },
            {
              "name": "Promortyus",
              "air_date": "May 10, 2020"
            },
            {
              "name": "The Vat of Acid Episode",
              "air_date": "May 17, 2020"
            },
            {
              "name": "Childrick of Mort",
              "air_date": "May 24, 2020"
            },
            {
              "name": "Star Mort: Rickturn of the Jerri",
              "air_date": "May 31, 2020"
            },
            {
              "name": "Mort Dinner Rick Andre",
              "air_date": "June 20, 2021"
            },
            {
              "name": "Mortyplicity",
              "air_date": "June 27, 2021"
            },
            {
              "name": "A Rickconvenient Mort",
              "air_date": "July 4, 2021"
            },
            {
              "name": "Rickdependence Spray",
              "air_date": "July 11, 2021"
            },
            {
              "name": "Amortycan Grickfitti",
              "air_date": "July 18, 2021"
            },
            {
              "name": "Rick & Morty's Thanksploitation Spectacular",
              "air_date": "July 25, 2021"
            },
            {
              "name": "Gotron Jerrysis Rickvangelion",
              "air_date": "August 1, 2021"
            },
            {
              "name": "Rickternal Friendshine of the Spotless Mort",
              "air_date": "August 8, 2021"
            },
            {
              "name": "Forgetting Sarick Mortshall",
              "air_date": "September 5, 2021"
            },
            {
              "name": "Rickmurai Jack",
              "air_date": "September 5, 2021"
            }
          ]
        },
        {
          "name": "Morty Smith",
          "gender": "Male",
          "image": "https://rickandmortyapi.com/api/character/avatar/2.jpeg",
          "episode": [
            {
              "name": "Pilot",
              "air_date": "December 2, 2013"
            },
            {
              "name": "Lawnmower Dog",
              "air_date": "December 9, 2013"
            },
            {
              "name": "Anatomy Park",
              "air_date": "December 16, 2013"
            },
            {
              "name": "M. Night Shaym-Aliens!",
              "air_date": "January 13, 2014"
            },
            {
              "name": "Meeseeks and Destroy",
              "air_date": "January 20, 2014"
            },
            {
              "name": "Rick Potion #9",
              "air_date": "January 27, 2014"
            },
            {
              "name": "Raising Gazorpazorp",
              "air_date": "March 10, 2014"
            },
            {
              "name": "Rixty Minutes",
              "air_date": "March 17, 2014"
            },
            {
              "name": "Something Ricked This Way Comes",
              "air_date": "March 24, 2014"
            },
            {
              "name": "Close Rick-counters of the Rick Kind",
              "air_date": "April 7, 2014"
            },
            {
              "name": "Ricksy Business",
              "air_date": "April 14, 2014"
            },
            {
              "name": "A Rickle in Time",
              "air_date": "July 26, 2015"
            },
            {
              "name": "Mortynight Run",
              "air_date": "August 2, 2015"
            },
            {
              "name": "Auto Erotic Assimilation",
              "air_date": "August 9, 2015"
            },
            {
              "name": "Total Rickall",
              "air_date": "August 16, 2015"
            },
            {
              "name": "Get Schwifty",
              "air_date": "August 23, 2015"
            },
            {
              "name": "The Ricks Must Be Crazy",
              "air_date": "August 30, 2015"
            },
            {
              "name": "Big Trouble in Little Sanchez",
              "air_date": "September 13, 2015"
            },
            {
              "name": "Interdimensional Cable 2: Tempting Fate",
              "air_date": "September 20, 2015"
            },
            {
              "name": "Look Who's Purging Now",
              "air_date": "September 27, 2015"
            },
            {
              "name": "The Wedding Squanchers",
              "air_date": "October 4, 2015"
            },
            {
              "name": "The Rickshank Rickdemption",
              "air_date": "April 1, 2017"
            },
            {
              "name": "Rickmancing the Stone",
              "air_date": "July 30, 2017"
            },
            {
              "name": "Pickle Rick",
              "air_date": "August 6, 2017"
            },
            {
              "name": "Vindicators 3: The Return of Worldender",
              "air_date": "August 13, 2017"
            },
            {
              "name": "The Whirly Dirly Conspiracy",
              "air_date": "August 20, 2017"
            },
            {
              "name": "Rest and Ricklaxation",
              "air_date": "August 27, 2017"
            },
            {
              "name": "The Ricklantis Mixup",
              "air_date": "September 10, 2017"
            },
            {
              "name": "Morty's Mind Blowers",
              "air_date": "September 17, 2017"
            },
            {
              "name": "The ABC's of Beth",
              "air_date": "September 24, 2017"
            },
            {
              "name": "The Rickchurian Mortydate",
              "air_date": "October 1, 2017"
            },
            {
              "name": "Edge of Tomorty: Rick, Die, Rickpeat",
              "air_date": "November 10, 2019"
            },
            {
              "name": "The Old Man and the Seat",
              "air_date": "November 17, 2019"
            },
            {
              "name": "One Crew Over the Crewcoo's Morty",
              "air_date": "November 24, 2019"
            },
            {
              "name": "Claw and Hoarder: Special Ricktim's Morty",
              "air_date": "December 8, 2019"
            },
            {
              "name": "Rattlestar Ricklactica",
              "air_date": "December 15, 2019"
            },
            {
              "name": "Never Ricking Morty",
              "air_date": "May 3, 2020"
            },
            {
              "name": "Promortyus",
              "air_date": "May 10, 2020"
            },
            {
              "name": "The Vat of Acid Episode",
              "air_date": "May 17, 2020"
            },
            {
              "name": "Childrick of Mort",
              "air_date": "May 24, 2020"
            },
            {
              "name": "Star Mort: Rickturn of the Jerri",
              "air_date": "May 31, 2020"
            },
            {
              "name": "Mort Dinner Rick Andre",
              "air_date": "June 20, 2021"
            },
            {
              "name": "Mortyplicity",
              "air_date": "June 27, 2021"
            },
            {
              "name": "A Rickconvenient Mort",
              "air_date": "July 4, 2021"
            },
            {
              "name": "Rickdependence Spray",
              "air_date": "July 11, 2021"
            },
            {
              "name": "Amortycan Grickfitti",
              "air_date": "July 18, 2021"
            },
            {
              "name": "Rick & Morty's Thanksploitation Spectacular",
              "air_date": "July 25, 2021"
            },
            {
              "name": "Gotron Jerrysis Rickvangelion",
              "air_date": "August 1, 2021"
            },
            {
              "name": "Rickternal Friendshine of the Spotless Mort",
              "air_date": "August 8, 2021"
            },
            {
              "name": "Forgetting Sarick Mortshall",
              "air_date": "September 5, 2021"
            },
            {
              "name": "Rickmurai Jack",
              "air_date": "September 5, 2021"
            }
          ]
        },
        {
          "name": "Summer Smith",
          "gender": "Female",
          "image": "https://rickandmortyapi.com/api/character/avatar/3.jpeg",
          "episode": [
            {
              "name": "Rick Potion #9",
              "air_date": "January 27, 2014"
            },
            {
              "name": "Raising Gazorpazorp",
              "air_date": "March 10, 2014"
            },
            {
              "name": "Rixty Minutes",
              "air_date": "March 17, 2014"
            },
            {
              "name": "Something Ricked This Way Comes",
              "air_date": "March 24, 2014"
            },
            {
              "name": "Close Rick-counters of the Rick Kind",
              "air_date": "April 7, 2014"
            },
            {
              "name": "Ricksy Business",
              "air_date": "April 14, 2014"
            },
            {
              "name": "A Rickle in Time",
              "air_date": "July 26, 2015"
            },
            {
              "name": "Auto Erotic Assimilation",
              "air_date": "August 9, 2015"
            },
            {
              "name": "Total Rickall",
              "air_date": "August 16, 2015"
            },
            {
              "name": "Get Schwifty",
              "air_date": "August 23, 2015"
            },
            {
              "name": "The Ricks Must Be Crazy",
              "air_date": "August 30, 2015"
            },
            {
              "name": "Big Trouble in Little Sanchez",
              "air_date": "September 13, 2015"
            },
            {
              "name": "Interdimensional Cable 2: Tempting Fate",
              "air_date": "September 20, 2015"
            },
            {
              "name": "Look Who's Purging Now",
              "air_date": "September 27, 2015"
            },
            {
              "name": "The Wedding Squanchers",
              "air_date": "October 4, 2015"
            },
            {
              "name": "The Rickshank Rickdemption",
              "air_date": "April 1, 2017"
            },
            {
              "name": "Rickmancing the Stone",
              "air_date": "July 30, 2017"
            },
            {
              "name": "Pickle Rick",
              "air_date": "August 6, 2017"
            },
            {
              "name": "Vindicators 3: The Return of Worldender",
              "air_date": "August 13, 2017"
            },
            {
              "name": "The Whirly Dirly Conspiracy",
              "air_date": "August 20, 2017"
            },
            {
              "name": "Rest and Ricklaxation",
              "air_date": "August 27, 2017"
            },
            {
              "name": "Morty's Mind Blowers",
              "air_date": "September 17, 2017"
            },
            {
              "name": "The ABC's of Beth",
              "air_date": "September 24, 2017"
            },
            {
              "name": "The Rickchurian Mortydate",
              "air_date": "October 1, 2017"
            },
            {
              "name": "Edge of Tomorty: Rick, Die, Rickpeat",
              "air_date": "November 10, 2019"
            },
            {
              "name": "The Old Man and the Seat",
              "air_date": "November 17, 2019"
            },
            {
              "name": "One Crew Over the Crewcoo's Morty",
              "air_date": "November 24, 2019"
            },
            {
              "name": "Claw and Hoarder: Special Ricktim's Morty",
              "air_date": "December 8, 2019"
            },
            {
              "name": "Rattlestar Ricklactica",
              "air_date": "December 15, 2019"
            },
            {
              "name": "Promortyus",
              "air_date": "May 10, 2020"
            },
            {
              "name": "The Vat of Acid Episode",
              "air_date": "May 17, 2020"
            },
            {
              "name": "Childrick of Mort",
              "air_date": "May 24, 2020"
            },
            {
              "name": "Star Mort: Rickturn of the Jerri",
              "air_date": "May 31, 2020"
            },
            {
              "name": "Mort Dinner Rick Andre",
              "air_date": "June 20, 2021"
            },
            {
              "name": "Mortyplicity",
              "air_date": "June 27, 2021"
            },
            {
              "name": "A Rickconvenient Mort",
              "air_date": "July 4, 2021"
            },
            {
              "name": "Rickdependence Spray",
              "air_date": "July 11, 2021"
            },
            {
              "name": "Amortycan Grickfitti",
              "air_date": "July 18, 2021"
            },
            {
              "name": "Rick & Morty's Thanksploitation Spectacular",
              "air_date": "July 25, 2021"
            },
            {
              "name": "Gotron Jerrysis Rickvangelion",
              "air_date": "August 1, 2021"
            },
            {
              "name": "Rickternal Friendshine of the Spotless Mort",
              "air_date": "August 8, 2021"
            },
            {
              "name": "Rickmurai Jack",
              "air_date": "September 5, 2021"
            }
          ]
        },
        {
          "name": "Beth Smith",
          "gender": "Female",
          "image": "https://rickandmortyapi.com/api/character/avatar/4.jpeg",
          "episode": [
            {
              "name": "Rick Potion #9",
              "air_date": "January 27, 2014"
            },
            {
              "name": "Raising Gazorpazorp",
              "air_date": "March 10, 2014"
            },
            {
              "name": "Rixty Minutes",
              "air_date": "March 17, 2014"
            },
            {
              "name": "Something Ricked This Way Comes",
              "air_date": "March 24, 2014"
            },
            {
              "name": "Close Rick-counters of the Rick Kind",
              "air_date": "April 7, 2014"
            },
            {
              "name": "Ricksy Business",
              "air_date": "April 14, 2014"
            },
            {
              "name": "A Rickle in Time",
              "air_date": "July 26, 2015"
            },
            {
              "name": "Auto Erotic Assimilation",
              "air_date": "August 9, 2015"
            },
            {
              "name": "Total Rickall",
              "air_date": "August 16, 2015"
            },
            {
              "name": "Get Schwifty",
              "air_date": "August 23, 2015"
            },
            {
              "name": "Big Trouble in Little Sanchez",
              "air_date": "September 13, 2015"
            },
            {
              "name": "Interdimensional Cable 2: Tempting Fate",
              "air_date": "September 20, 2015"
            },
            {
              "name": "Look Who's Purging Now",
              "air_date": "September 27, 2015"
            },
            {
              "name": "The Wedding Squanchers",
              "air_date": "October 4, 2015"
            },
            {
              "name": "The Rickshank Rickdemption",
              "air_date": "April 1, 2017"
            },
            {
              "name": "Rickmancing the Stone",
              "air_date": "July 30, 2017"
            },
            {
              "name": "Pickle Rick",
              "air_date": "August 6, 2017"
            },
            {
              "name": "Vindicators 3: The Return of Worldender",
              "air_date": "August 13, 2017"
            },
            {
              "name": "The Whirly Dirly Conspiracy",
              "air_date": "August 20, 2017"
            },
            {
              "name": "Rest and Ricklaxation",
              "air_date": "August 27, 2017"
            },
            {
              "name": "The Ricklantis Mixup",
              "air_date": "September 10, 2017"
            },
            {
              "name": "Morty's Mind Blowers",
              "air_date": "September 17, 2017"
            },
            {
              "name": "The ABC's of Beth",
              "air_date": "September 24, 2017"
            },
            {
              "name": "The Rickchurian Mortydate",
              "air_date": "October 1, 2017"
            },
            {
              "name": "Edge of Tomorty: Rick, Die, Rickpeat",
              "air_date": "November 10, 2019"
            },
            {
              "name": "The Old Man and the Seat",
              "air_date": "November 17, 2019"
            },
            {
              "name": "One Crew Over the Crewcoo's Morty",
              "air_date": "November 24, 2019"
            },
            {
              "name": "Claw and Hoarder: Special Ricktim's Morty",
              "air_date": "December 8, 2019"
            },
            {
              "name": "Rattlestar Ricklactica",
              "air_date": "December 15, 2019"
            },
            {
              "name": "Promortyus",
              "air_date": "May 10, 2020"
            },
            {
              "name": "The Vat of Acid Episode",
              "air_date": "May 17, 2020"
            },
            {
              "name": "Childrick of Mort",
              "air_date": "May 24, 2020"
            },
            {
              "name": "Star Mort: Rickturn of the Jerri",
              "air_date": "May 31, 2020"
            },
            {
              "name": "Mort Dinner Rick Andre",
              "air_date": "June 20, 2021"
            },
            {
              "name": "Mortyplicity",
              "air_date": "June 27, 2021"
            },
            {
              "name": "A Rickconvenient Mort",
              "air_date": "July 4, 2021"
            },
            {
              "name": "Rickdependence Spray",
              "air_date": "July 11, 2021"
            },
            {
              "name": "Amortycan Grickfitti",
              "air_date": "July 18, 2021"
            },
            {
              "name": "Rick & Morty's Thanksploitation Spectacular",
              "air_date": "July 25, 2021"
            },
            {
              "name": "Gotron Jerrysis Rickvangelion",
              "air_date": "August 1, 2021"
            },
            {
              "name": "Rickternal Friendshine of the Spotless Mort",
              "air_date": "August 8, 2021"
            },
            {
              "name": "Rickmurai Jack",
              "air_date": "September 5, 2021"
            }
          ]
        },
        {
          "name": "Jerry Smith",
          "gender": "Male",
          "image": "https://rickandmortyapi.com/api/character/avatar/5.jpeg",
          "episode": [
            {
              "name": "Rick Potion #9",
              "air_date": "January 27, 2014"
            },
            {
              "name": "Raising Gazorpazorp",
              "air_date": "March 10, 2014"
            },
            {
              "name": "Rixty Minutes",
              "air_date": "March 17, 2014"
            },
            {
              "name": "Something Ricked This Way Comes",
              "air_date": "March 24, 2014"
            },
            {
              "name": "Close Rick-counters of the Rick Kind",
              "air_date": "April 7, 2014"
            },
            {
              "name": "Ricksy Business",
              "air_date": "April 14, 2014"
            },
            {
              "name": "A Rickle in Time",
              "air_date": "July 26, 2015"
            },
            {
              "name": "Mortynight Run",
              "air_date": "August 2, 2015"
            },
            {
              "name": "Auto Erotic Assimilation",
              "air_date": "August 9, 2015"
            },
            {
              "name": "Total Rickall",
              "air_date": "August 16, 2015"
            },
            {
              "name": "Get Schwifty",
              "air_date": "August 23, 2015"
            },
            {
              "name": "Big Trouble in Little Sanchez",
              "air_date": "September 13, 2015"
            },
            {
              "name": "Interdimensional Cable 2: Tempting Fate",
              "air_date": "September 20, 2015"
            },
            {
              "name": "Look Who's Purging Now",
              "air_date": "September 27, 2015"
            },
            {
              "name": "The Wedding Squanchers",
              "air_date": "October 4, 2015"
            },
            {
              "name": "The Rickshank Rickdemption",
              "air_date": "April 1, 2017"
            },
            {
              "name": "Rickmancing the Stone",
              "air_date": "July 30, 2017"
            },
            {
              "name": "The Whirly Dirly Conspiracy",
              "air_date": "August 20, 2017"
            },
            {
              "name": "Morty's Mind Blowers",
              "air_date": "September 17, 2017"
            },
            {
              "name": "The ABC's of Beth",
              "air_date": "September 24, 2017"
            },
            {
              "name": "The Rickchurian Mortydate",
              "air_date": "October 1, 2017"
            },
            {
              "name": "Edge of Tomorty: Rick, Die, Rickpeat",
              "air_date": "November 10, 2019"
            },
            {
              "name": "The Old Man and the Seat",
              "air_date": "November 17, 2019"
            },
            {
              "name": "Claw and Hoarder: Special Ricktim's Morty",
              "air_date": "December 8, 2019"
            },
            {
              "name": "Rattlestar Ricklactica",
              "air_date": "December 15, 2019"
            },
            {
              "name": "Promortyus",
              "air_date": "May 10, 2020"
            },
            {
              "name": "The Vat of Acid Episode",
              "air_date": "May 17, 2020"
            },
            {
              "name": "Childrick of Mort",
              "air_date": "May 24, 2020"
            },
            {
              "name": "Star Mort: Rickturn of the Jerri",
              "air_date": "May 31, 2020"
            },
            {
              "name": "Mort Dinner Rick Andre",
              "air_date": "June 20, 2021"
            },
            {
              "name": "Mortyplicity",
              "air_date": "June 27, 2021"
            },
            {
              "name": "A Rickconvenient Mort",
              "air_date": "July 4, 2021"
            },
            {
              "name": "Rickdependence Spray",
              "air_date": "July 11, 2021"
            },
            {
              "name": "Amortycan Grickfitti",
              "air_date": "July 18, 2021"
            },
            {
              "name": "Rick & Morty's Thanksploitation Spectacular",
              "air_date": "July 25, 2021"
            },
            {
              "name": "Gotron Jerrysis Rickvangelion",
              "air_date": "August 1, 2021"
            },
            {
              "name": "Rickternal Friendshine of the Spotless Mort",
              "air_date": "August 8, 2021"
            },
            {
              "name": "Forgetting Sarick Mortshall",
              "air_date": "September 5, 2021"
            },
            {
              "name": "Rickmurai Jack",
              "air_date": "September 5, 2021"
            }
          ]
        },
        {
          "name": "Abadango Cluster Princess",
          "gender": "Female",
          "image": "https://rickandmortyapi.com/api/character/avatar/6.jpeg",
          "episode": [
            {
              "name": "Rest and Ricklaxation",
              "air_date": "August 27, 2017"
            }
          ]
        },
        {
          "name": "Abradolf Lincler",
          "gender": "Male",
          "image": "https://rickandmortyapi.com/api/character/avatar/7.jpeg",
          "episode": [
            {
              "name": "Close Rick-counters of the Rick Kind",
              "air_date": "April 7, 2014"
            },
            {
              "name": "Ricksy Business",
              "air_date": "April 14, 2014"
            }
          ]
        },
        {
          "name": "Adjudicator Rick",
          "gender": "Male",
          "image": "https://rickandmortyapi.com/api/character/avatar/8.jpeg",
          "episode": [
            {
              "name": "The Ricklantis Mixup",
              "air_date": "September 10, 2017"
            }
          ]
        },
        {
          "name": "Agency Director",
          "gender": "Male",
          "image": "https://rickandmortyapi.com/api/character/avatar/9.jpeg",
          "episode": [
            {
              "name": "Pickle Rick",
              "air_date": "August 6, 2017"
            }
          ]
        },
        {
          "name": "Alan Rails",
          "gender": "Male",
          "image": "https://rickandmortyapi.com/api/character/avatar/10.jpeg",
          "episode": [
            {
              "name": "Vindicators 3: The Return of Worldender",
              "air_date": "August 13, 2017"
            }
          ]
        },
        {
          "name": "Albert Einstein",
          "gender": "Male",
          "image": "https://rickandmortyapi.com/api/character/avatar/11.jpeg",
          "episode": [
            {
              "name": "A Rickle in Time",
              "air_date": "July 26, 2015"
            }
          ]
        },
        {
          "name": "Alexander",
          "gender": "Male",
          "image": "https://rickandmortyapi.com/api/character/avatar/12.jpeg",
          "episode": [
            {
              "name": "Anatomy Park",
              "air_date": "December 16, 2013"
            }
          ]
        },
        {
          "name": "Alien Googah",
          "gender": "unknown",
          "image": "https://rickandmortyapi.com/api/character/avatar/13.jpeg",
          "episode": [
            {
              "name": "The Rickchurian Mortydate",
              "air_date": "October 1, 2017"
            }
          ]
        },
        {
          "name": "Alien Morty",
          "gender": "Male",
          "image": "https://rickandmortyapi.com/api/character/avatar/14.jpeg",
          "episode": [
            {
              "name": "Close Rick-counters of the Rick Kind",
              "air_date": "April 7, 2014"
            }
          ]
        },
        {
          "name": "Alien Rick",
          "gender": "Male",
          "image": "https://rickandmortyapi.com/api/character/avatar/15.jpeg",
          "episode": [
            {
              "name": "Close Rick-counters of the Rick Kind",
              "air_date": "April 7, 2014"
            }
          ]
        },
        {
          "name": "Amish Cyborg",
          "gender": "Male",
          "image": "https://rickandmortyapi.com/api/character/avatar/16.jpeg",
          "episode": [
            {
              "name": "Total Rickall",
              "air_date": "August 16, 2015"
            }
          ]
        },
        {
          "name": "Annie",
          "gender": "Female",
          "image": "https://rickandmortyapi.com/api/character/avatar/17.jpeg",
          "episode": [
            {
              "name": "Anatomy Park",
              "air_date": "December 16, 2013"
            }
          ]
        },
        {
          "name": "Antenna Morty",
          "gender": "Male",
          "image": "https://rickandmortyapi.com/api/character/avatar/18.jpeg",
          "episode": [
            {
              "name": "Close Rick-counters of the Rick Kind",
              "air_date": "April 7, 2014"
            },
            {
              "name": "The Ricklantis Mixup",
              "air_date": "September 10, 2017"
            }
          ]
        },
        {
          "name": "Antenna Rick",
          "gender": "Male",
          "image": "https://rickandmortyapi.com/api/character/avatar/19.jpeg",
          "episode": [
            {
              "name": "Close Rick-counters of the Rick Kind",
              "air_date": "April 7, 2014"
            }
          ]
        },
        {
          "name": "Ants in my Eyes Johnson",
          "gender": "Male",
          "image": "https://rickandmortyapi.com/api/character/avatar/20.jpeg",
          "episode": [
            {
              "name": "Rixty Minutes",
              "air_date": "March 17, 2014"
            }
          ]
        }
];
        
