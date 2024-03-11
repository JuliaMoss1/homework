{
const temperature = x => x * 9/5 + 32 //із фарингейта у цельсій
temperature(20) //68
}

{
const numberRGB = (r, g, b) => {
    if (r < 0 || r > 255 || g < 0 || g > 255 || b < 0 || b > 255) {
       return 'Кожне значення кольору повинно бути від 0 до 255.';
    }
    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}
numberRGB(45,215,9) //'#2dd709'
}

{
const numberFlats = (floors, apartmentsOnFloor, apartmentNumber) => {
    let entrance = Math.ceil(apartmentNumber / (floors * apartmentsOnFloor));
    let floor = Math.ceil((apartmentNumber % (floors * apartmentsOnFloor)) / apartmentsOnFloor);
    return {entrance, floor}
} 
numberFlats(12, 4, 38) //{entrance: 1, floor: 10};    numberFlats(12, 4, 152) {entrance: 4, floor: 2}; 
}

{
const credentials = () => {
    const capitalize = str => str[0].toUpperCase() + str.toLowerCase().slice(1);
    let name = capitalize(prompt("Введіть ваше ім'я:").trim());
    let surname = capitalize(prompt("Введіть ваше прізвище:").trim());
    let fatherName = capitalize(prompt("Введіть ваше по-батькові:").trim());
    let fullName = `${surname} ${name} ${fatherName}`;
    return {name, surname, fatherName, fullName};
}
credentials()// {name: 'Юлія', surname: 'Мосійчук', fatherName: 'Олександрівна', fullName: 'Мосійчук Юлія Олександрівна'}
}


{
const newLine = (x) => x.split(`\\n`).join(`\n`);
console.log(newLine(prompt(`Введіть текст, видділяючи рядки за допомогою \\n:`)))
}


{
const age =() => (prompt('Введіть свій вік:')) || alert('Введіть ще раз:')
console.log(age());
}

{
const loginAndPassword = (login, password) => {
    login = prompt('Введіть логін:');
    password = prompt('Введіть пароль:');
    return (login === 'admin' && password === 'qwerty');
} 
console.log(loginAndPassword());
}




const multiplyTable = (arr) => {
    let str = "<table>"
    for (let arr1 of arr) {
        str += arr.indexOf(arr1) % 2 === 0 ? "<tr style='background-color: lightblue;'>" : "<tr style='background-color: lightyellow;'>";
       for (let element of arr1) {
            str += `<td>${element}</td>`;
        }     
        str += "</tr>";
    }
    str += "</table>";
    document.write(str)
    return str 
}
multiplyTable([[0, 1, 2, 3, 4], [ 0, 2, 4, 6, 8], [0, 3, 6, 9, 12], [0, 4, 8, 12, 16]])



{
const filterLexics = (string, matuki) => {
    const neMatuk = word => {
        return !matuki.includes(word);
    }
    return string.split(" ").filter(neMatuk).join(" ");  
}
const matuki = ['бляха', 'муха', "пляшка", "шабля"];
const result = filterLexics(prompt('Введить рядок з матюками:'), matuki);
console.log(result);
}

/*
{
const currencyTable = () => {
    return fetch('https://open.er-api.com/v6/latest/USD').then(res => res.json()).then(data => {
        const aRR = [['', ...Object.keys(data.rates)]];
        for (let currency1 in data.rates) {
            let crossRates = [currency1];
            for (let currency2 in data.rates) {
                let rate = (data.rates[currency2] / data.rates[currency1]).toFixed(2);
                crossRates.push(rate);
            }   
            aRR.push(crossRates);
        }
        return aRR; 
    })
}
currencyTable().then(multiplyTable);
}*/ // закоменувал, бо перкриває мені усе бади



{
// для перевірки:
const car = {
    "Name": "chevrolet chevelle malibu",
    "Cylinders": 8,
    "Displacement": 307,
    "Horsepower": 130,
    "Weight_in_lbs": 3504,
    "Origin": "USA",
    "in_production": false
}
const formFunc = (obj) => {
    let form = '<form>';
    for (const [key, value] of Object.entries(obj)) {
       form += `<label>${key}: <input type="${typeof value === 'boolean' ? 'checkbox' : (typeof value === 'number' ? 'number' : 'text')}" value="${value}"/></label><br>`;
    }
    form += '</form>';
    document.write(form)
    return form
}
formFunc(car)
}



{
// для перевірки
var persons = [
    {name: "Іван", age: 17},
    {name: "Марія", age: 35},
    {name: "Олексій", age: 73},
    {name: "Яків", age: 12},
]

const sortArr = (array, key, ascending = true) => {
    if (ascending) {
        return array.sort((a, b) => a[key] > b[key] ? 1 : -1);
    } else {
        return array.sort((a, b) => a[key] < b[key] ? 1 : -1);
    }
}
sortArr(persons, 'age')


const persons1 = [
    {
        name: 'Марія',
        fatherName: 'Іванівна',
        surname: 'Іванова',
        sex: 'female'
    },
    {
        name: 'Миколай',
        fatherName: 'Іванович',
        surname: 'Іванов',
        age: 15
    },
    {
        name: 'Петро',
        fatherName: 'Іванович',
        surname: 'Іванов',
        married: true
    }
]


const sortTable = (arr, key, ascending = true) => {
    let array = [...arr];
    sortArr(array,"name");
    let zagolovri = [];
    for (let obj of array) {
        for (let key in obj) {
            if (!zagolovri.includes(key)) {
            zagolovri.push(key);
            }
        }
    }
    let tableArr = '<table><tr>';
    for (let key of zagolovri) {
        tableArr += `<th>${key}</th>`;
    }
    tableArr += '</tr>';
    for (let obj of array) {
        tableArr += '<tr>';
        for (let key of zagolovri) {
            tableArr += `<td>${obj[key] || ''}</td>`;
        }
        tableArr += '</tr>';
    }
    tableArr += '</table>';
    document.write(tableArr)
    return tableArr 
}
sortTable(persons1,"name") 
}




{
const calcResult = () => {
    if (isNaN(firstNumber.value) || isNaN(secondNumber.value) || secondNumber.value === 0) {
        divisionResult.innerHTML = `<strong>Некоректні дані або ділення на нуль</strong><br/>`;
    } else {
        const result = Math.floor(firstNumber.value / secondNumber.value);
        divisionResult.innerHTML = `<strong>Результат поділу: ${result}</strong><br/>`;
    }
    console.log(firstNumber.value, secondNumber.value, divisionResult.innerHTML)
}
firstNumber.oninput = secondNumber.oninput = calcResult;
}



{
const calcFunc = (quantityBread, priceBread, quantityMilk, priceMilk) => {
  const totalPriceBread  = quantityBread * priceBread; 
  const totalPriceMilk = quantityMilk * priceMilk;
  const totalPrice = {totalPriceBread, totalPriceMilk};
  return totalPrice;
}
console.log(calcFunc(5, 20, 6, 35))
}


{
const calcLive = () => {
    divisionResult1.innerHTML = `<strong>Загальна сума покупки: ${quantityBread.value * priceBread.value + quantityMilk.value * priceMilk.value } грн.</strong><br/>`;
}
quantityBread.oninput = priceBread.oninput = quantityMilk.oninput = priceMilk.oninput = calcLive
}
