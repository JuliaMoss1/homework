function getGQL(endpoint) {
  function gql(query, variables = {}) {
    return fetch(`${endpoint}`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        ...(store.getState().auth.token ?  {authorization: "Bearer " + store.getState().auth.token} : {}) 
      },
      body: JSON.stringify({ query, variables })
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error();
      })
      .then((data) => {
        if (!data.data && data.errors) {
          throw new Error( JSON.stringify(data.errors))
        }
        return Object.values(data.data)[0];
      })
      
  }
  return gql;
}

//const endpoint= "http://shop-roles.node.ed.asmer.org.ua/";
//const gql = getGQL(endpoint + "graphql");


const actionRootCategories = () => 
  actionPromise("rootCats", gql(
    `query categories{
      CategoryFind(query: "[{\\"parent\\": null}]") {
        _id name
      }
    }`
  )
);

const actionOneCategory = (_id) =>
  actionPromise("oneCat", gql(
    `query category($q: String) {
      CategoryFindOne(query: $q) {
        name
        goods {
          _id
          name
          price
          images {url}
        }   
      }
    }`,
    {q: JSON.stringify([{_id}])}
  )
);

const actionOneGood = (_id) =>
  actionPromise("oneGood", gql(
    `query good($q: String) {
      GoodFindOne(query: $q) {
        _id
        name
        description
        price
        images {url}
      }
    }`,
    {q: JSON.stringify([{_id}])}
  )
);

const actionRegister = (login, password) =>
  actionPromise("authorization", gql(
    `mutation register($login: String, $password: String) {
      UserUpsert(user: {login: $login, password: $password}) {
        _id
        login
      }
    }`,
    { login, password }
  )
);

const actionLogin = (login, password) =>
  actionPromise("login", gql(
    `query login($login: String, $password: String) {
      login(login: $login, password: $password)
    }`,
    { login, password }
  )
);

const actionOrderHistory = () =>
  actionPromise("orderHistory", gql(
    `query orders {
      OrderFind(query: "[{}]") {
        _id
        total
        createdAt
        orderGoods {
          good {
            _id
            name
          }
          price
          count
          total
        }
      }
    }`
  )
);

const actionNewOrder = (orderGoods) =>
  actionPromise("newOrder", gql(
    `mutation newOrder($orderGoods: [OrderGoodInput]) {
      OrderUpsert(order: {
        orderGoods: $orderGoods
      }) {
        _id 
      }
    }`,
    { orderGoods }
  )
);

const actionFullOrder = () =>
  async (dispatch, getState) => {
    const { cart} = getState();
    const orderGoods = Object.values(cart).map(({count, good: { _id} })=>({count, good: { _id}}));
    const response = await dispatch(actionNewOrder(orderGoods));
    console.log(response);
    if (response) {
      dispatch(actionCartClear());
    };   
};

function createStore(reducer){
  let state       = reducer(undefined, {}) //стартовая инициализация состояния, запуск редьюсера со state === undefined
  let cbs         = []                     //массив подписчиков
  
  const getState  = () => state            //функция, возвращающая переменную из замыкания
  const subscribe = cb => (cbs.push(cb),   //запоминаем подписчиков в массиве
                           () => cbs = cbs.filter(c => c !== cb)) //возвращаем функцию unsubscribe, которая удаляет подписчика из списка
                           
  const dispatch  = action => { 
      if (typeof action === 'function'){ //если action - не объект, а функция
          return action(dispatch, getState) //запускаем эту функцию и даем ей dispatch и getState для работы
      }
      const newState = reducer(state, action) //пробуем запустить редьюсер
      if (newState !== state){ //проверяем, смог ли редьюсер обработать action
          state = newState //если смог, то обновляем state 
          for (let cb of cbs)  cb(state) //и запускаем подписчиков
      }
  }
  
  return {
      getState, //добавление функции getState в результирующий объект
      dispatch,
      subscribe //добавление subscribe в объект
  }
};

function combineReducers(reducers){
  function totalReducer(state={}, action){
      const newTotalState = {}
      for (const [reducerName, reducer] of Object.entries(reducers)){
          const newSubState = reducer(state[reducerName], action)
          if (newSubState !== state[reducerName]){
              newTotalState[reducerName] = newSubState
          }
      };
      if (Object.keys(newTotalState).length){
          return {...state, ...newTotalState}
      };
      return state;
  };

  return totalReducer;
};


const reducers = {
  promise: promiseReducer, //допилить много имен для многих промисо
  auth: authReducer,     //часть предыдущего ДЗ
  cart: localStoredReducer(cartReducer, "cart"),  //часть предыдущего ДЗ
}


function promiseReducer(state={}, {type, status, payload, error, promiseName}){
  if (type === 'PROMISE'){
      return {...state, [promiseName]: {status, payload, error} };
  }
  return state
};


const actionPromise = (promiseName, promise) => async (dispatch) => {
  dispatch(actionPending(promiseName));
  try {
    const payload = await promise;
    dispatch(actionFulfilled(promiseName, payload));
    return payload;
  }
  catch (error){
    dispatch(actionRejected(promiseName, error));
  }
};

const actionPending  = (promiseName) => ({
  type: 'PROMISE',
  status: 'PENDING',
  promiseName
});

const actionFulfilled = (promiseName, payload) => ({
  type: 'PROMISE',
  status: 'FULFILLED',
  payload,
  promiseName
});

const actionRejected  = (promiseName, error)   => ({
  type: 'PROMISE',
  status: 'REJECTED',
  error,
  promiseName
});

const totalReducer = combineReducers(reducers);
const store = createStore(totalReducer);
store.subscribe(()=> console.log(store.getState()));

store.dispatch(actionRootCategories());

store.subscribe(() => {
  const {status, payload, error} = store.getState().promise.rootCats || {};

  if (status === 'PENDING'){
    aside.innerHTML = `<img src='https://cdn.dribbble.com/users/63485/screenshots/1309731/infinite-gif-preloader.gif' />`;
  }
  if (status === 'FULFILLED' && payload){
      aside.innerHTML = " ";
      for (const { _id, name} of payload){
          aside.innerHTML += `<a href="#/category/${_id}">${name}</a>`
      }
  } 
  else if (status === 'REJECTED') {
    aside.innerHTML = `<p>Помилка завантаження категорій: ${error}</p>`;
  };
});

window.onhashchange = () => {
  const [,route, _id] = location.hash.split('/')

  const routes = {  
    category() {
      store.dispatch(actionOneCategory(_id));
      console.log(route, _id);
    },

    good(){
      store.dispatch(actionOneGood(_id));
      console.log('good', _id);
    },
     
    cart(){
      console.log(store.getState().card);
      drawCart();
    },
    
    login(){
      console.log('А ТУТ ЩА ДОЛЖНА БЫТЬ ФОРМА ЛОГИНА')
      drawLogin(); //нарисовать форму логина, которая по нажатию кнопки Login делает store.dispatch(actionFullLogin(login, password))
    },

    register(){
      console.log("Треба зареєструватись!");
      drawRegister(); //нарисовать форму регистрации, которая по нажатию кнопки Login делает store.dispatch(actionFullRegister(login, password))
    },
   
   history(){
      console.log( "твоя історія");
      store.dispatch(actionOrderHistory());
    }
  };

  if (route in routes){
     routes[route]();
  }
};
window.onhashchange();


const drawCategory = () => {
  const [,route] = location.hash.split('/');
  if (route !== 'category') return;

  const {status, payload, error } = store.getState().promise.oneCat || {};

  if (status === 'PENDING'){
    main.innerHTML = `<img src='https://cdn.dribbble.com/users/63485/screenshots/1309731/infinite-gif-preloader.gif' />`;
  };

  if (status === 'FULFILLED'){
    const {name, goods} = payload;
    main.innerHTML = `<div style="display: flex; width: 100%;"><h1>${name}</h1></div>`;
    main.style = "display: flex; width: 100%; justify-content: flex-start; margin: 10px 50px 20px; gap: 25px; flex-wrap: wrap; align-items: center;";        
      
    for (const good of goods) {
      const { _id, name, price, images} = good;
       const sectionCat = document.createElement("section");         
      sectionCat.style = "display: flex; align-items: center;"
      main.append(sectionCat);
      const divCat = document.createElement("div");
      divCat.innerHTML = `<a href="#/good/${_id}">${name}</a>
                         <img src= "${endpoint}${images[0].url}"/>
                         <strong>${price} грн.</strong>`;
                         
      divCat.style = "display: flex; justify-content: space-between;  width: 300px; height: 350px; flex-direction: column; align-items: center; border-radius: 10px; overflow: hidden; box-shadow: 5px 5px 20px 1px rgb(0 0 0 / 30%); padding: 20px; gap: 20px";
      sectionCat.append(divCat);
      const button = document.createElement("button");
      button.innerText = "Дoдати в кошик";
      divCat.append(button);
      button.onclick = () => store.dispatch(actionCartAdd(good));
    };
  }
  else if (status === 'REJECTED') {
    main.innerHTML = `<p>Помилка завантаження категорї: ${error}</p>`;
  };
};
store.subscribe(drawCategory);


const drawGood = () => {
  const [,route] = location.hash.split('/');
  if (route !== 'good') return;

  const { status, payload, error } = store.getState().promise.oneGood || {};

  if (status === 'PENDING'){
    main.innerHTML = `<img src='https://cdn.dribbble.com/users/63485/screenshots/1309731/infinite-gif-preloader.gif' />`;
  };

  if (status === 'FULFILLED'){
    const { _id, name, price, description, images} = payload;
    main.style = "display: flex; width: 100%; flex-direction: column; align-items: center; padding: 20px;";          
    main.innerHTML = `
                <section style="display: flex; flex-direction: column; align-items: center; border-radius: 10px; overflow: hidden; box-shadow: 5px 5px 20px 1px rgb(0 0 0 / 30%); padding: 25px; gap: 20px;>
                  <h1>${name}</h1>
                  <a href="#/good/${_id}">${name}</a>
                  <img src="${endpoint}${images[0].url}"/>
                  <strong>${price} грн.</strong>
                  <p>${description}</p>
                  <button id="addToCartButton">Додати у кошик</button>
                </section>`; 
    const button = document.getElementById("addToCartButton");
    button.onclick = ()=> store.dispatch(actionCartAdd(payload));
  }
  else if (status === 'REJECTED') {
    main.innerHTML = `<p>Помилка завантаження інформації про товар: ${error}</p>`;
  };
};
store.subscribe(drawGood);


function drawCart(){
  const [, route] = location.hash.split('/');
  if (route !== 'cart') return;
  main.innerHTML = "";
  main.style = 'display: flex; width: 100%; align-items: center; justify-content: center; flex-direction: column; fond-size: 15px; gap: 10px;';
  const cart = store.getState().cart;

  if (Object.keys(cart).length > 0) {
    main.innerHTML = '<h2>ВАШ КОШИК</h2>';
    let total = 0;
    for (const { good, count } of Object.values(cart)) {
      const { _id, name, price, images} = good;
      const divCard = document.createElement("div");
      divCard.style = "display: flex; width: 600px; align-items: center; justify-content: flex-end; border-radius: 10px; box-shadow: 5px 5px 20px 1px rgb(0 0 0 / 15%); padding: 20px; gap: 15px;";
      divCard.innerHTML =`
               <a href="#/good/${_id}">${name}</a>
               <img src="${endpoint}${images[0].url}"  height = "50px" />
               <strong style="white-space: nowrap;">Ціна: ${price} грн.
               ${count > 1 ? `<div>Загальна ціна: ${price * count} грн.</div>` : ''}</strong>`;
      main.append(divCard);
      total += price * count;

      const divCount = document.createElement("div");
      divCount.style = "display: flex;"
      const buttonMinus = document.createElement("button");
      const inputCount = document.createElement("input");
      const buttonPlus = document.createElement("button");

      buttonMinus.innerText = "-";
      inputCount.value = `${count}`;
      inputCount.style = "width: 25px;"
      buttonPlus.innerText = "+";

      divCount.append(buttonMinus);
      divCount.append(inputCount);
      divCount.append(buttonPlus);

      divCard.append(divCount);

      buttonMinus.onclick = () => store.dispatch(actionCartSub(good));
      buttonPlus.onclick = () => store.dispatch(actionCartAdd(good));
      inputCount.onchange = () => store.dispatch(actionCartSet(good, parseInt(inputCount.value, 10)));

      const buttonDel= document.createElement("button");
      buttonDel.innerHTML = '\u{1F5D1}';
      divCard.append(buttonDel);
      buttonDel.onclick = () => store.dispatch(actionCartDel(good));
    };
    
    const totalPriceDiv = document.createElement("div");
    totalPriceDiv.innerHTML = `<strong>Загальна вартість товарів у кошику: ${total} грн.</strong>`;
    main.append(totalPriceDiv);

    const buttonOrder = document.createElement("button");
    buttonOrder.innerText = "Оформити замовлення";
    main.append(buttonOrder);
    buttonOrder.onclick = () => {
      if (store.getState().auth.token) {
        store.dispatch(actionFullOrder());
      } 
      else {
        alert("Увійдіть або зареєструйтесь, щоб оформити замовлення.");
      } 
    };

    const buttonClear = document.createElement("button");
    buttonClear.innerText = "Очистити кошик";
    main.append(buttonClear);
    buttonClear.onclick = () => store.dispatch(actionCartClear());
  } 

  else {
    main.innerHTML = "<h2>КОШИК ПОРОЖНІЙ</h2>"
  }

};
store.subscribe(drawCart);



const actionCartAdd = (good, count=1) => ({type: 'CART_ADD', count, good});
const actionCartSub = (good, count=1) => ({type: 'CART_SUB', count, good});
const actionCartDel = (good) => ({type: 'CART_DEL', good});
const actionCartSet = (good, count=1) => ({type: 'CART_SET', count, good});
const actionCartClear = () => ({type: 'CART_CLEAR'});


function cartReducer(state = {}, { type, good, count }) {
  if (type === 'CART_ADD') {
    return {
      ...state,
      [good._id]: { 
        good,
        count: state[good._id] ? state[good._id].count + count : count
      }
    };
  }
 
  if (type === 'CART_SUB') {
    const { _id } = good;
    if (!state[_id]) return state;

    const newCount = state[_id].count - count;
    if (newCount <= 0) {
      const { [_id]: _, ...rest } = state;
      return rest;
    }

    return {
      ...state,
      [_id]: {
        good,
        count: newCount
      }
    };
  }

  if (type === 'CART_DEL') {
    const { _id } = good;
    const { [_id]: _, ...rest } = state;
    return rest;
  }

  if (type === 'CART_SET') {
    const { _id } = good;
    if (count <= 0) {
      const { [_id]: _, ...rest } = state;
      return rest;
    }

    return {
      ...state,
      [_id]: {
        good,
        count
      }
    };
  }

  if (type === 'CART_CLEAR') {
    return {};
  }

  return state;
};


function jwtDecode(token) {
  try {
      if (typeof token !== 'string') return undefined;
      const parts = token.split('.');
      if (parts.length !== 3) return undefined;
      const decodedBase64 = atob(parts[1]);
      return JSON.parse(decodedBase64);
  } 
  catch (e) {
      return undefined;
  }
}

const actionAuthLogin  = token => ({type: 'AUTH_LOGIN', token});
const actionAuthLogout = ()    => ({type: 'AUTH_LOGOUT'});

function authReducer(state = {}, {type, token }) {
  if (type === 'AUTH_LOGIN') {
    if (jwtDecode(token)){
      return { token, payload: jwtDecode(token)};
    }
    return state;
  }
  else if ( type === 'AUTH_LOGOUT') {
    return {};
  }
  return state;
};


function localStoredReducer(originalReducer, localStorageKey){
  function wrapper(state, action){
    if (state === undefined) {
      try {
         return JSON.parse(localStorage[localStorageKey])
      } catch {}
    }
    const newState = originalReducer(state,action);
    localStorage[localStorageKey] = JSON.stringify(newState);
    return newState;
  }
  return wrapper;
};


function Password(parent, open) {
  this.input = document.createElement('input');
  this.input.type = 'password';
  this.input.placeholder = 'password';
  parent.appendChild(this.input);

  this.toggleButton = document.createElement('button');
  this.toggleButton.textContent = '\u{1F441}';
  parent.appendChild(this.toggleButton);

  this.input.addEventListener('input', () => {
      if (this.onChange) {
          this.onChange(this.input.value);
      }
  });

  this.toggleButton.addEventListener('click', () => {
      if (this.input.type === 'password') {
          this.input.type = 'text';
      } else {
          this.input.type = 'password';
      }
      if (this.onOpenChange) {
          this.onOpenChange(this.input.type === 'text');
      }
  });

  this.setValue = function(value) {
      this.input.value = value;
      if (this.onChange) {
          this.onChange(value);
      }
  };

  this.getValue = function() {
      return this.input.value;
  };

  this.setOpen = function(isOpen) {
      this.input.type = isOpen ? 'text' : 'password';
      if (this.onOpenChange) {
          this.onOpenChange(isOpen);
      }
  };

  this.getOpen = function() {
      return this.input.type === 'text';
  };

  this.setStyle = function(styleObject) {
      Object.assign(this.input.style, styleObject);
  };

  this.setValue('');
  this.setOpen(open);
};

function LoginForm(parent) {
  const loginInput = document.createElement('input');
  loginInput.type = 'text';
  loginInput.placeholder = 'login';
  parent.appendChild(loginInput);

  const passwordInput = new Password(parent, false);

  const submitButton = document.createElement('button');
  submitButton.innerText = 'УВІЙТИ';
  submitButton.disabled = true; 
  parent.appendChild(submitButton);

  let login = '';
  let password = '';

  const updateButtonState = () => {
    submitButton.disabled = !(login && password);
  };

  Object.defineProperty(this, 'login', {
    get: () => login,
    set: (value) => {
      login = value;
      updateButtonState();
    }
  });

  Object.defineProperty(this, 'password', {
    get: () => password,
    set: (value) => {
      password = value;
      updateButtonState();
    }
  });

  loginInput.addEventListener('input', (e) => {
    this.login = e.target.value;
  });

  passwordInput.onChange = (data) => {
    this.password = data;
  };

  submitButton.addEventListener('click', () => {
    console.log(`Login: ${this.login}, Password: ${this.password}`);
    if (this.onclick) {
      this.onclick(this.login, this.password);
    }
  });
};


function drawLogin() {
  const [, route] = location.hash.split('/');
  if (route !== 'login') return;
  main.innerHTML = "";
  
  if (store.getState().auth.token){
    location.hash = "#/category";
    return;
  }
  const loginForm = new LoginForm(main);
  main.style = `display: flex; width: 100%; justify-content: center; align-items: center; gap: 5px;`;
  loginForm.onclick = (login, password) => {
    store.dispatch(actionFullLogin(login, password));
  };
};

const actionFullLogin = (login, password) => async(dispatch, getState) => {
  const token = await dispatch(actionLogin(login, password));
  dispatch(actionAuthLogin(token));
};

store.subscribe(drawLogin);


function drawRegister() {
  const [, route] = location.hash.split('/');
  if (route !== "register") return;
  main.innerHTML = ""; 

  if (store.getState().auth.token) {
    location.hash = "#/category";
    return;
  };

  const login = document.createElement("input");
  login.placeholder = "login";
  main.append(login);
  main.style = `display: flex; width: 100%; justify-content: center; flex-direction: column; align-items: center; gap: 5px;`;

  const password = new Password(main, false);
  
  const repeatPassword = document.createElement("input");
  repeatPassword.type = "password";
  repeatPassword.placeholder = "repeat password";
  main.append(repeatPassword);

  const button = document.createElement("button");
  button.innerText = "ЗАРЕЄСТРУВАТИСЯ";
  button.disabled = true;
  main.append(button);

  password.onOpenChange = (open) => {
    repeatPassword.style.display = open ? 'none' : 'inline';
  };
  
  const validateInputs = () => {
    if (repeatPassword.value === password.getValue() || repeatPassword.value === "") {
      password.setStyle({ border: "1px solid grey" });
      repeatPassword.style.border = "1px solid grey";
    } 
    else {
      password.setStyle({ border: "1px solid red" });
      repeatPassword.style.border = "1px solid red";
    }
    button.disabled = !(repeatPassword.value === password.getValue() &&
                       password.getValue().trim().length > 0 &&
                       repeatPassword.value.trim().length > 0 &&
                       login.value.trim().length > 0);
  };

  password.onChange = validateInputs;
  repeatPassword.oninput = validateInputs;
  login.oninput = validateInputs;

  button.onclick = () => {
    store.dispatch(actionFullRegister(login.value, password.getValue()));
    location.hash = "#/category";
  };
};

const actionFullRegister = (login, password) => async (dispatch) => {
  await dispatch(actionRegister(login, password));
  dispatch(actionFullLogin(login, password));
};

const cartIcon = document.getElementById("cartIcon");
const buttonRegister= document.getElementById("register");
const buttonLogin = document.getElementById("login");
const buttonHistory = document.getElementById("history");

const buttonLogout = document.getElementById("logout");
buttonLogout.onclick = () => {
  store.dispatch(actionAuthLogout());
  console.log("ви вийшли");
  location.hash = "#/category";
};

const drawHistory = () => {
  const [, route] = location.hash.split('/');
  if (route !== "history") return;
  main.innerHTML = ""; 
  const { status, payload, error} = store.getState().promise.orderHistory|| {};
  main.style = ` display: flex; width: 100%; justify-content: center; flex-direction: column; align-items: center; gap: 5px;`;
      
  if (status === 'PENDING'){
    main.innerHTML = `<img src='https://cdn.dribbble.com/users/63485/screenshots/1309731/infinite-gif-preloader.gif' />`;
  }

  else if (status === 'FULFILLED') {
    if (payload.length > 0) {
      main.innerHTML = "<h1>Історія замовлень</h1>";

      const table = document.createElement('table');
      table.style = "width: 90%;";
      table.setAttribute('border', '1');

      const headerRow = document.createElement('tr');
      headerRow.innerHTML = `
                          <th>НАЗВА ТОВАРУ</th>
                          <th>ЦІНА</th>
                          <th>КІЛЬКІСТЬ</th>
                          <th>ВСЬОГО</th>`;
      table.append(headerRow);

      for (const { _id, total, createdAt, orderGoods } of payload) {
        for (const { good, price, count } of orderGoods) {
          const goodRow = document.createElement('tr');
          goodRow.innerHTML = `
                           <td>${good.name}</td>
                           <td>${price} грн.</td>
                           <td>${count} шт.</td>
                           <td>${price * count} грн.</td>`;
          table.append(goodRow);
        };
        
        const date = new Date(Number(createdAt));
        const formattedDate = !isNaN(date.getTime())
          ? date.toLocaleString('uk-UA', {
              year: 'numeric',
              month: 'long',
              day: '2-digit',
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit',
            })
          : 'Невідома дата';

        const totalRow = document.createElement('tr');
        totalRow.innerHTML = `
          <td colspan="4" style="text-align: right;">
            <strong>Ваше замовлення № ${_id}. від ${formattedDate} <br> ДО СПЛАТИ: ${total} грн.</strong>
          </td>
        `;
        table.append(totalRow);
      }
      main.append(table);
    } 
    else {
      main.innerHTML = "<h2>У ВАС ЩЕ НЕ БУЛО ЗАМОВЛЕНЬ</h2>"; 
    }
  } else if (status === 'REJECTED') {
    main.innerHTML = `<h3>Помилка завантаження історії замовлень: ${error} </h3>`;
  }
};
store.subscribe(drawHistory);


function headerState() {
  const cart = store.getState().cart;
  let cartItemCount = 0;
  for (const good of Object.values(cart)) {
    cartItemCount += good.count;
  }
  cartItemCount = cartItemCount === 0 ? "" : cartItemCount;

  if (store.getState().auth.token) {
    buttonRegister.style.display = "none";
    buttonLogin.style.display = "none";
    buttonLogout.style.display = "inline-block";
    buttonHistory.style.display = "inline-block";
    
    cartIcon.innerHTML = `<a href="#/cart">\u{1F6D2}</a>${cartItemCount}<br>
                          ${store.getState().auth.payload.sub.login}`;
  } 
  else {
    buttonRegister.style.display = "inline-block";
    buttonLogin.style.display = "inline-block";
    buttonLogout.style.display = "none";
    buttonHistory.style.display = "none";
    cartIcon.innerHTML = `<a href="#/cart">\u{1F6D2}</a>${cartItemCount}<br>`;
  }
};
store.subscribe(headerState);
