{
let table = {
    material: 'ДСП',
    height: '70сm',
    width: '100cm',
    color: 'Сосна',
    weight: '20кг',
    [prompt('Введіть властивість стола:')] : prompt('Введіть значення цієї властивості:'),
    [prompt('Введіть властивість стола:')] : prompt('Введіть значення цієї властивості:')
}
console.log(table)
}
{
let student = {
    school: 'Ліцей 4',
    class: '2-Б',
    dateBirth: '10.07.2015',
    name: 'Микола',
    fatherName: 'Васильович',
    surname: 'Петренко',
    [prompt('Введіть тип даних про учня:')] : prompt('Введіть дані про учня:'),
    [prompt('Введіть ще тип даних про учня:')] : prompt('Введіть дані про учня:')
}
console.log(student)

{
const keyName = prompt('Введіть потрібний ключ:')
let stud = {...student}
stud[keyName] = prompt('Введіть значення для ключа:')
console.log(stud)
}// можно и так и так, т.к. ключ новий и ничего не перебьет
const keyName = prompt('Введіть потрібний ключ:')
let stud = {
    [keyName] : prompt('Введіть значення для ключа:'),
    ...student
}
console.log(stud)
}


{
let body = {
    tagName: 'body',
    children: [
        {
            tagName: 'div',
            children: [
                {
                    tagName: 'span',
                    children: 'Enter a data please:'
                },
                {
                    tagName: 'br'
                },
                {
                    tagName: 'input',
                    attrs: {
                        type: 'text',
                        id: 'name'
                    }     
                },
                {
                    tagName: 'input',
                    attrs: {
                        type: 'text',
                        id: 'surname'
                    }     
                }
            ]
        },
        {   
            tagName: 'div',
            children: [
                {
                    tagName: 'buttom',
                    attrs: {
                        id: 'ok'
                    },     
                    children: 'OK',
                },
                {
                    tagName: 'buttom',
                    attrs: {
                        id: 'cancel'
                    },     
                    children: 'Cancel'
                }
            ]
        }  
    ]
}

console.log(body.children[1].children[1].children)
console.log(body.children[0].children[3].attrs.id)

 
body.children[0].parent = body
body.children[0].children[0].parent = body.children[0]
body.children[0].children[1].parent = body.children[0]
body.children[0].children[2].parent = body.children[0]
body.children[0].children[3].parent = body.children[0]
body.children[1].parent = body
body.children[1].children[0].parent = body.children[1]
body.children[1].children[1].parent = body.children[1]
console.log(body)


body.children[1].children[0].attrs[prompt('Введіть назву атребута:')] = prompt('Введіть зачення атребута:')
console.log(body.children[1].children[0].attrs)


let {children: [{children: [{children: spanText}]}]} = body;
console.log(spanText) ;

let {children: [ , {children: [ , {children: buttonText}]}]} = body;
console.log(buttonText);

let {children: [{children: [ ,,, {attrs: {id: secondInputId}}]}]} = body;
console.log(secondInputId);
}


{
let arr = [1,2,3,4,5, "a", "b", "c"];
let [odd1, even1, odd2, even2, odd3, ...letters] = arr;
console.log(even1, even2); 
console.log(odd1, odd2, odd3); 
console.log(letters);
}
{
let arr = [1, "abc"];
let [number, [s1, s2, s3]] = arr;
console.log(number);
console.log(s1, s2, s3);
}
{
let obj = {
    name: 'Ivan',
    surname: 'Petrov',
    children: [{name: 'Maria'}, {name: 'Nikolay'}]
}
//вийміть використовуючи деструктуризацію імена дітей у змінні name1 та name2
let {children: [{name: name1}, {name: name2}]} = obj;
console.log(name1, name2);
}
{
let arr = [1,2,3,4, 5,6,7,10]
const {0 : a, 1 : b, length} = arr;
console.log(a, b, length);
}

{
let userInputKey = prompt('Введіть властивість стола:');
let userInputValue = prompt('Введіть значення цієї властивості:');
let table = {
    material: 'ДСП',
    height: '70сm',
    width: '100cm',
    color: 'Сосна',
    weight: '20кг',
    [userInputKey]: userInputValue
}
console.log(table);
let {[userInputKey]: deletedKey, ...newTable } = table;
console.log(newTable);
}


{
fetch('https://open.er-api.com/v6/latest/USD').then(res => res.json()).then(data => {
    let inputCurrency = prompt("Введіть вхідну валюту:").toUpperCase();
    let outputCurrency = prompt("Введіть валюту, в яку ви хочете конвертувати:").toUpperCase();
    let sum = prompt("Введіть суму у вхідній валюті:");
    if (inputCurrency in data.rates && outputCurrency in data.rates) {
        let sumConv = (data.rates[outputCurrency] /data.rates[inputCurrency] * sum).toFixed(2);
        console.log(`${sum} ${inputCurrency} це буде ${sumConv} ${outputCurrency}`);
        alert(`${sum} ${inputCurrency} це буде ${sumConv} ${outputCurrency}`); 
    }
    else {
        alert("Введіть валюту вірно!")
    }
    console.log(data)
})
}

{
fetch('https://open.er-api.com/v6/latest/USD').then(res => res.json()).then(data => {
    let str = "<select>";
    for (let currency in data.rates) {
        str += `<option>${currency}</option>`;
    }
    str += "</select>";
    document.write(str);
})
}



{
fetch('https://open.er-api.com/v6/latest/USD').then(res => res.json()).then(data => {
    let table = "<table><tr><th></th>";
    for (let currency in data.rates) {
        table += `<th>${currency}</th>`;
    }
    table += "</tr>";
    for (let currency1 in data.rates) {
        table += `<tr><th>${currency1}</th>`;
        for (let currency2 in data.rates) {
            let rate = (data.rates[currency2] / data.rates[currency1]).toFixed(2);
            table += `<td>${rate}</td>`;
        }
        table += "</tr>";
    }
    table += "</table>";
    document.write(table);
})
}


{
const car = {
    "Name": "chevrolet chevelle malibu",
    "Cylinders": 8,
    "Displacement": 307,
    "Horsepower": 130,
    "Weight_in_lbs": 3504,
    "Origin": "USA",
    "in_production": false
}
let form = '<form>';
for (const [key, value] of Object.entries(car)) {
    form += `<label>${key}: <input type="${typeof value === 'boolean' ? 'checkbox' : (typeof value === 'number' ? 'number' : 'text')}" value="${value}"/></label><br>`;
}
form += '</form>';
document.write(form)
}


{
const persons = [
   {
      "Name":"chevrolet chevelle malibu",
      "Cylinders":8,
      "Displacement":307,
      "Horsepower":130,
      "Weight_in_lbs":3504,
      "Origin":"USA"
   },
   {
      "Name":"buick skylark 320",
      "Miles_per_Gallon":15,
      "Cylinders":8,
      "Displacement":350,
      "Horsepower":165,
      "Weight_in_lbs":3693,
      "Acceleration":11.5,
      "Year":"1970-01-01",
   },
   {
      "Miles_per_Gallon":18,
      "Cylinders":8,
      "Displacement":318,
      "Horsepower":150,
      "Weight_in_lbs":3436,
      "Year":"1970-01-01",
      "Origin":"USA"
   },
   {
      "Name":"amc rebel sst",
      "Miles_per_Gallon":16,
      "Cylinders":8,
      "Displacement":304,
      "Horsepower":150,
      "Year":"1970-01-01",
      "Origin":"USA"
   }
]
let zagolovri = [];
for (let person of persons) {
    for (let key in person) {
        if (!zagolovri.includes(key)) {
            zagolovri.push(key);
        }
    }
}
let tablePersons = '<table><tr>';
for (let key of zagolovri) {
    tablePersons += `<th>${key}</th>`;
}
tablePersons += '</tr>';
for (let person of persons) {
    tablePersons += '<tr>';
    for (let key of zagolovri) {
        tablePersons += `<td>${person[key] || ''}</td>`;
    }
    tablePersons += '</tr>';
}
tablePersons += '</table>';
document.write(tablePersons);
}