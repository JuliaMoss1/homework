/*
var a = 5; //оголошення змінної а якій присвоєно значення 5
var b, c; //оголошення змінніх b та c поки без значень

b = (a * 5); //спочатку обчислення правої частини виразу, а * 5, що дорівнює 25. значеняя цього віразу присвоюєсться змінній b.
b = (c = (b / 2));*/ // спочатку обчислюеться b / 2, (25 / 2 = 12,5) це значення присвоюється змінній с, після чого зміна b приймає значення змінної с 


let age = prompt("Скільки вам років?");
let yearBirth = 2024 - age;
alert("Вам рік народження: " + yearBirth); // конкатенація
console.log(yearBirth);

let temperatureC = prompt("Скількі градусів ℃ сьогодні?");
let temperatureF = temperatureC * 9 /5 + 32;
alert("Це " + temperatureF + "°F градусів за Фарингейтом."); // конкатенація
console.log(temperatureF);

let a = prompt("Введи любе число");  
let b = prompt("Введи  інше любе число"); 
let c = Math.round(a / b);
alert("Результатом поділу буде: " + c); // конкатенація
console.log(c);

const rate = 41.2;
let sunGrivna = prompt("Яку суму у гривнях ви бажаєте обміняти на евро?")
let sumEuro = sunGrivna / rate;
alert("Вийде сума у " + sumEuro.toFixed(2) + " €."); // конкатенація
console.log(sumEuro.toFixed(2));


const red = parseInt(prompt("Введіть значення для червогого кольору від 0 до 255"));
const green = parseInt(prompt("Введіть значення для зеленого кольору від 0 до 255"));
const blue = parseInt(prompt("Введіть значення для синього кольору від 0 до 255"));
const redHex = red.toString(16).padStart(2, '0');
const greenHex = green.toString(16).padStart(2, '0');
const blueHex = blue.toString(16).padStart(2, '0');
const cssColor = '#' + redHex + greenHex + blueHex;
alert("CSS-колір: " + cssColor)
console.log("CSS-колір:" + cssColor);


let floors = prompt("Введіть кількість поверхів у будинку:");
let apartmentsOnFloor = prompt("Введіть кількість квартир на поверсі:");
let apartmentNumber = prompt("Введіть номер квартири:");
let entrances = Math.ceil(apartmentNumber / (floors * apartmentsOnFloor)); // Обчислення номеру під'їзду
let floor = Math.ceil(apartmentNumber / apartmentsOnFloor);
if (floor > floors) {
    floor = Math.ceil(floor - (floors * (entrances - 1)));// Обчислення номеру поверху відносно кількость під'їзду
} 
console.log(`Квартира номер ${apartmentNumber} розташована на ${floor}-му поверсі ${entrances}-го під'їзду.`);
alert(`Квартира номер ${apartmentNumber} розташована на ${floor}-му поверсі ${entrances}-го під'їзду.`); // інтерполяція
