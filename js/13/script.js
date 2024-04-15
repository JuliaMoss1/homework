{
function Person(name, surname) {
    this.name = name;
    this.surname = surname;

    this.getFullName = function() {
        return `${this.name} ${this.fatherName ? this.fatherName : ''} ${this.surname}`;
    }
}

const a = new Person("Вася", "Пупкін")
const b = new Person("Ганна", "Іванова")
const c = new Person("Єлизавета", "Петрова")

console.log(a.getFullName()) // Василь Пупкін
a.fatherName = 'Іванович' // додали по-батькові
console.log(a.getFullName()) //Вася Іванович Пупкін
console.log(b.getFullName()) // Ганна Іванова
}





{
function Person(name, surname) {
    this.name = name;
    this.surname = surname;
}

Person.prototype.getFullName = function() {
    return `${this.name} ${this.fatherName ? this.fatherName : ''} ${this.surname}`;
}

const a = new Person("Вася", "Пупкін");
const b = new Person("Ганна", "Іванова");
const c = new Person("Єлизавета", "Петрова");

console.log(a.getFullName()); // Вася Пупкін
a.fatherName = 'Іванович';    
console.log(a.getFullName()); // Вася Іванович Пупкін
console.log(b.getFullName()); // Ганна Іванова
}





{
function reducer(state, { type, ЩО, СКОКА}) {
  if (!state) {
    return {
      пиво: { СКОКА: 100, ціна: 60 },
      чіпси: { СКОКА: 100, ціна: 100 },
      сіги: { СКОКА: 100, ціна: 80 },
    };
  }
  if (type === 'КУПИТИ') {
    const новаКількість = state[ЩО].СКОКА - СКОКА;

    if (новаКількість < 0 ) {
      alert(`Не можливо купити ${СКОКА} одиниць ${ЩО}. Недостатньо товару.`);
      return state;
    }
    return {
      ...state,
      [ЩО]: {
        СКОКА: новаКількість,
        ціна: state[ЩО].ціна,
      }
    };
  }
  return state;
}


function Store(reducer) {
    let state = reducer(undefined, {});
    let callbacks = [];

    this.getState = function() {
        return state;
    };
  
    this.subscribe = function(callback) {
        callbacks.push(callback);
        return function() {
        callbacks = callbacks.filter(c => c !== callback);
        };
    };
  
    this.dispatch = function(action) {
        const newState = reducer(state, action);
        if (newState !== state) {
        state = newState;
        callbacks.forEach(callback => callback());
        }
    };
}

const kiosk = new Store(reducer);
console.log(kiosk.getState());
const unsubscribe = kiosk.subscribe(
    () => console.log(kiosk.getState())
) 

kiosk.dispatch({type: 'КУПИТИ', ЩО: 'пиво', СКОКА: 10})
}





function Password(parent, open) {
    this.input = document.createElement('input');
    this.input.type = 'password';
    parent.appendChild(this.input);

    this.toggleButton = document.createElement('button');
    this.toggleButton.textContent = '👁';
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
}

let p = new Password(document.body, true);
p.onChange = data => console.log(data); 
p.onOpenChange = open => console.log(open);
p.setValue('qwerty');
console.log(p.getValue());
p.setOpen(false);
console.log(p.getOpen());



const  br = document.createElement("br");
document.body.append(br);


function loginForm(parent) {

    const loginInput = new Password(parent, false);
    loginInput.setStyle({ margin: '30px 0' });  
    
    const passwordInput = new Password(parent, false);  
    
    const submitButton = document.createElement('button'); 
    submitButton.textContent = 'Увійти';
    submitButton.disabled = true;
    parent.append(submitButton);

    const updateSubmitButtonState = () => {
        submitButton.disabled = loginInput.getValue() === '' || passwordInput.getValue() === '';
    };

    loginInput.onChange = updateSubmitButtonState; 
    passwordInput.onChange = updateSubmitButtonState;

    this.getLoginValue = function() {
        return loginInput.getValue();
    };

    this.getPasswordValue = function() {
        return passwordInput.getValue();
    };
}
const form = new loginForm(document.body);




const  br1 = document.createElement("br");
document.body.append(br1);




function LoginForm(parent) {
    const loginField = new Password(parent, false); 
    const passwordField = new Password(parent, false); 

    const submitButton = document.createElement('button');
    submitButton.innerText = 'Submit';
    submitButton.disabled = true; 
    parent.append(submitButton);

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

    loginField.onChange = (data) => {
        this.login = data;
    };

    passwordField.onChange = (data) => {
        this.password = data;
    };

    submitButton.addEventListener('click', () => {
        console.log(`Login: ${this.login}, Password: ${this.password}`);
    });
}
const loginFormConstructor = new LoginForm(document.body);


const  br3 = document.createElement("br");
document.body.append(br3);
const  br4 = document.createElement("br");
const  останне = document.createElement("div");
останне.innerText = 'останне завдання'
document.body.append(br4);
document.body.append(останне);



function passwordVerify(parent, open) {
    const password1 = new Password(parent, open);
    const password2 = new Password(parent, false);
    password2.setStyle({display: 'none'});

    const toggleInputs = () => {
        if (password1.getOpen()) {
            password2.setStyle({display: 'none'});
        } else {
            password2.setStyle({display: 'block'});
        }
        verifyPasswords();
    };

    const verifyPasswords = () => {
        const pass1 = password1.getValue();
        const pass2 = password2.getValue();

        if (pass1 !== pass2) {
            password2.setStyle({border: '2px solid red' });
        } else {
            password2.setStyle({border: '' });
        }
    };

    password1.onOpenChange = toggleInputs;
    password1.onChange = verifyPasswords;
    password2.onChange = verifyPasswords;

    return {password1, password2};
}

const {password1, password2} = passwordVerify(document.body, true);