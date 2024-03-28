
{
function numberRGB(r, g, b) {
    if (r < 0 || r > 255 || g < 0 || g > 255 || b < 0 || b > 255) {
       return 'Кожне значення кольору повинно бути від 0 до 255.';
    }
    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}
numberRGB(45,215,9) //'#2dd709'
}
{
function credentials() {
    const capitalize = str => str[0].toUpperCase() + str.toLowerCase().slice(1);
    let name = capitalize(prompt("Введіть ваше ім'я:").trim());
    let surname = capitalize(prompt("Введіть ваше прізвище:").trim());
    let fatherName = capitalize(prompt("Введіть ваше по-батькові:").trim());
    let fullName = `${surname} ${name} ${fatherName}`;
    return {name, surname, fatherName, fullName};
}
credentials()
}
{
function newLine(x) {
    return x.split(`\\n`).join(`\n`);
}
console.log(newLine(prompt(`Введіть текст, видділяючи рядки за допомогою \\n:`)))
}
{
function age () {
    return prompt('Введіть свій вік:') || alert('Введіть ще раз:');
}
console.log(age());
}
{
function loginAndPassword (login, password) {
    login = prompt('Введіть логін:');
    password = prompt('Введіть пароль:');
    return (login === 'admin' && password === 'qwerty');
} 
console.log(loginAndPassword())
}

{
const a = createPerson("Вася", "Пупкін")
const b = createPerson("Ганна", "Іванова")
const c = createPerson("Єлизавета", "Петрова")

function createPerson(name, surname) {
    return {
        name: name,
        surname: surname,
        getFullName: function() {
            return `${this.name} ${this.fatherName? this.fatherName : ''} ${this.surname}`;
        }
    }
}
console.log(a.getFullName()) //Вася Пупкін
a.fatherName = 'Іванович'    
console.log(a.getFullName()) //Вася Іванович Пупкін
console.log(b.getFullName()) //Ганна Іванова
}


function createPersonClosure(name, surname) {
    let age;
    let fatherName;
    return {
        getName: function() {
            return name;
        },
        getSurname: function() {
            return surname;
        },
        getFatherName: function() {
            return fatherName;
        },
        getAge: function() {
            return age;
        },
        getFullName: function() {
            return `${surname} ${name} ${fatherName || ''} `;
        },
        setName: function(newName) {
            if (newName !== null && newName[0] === newName[0].toUpperCase()) {
                name = newName;
                return name;
            }
            return name; 
        },
        setSurname: function(newSurname) {
            if (newSurname !== null && newSurname[0] === newSurname[0].toUpperCase()) {
                surname = newSurname;
                return surname;
            }
            return surname;
        },
        setFatherName: function(newFatherName) {
            if (newFatherName !== null && newFatherName[0] === newFatherName[0].toUpperCase()) {
                fatherName = newFatherName;
                return fatherName;
            }
            return fatherName;
        },
        setAge: function(newAge) {
            if (typeof newAge === 'number' && newAge > 0 && newAge <= 100) {
                age = newAge;
                return age;
            }
            return age;
        },
        setFullName: function(newFullName) {
            const parts = newFullName.split(' ');
            if (parts.length === 3) {
                if (parts[0][0] === parts[0][0].toUpperCase() &&
                    parts[1][0] === parts[1][0].toUpperCase() &&
                    parts[2][0] === parts[2][0].toUpperCase()) {
                    surname = parts[0];
                    name = parts[1];
                    fatherName = parts[2];
                    return `${surname} ${name} ${fatherName} `;    
                }
            }
            return `${surname} ${name}`;
        }
    }
}
const a = createPersonClosure("Вася", "Пупкін")
const b = createPersonClosure("Ганна", "Іванова")
console.log(a.getName())
a.setAge(15)
a.setAge(150) //не працює
b.setFullName("Петрова Ганна Миколаївна")
console.log(b.getFatherName()) //Миколаївна


{
function createPersonClosureDestruct({name = 'Анон', fatherName = '', surname = '', age = 'ще не народився'}) {
    return {
        name: name,
        fatherName: fatherName,
        surname: surname,
        age: age,
        getFullName: function() {
            return `${this.name} ${this.fatherName} ${this.surname}`;
        }
    }
}
const a = createPersonClosureDestruct({name: "Вася", surname: "Пупкін"});
const b = createPersonClosureDestruct({name: 'Миколай', age: 75});
console.log(a.getFullName()) // Вася Пупкін
console.log(b.getFullName()) // Миколай
}


{
function isSorted(...params) {
    for (let i = 1; i < params.length; i++) {
        if (typeof params[i] === 'number' && params[i] < params[i + 1]) {
            return true;
        }
        return false;
    }   
}
console.log(isSorted(11, 12, 35, 49, 50));  //true
console.log(isSorted(5, 41, 13, 222, 11));  // false
console.log(isSorted(1, 2, 2, 3, 4));  // false


let array = [8, 42, 58, 72, 93];
array.fill(48, 2, 3)
console.log(array) //[8, 42, 48 - заміна, 72, 93]
console.log(isSorted(...array)) // true
}



const d = createPersonClosure("Ганна", "Іванова")
d.setAge(15)
d.setFullName("Петрова Ганна Миколаївна")

function personForm(parent, person) {
    const nameInput = document.createElement('input');
    const fatherNameInput = document.createElement('input');
    const surnameInput = document.createElement('input');
    const ageInput = document.createElement('input');
    const fullNameInput = document.createElement('input');

    nameInput.value = person.getName();
    fatherNameInput.value = person.getFatherName();
    surnameInput.value = person.getSurname();
    ageInput.value = person.getAge();
    fullNameInput.value = person.getFullName();

    parent.append(nameInput);
    parent.append(fatherNameInput);
    parent.append(surnameInput);
    parent.append(ageInput);
    parent.append(fullNameInput);
    
    nameInput.oninput = () => {
        person.setName(nameInput.value);
        nameInput.value = person.getName(); 
    };

    surnameInput.oninput = () => {
        person.setSurname(surnameInput.value);
        surnameInput.value = person.getSurname();
    };

    fatherNameInput.oninput = () => {
        person.setFatherName(fatherNameInput.value);
        fatherNameInput.value = person.getFatherName();  
    };

    ageInput.oninput = () => {
        person.setAge(ageInput.value);
        ageInput.value = person.getAge();
    };

    fullNameInput.oninput = () => {
        const [surname, name, fatherName] = fullNameInput.value.split(' ');
        person.setSurname(surname);
        person.setName(name);
        person.setFatherName(fatherName);
    };
}

const parentElement = document.getElementById('formContainer');
personForm(parentElement, d);


let car;
{
    let brand = 'BMW', model = 'X5', volume = 2.4
    car = {
        getBrand(){
            return brand
        },
        setBrand(newBrand){
            if (newBrand && typeof newBrand === 'string'){
                brand = newBrand
            }
            return brand
        },
        
        getModel(){
            return model
        },
        setModel(newModel){
            if (newModel && typeof newModel === 'string'){
                model = newModel
            }
            return model
        },
        
        getVolume(){
            return volume
        },
        setVolume(newVolume){
            newVolume = +newVolume
            if (newVolume && newVolume > 0 && newVolume < 20){
                volume = newVolume
            }
            return volume
        },
        
        getTax(){
            return volume * 100
        }
    }
}

function getSetForm(parent, getSet){
    const inputs = {} 
    const updateInputs = () => { 
        for (const fieldName in inputs) {
            const getValue = getSet['get' + fieldName[0].toUpperCase() + fieldName.slice(1)];
            inputs[fieldName].value = getValue();
        }
    }
    for (const getSetName in getSet){
        const getOrSet = getSetName.substring(0, 3);
        const fieldName = getSetName.substring(3);
        const setKey = `set` + fieldName;
        const getKey = `get` + fieldName;
        if (getOrSet === 'get') {
            const input = document.createElement('input');
            parent.append(input);
            inputs[fieldName] = input; 
        } else if (getOrSet === 'set') {
            inputs[fieldName].addEventListener('input', (event) => {
                const setValue = getSet[setKey];
                if (setValue) {
                    setValue(event.target.value);
                    updateInputs();
                }
            });
        }
    }
    updateInputs();
}
getSetForm(document.body, car);
