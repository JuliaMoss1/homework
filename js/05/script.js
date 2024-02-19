{
const arr1 = [confirm("Чи даєте ви згоду на розсилку новин?") ? "Так, дякую.": "Ні, не треба.", confirm("Якесь друге запитання") ? "Ок": "Ну таке!"];
console.log(arr1);
}

{
const arrr = [];
arrr[0] = prompt("Введіть своє ім'я:");
arrr[1] = prompt("Введіть своє прізвище:");
arrr[2] = prompt("Введіть своє по-батькові:");
console.log(arrr);
}

{
const arr3 = [1, 2, 3, 4, 5, 6, 7];
console.log(arr3[prompt("Введвть індекс масива:")]);
console.log(arr3.length);
}

{
const arr4 = [1, 2, 3, 4, 5, 6, 7];
arr4[prompt("Введіть індекс масива:")] = prompt("Введіть значення для цього індексу");
console.log(arr4);
}

let tab = [[0, 0, 0, 0, 0], [0, 1, 2, 3, 4], [ 0, 2, 4, 6, 8], [0, 3, 6, 9, 12], [0, 4, 8, 12, 16]];
console.log(tab);


let tabNew = [tab[1].slice(1), tab[2].slice(1), tab[3].slice(1), tab[4].slice(1)];
console.log(tabNew);


let fraza = prompt("Введіть речення:").split(" ")
let indexSlovo = fraza.indexOf(prompt("Введить слово із цього речення:"));
if (indexSlovo === -1) {
    alert("Нема такого слова у реченні.")
}
else {
alert(`Це ${indexSlovo + 1}-е слово у реченні із ${fraza.length}-и слів.`)
console.log(`Це ${indexSlovo + 1}-е слово у реченні, в якому ${fraza.length} слів.`);
}



{
const names = [prompt("Введіть ім'я:")];
names.push(prompt("Введіть ім'я:"));
names.push(prompt("Введіть ім'я:"));
names.push(prompt("Введіть ім'я:"));
names.push(prompt("Введіть ім'я:"));
console.log(names);

const namesNew = [names.pop()];
namesNew.push(names.pop());
namesNew.push(names.pop());
namesNew.push(names.pop());
namesNew.push(names.pop());
console.log(namesNew);

const namesInverse = [namesNew.shift()];
namesInverse.unshift(namesNew.shift());
namesInverse.unshift(namesNew.shift());
namesInverse.unshift(namesNew.shift());
namesInverse.unshift(namesNew.shift());
console.log(namesInverse);
}


{
let table = tab.slice();
console.log(table);

let tableDeep = [tab[1].slice(1), tab[2].slice(1), tab[3].slice(1), tab[4].slice(1)];
console.log(tableDeep);
}


const aRR = [1, 2, 3, 4]
const aRR1 = aRR;
console.log(aRR, aRR1)

let tabb = [...tab[0],...tab[1],...tab[2],...tab[3],...tab[4]]
console.log(tabb);

{
let destr = [...prompt("Введіть текс:")];
console.log(destr);
let [a,,,, b,,, c,,,,,] = destr;
console.log(a, b, c);
}

{
let destr = [...prompt("Введіть текс:")];
console.log(destr);
let [, a,, b="!", c="!"] = destr;
console.log(a, b, c);
}

let tab1 = [[0, 0, 0, 0, 0], [0, 1, 2, 3, 4], [ 0, 2, 4, 6, 8], [0, 3, 6, 9, 12], [0, 4, 8, 12, 16]];
console.log(tab1);
let [a, [b, ...string1], [c,...string2], [d,...string3], [e,...string4]] = tab1;
let  tabNew1 = [string1, string2, string3, string4];
console.log(tabNew1);


{
const nameS = ["John", "Paul", "George", "Ringo"];
for (const namE of nameS) {
    alert(namE);
}
}

{
const currencies = ["USD", "EUR", "GBP", "UAH"]
let   str = "<select>"
for (const currency of currencies){
   str += `<option>${currency}</option>`
}
str += "</select>"
document.write(str);
}

{
const names = ["John", "Paul", "George", "Ringo"]
let   str = "<table>"
for (const name of names){
    str += `<td>${name}</td>`
}
str += "</table>"
document.write(str);
}


{
const names = ["John", "Paul", "George", "Ringo"];
let   str = "<table>";
for (const name of names){
    str += `<tr><td>${name}</td></tr>`;
}
str += "</table>";
document.write(str); 
}


{
const currencies = ["USD", "EUR", "GBP", "UAH"];
let   str = "<table>";
for (const currency of currencies){
    str += `<tr></tr>`;
    console.log(currency);
    for (const letter of currency){ 
       str += `<td>${letter}</td>`  
       console.log(letter)
    }
}
str+= "</table>"
document.write(str);
}


{
const tab3 = [[0, 0, 0, 0, 0], [0, 1, 2, 3, 4], [ 0, 2, 4, 6, 8], [0, 3, 6, 9, 12], [0, 4, 8, 12, 16]];
let   str = "<table>"
for (const tabbb of tab3){
    if (tab3.indexOf(tabbb) % 2 === 0) {
        str += "<tr style='background-color: lightblue;'>";
    } 
    else {
        str += "<tr style='background-color: lightyellow;'>";
    }
    for (const letter of tabbb){ 
       str += `<td>${letter}</td>`  
       console.log(letter)
    }
}
str+= "</table>"
document.write(str)
}

{
const capitalize = str => {
    let result;
    result = str[0].toUpperCase() + str.toLowerCase().slice(1);
    return result;
}
console.log(capitalize("cANBerRa")); //Canberra


let fraza1 = prompt("Введіть речення:").split(" ");
let words1 = fraza1.map(capitalize);
console.log(words1);
console.log(words1.join(" "));
// или вот так:
console.log(prompt("Введіть речення:").split(" ").map(capitalize).join(" "))
}




{
const matuki = ["блін", "якого прутня", "зашибісь"];
const string5 = prompt("Введіть речення:").split(" ");
const control = x => {
    let resalt;
    resalt = !matuki.includes(x);
    return resalt;
}
console.log(string5.map(control));
let newString = string5.filter(control).join(" ");
console.log(newString);
}


{
const matuki = ["блін", "якого прутня", "зашибісь"];
const string5 = prompt("Введіть речення:").split(" ");
const control = x => {
    let resalt;
    resalt = matuki.includes(x) ? "BEEP" : x;
    return resalt; 
}
console.log(string5.map(control).join(" "));
}

{
const currencies = ["USD", "EUR", "GBP", "UAH"]
let str          = "<select>"
str             += currencies.reduce((a,b) => "<option>" + a + "</option><option>" + b + "</option>")
str             += "</select>"
document.write(str);
}

const line = prompt('Bведіть рядок з будь-якими парними дужками:')
const bracketsStack = []
let   i             = 0
for (const character of line){
    if (character === '[' || character === '(' || character === '{') {
        bracketsStack.push(character);
       
    }
    if (character === ']' && bracketsStack.pop() !== '[' || character === ')' && bracketsStack.pop() !== '(' || character === '}' && bracketsStack.pop() !== '{') {
        console.log(`Помилка! Непарність у ${i}-й позиції у рядку.`)
        break;
    }
    if (bracketsStack.length === 0){
        console.log('Вітаю, усі дужки парні!')
    } 
    i++
}