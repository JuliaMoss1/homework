{
let userNumber = prompt("Введіть число:");
if (isNaN(userNumber)) {
    alert("Некоректно введенне число!");
}
if (userNumber % 2 === 0) {
    alert("Ваше число парне.");
} 
if (userNumber % 2 === 1) {
   alert("Ваше число непарне.");
}   
}


{
let text = prompt("Введить тект:");
if (text.indexOf("блін") !== -1) {
    alert("Не блінкай!");
}
alert("Дякую за чемність!")
}


{
let question = confirm("Хочешь прогулятись?");
let question1 = confirm("Хочешь спати?");
console.log(question, question1);
}


{
let question2 = confirm("Ви чоловік?");
if (question2){
    alert("Ви чоловік!");
}
else {
    alert("Ви жінка!")
}
}


{
let rozmir = prompt("Введіть свій розмір одягу за укріїнською розмірною сіткою (40-52):")
if (rozmir == 40) {
    alert("Ваш розмір у США - S.");
}
if (rozmir == 42) {
    alert("Ваш розмір у США - M.");
}
if (rozmir == 44) {
    alert("Ваш розмір у США - M.");
}
if (rozmir == 46) {
    alert("Ваш розмір у США - L.");
}
if (rozmir == 48) {
    alert("Ваш розмір у США - L.");
}
if (rozmir == 50) {
    alert("Ваш розмір у США - XL.");
}
if (rozmir == 52) {
    alert("Ваш розмір у США - XXL.");
}
}


{
let question3 = confirm("Ви чоловік?") ? 'Ви чоловік!' : 'Ви жінка!';
alert(question3);
}


{
let age = prompt('Скільки вам років?') || alert('Введіть ще раз:')
}
// зробила двома способами, у другому разрахунок ріка народження, як у минулій домашці.
{
let age = prompt('Скільки вам років?') 
if (!age || null) {
    alert('Введіть свій вік ще раз:')
}
else {
    let yeaBirth = 2024 - age;
    alert(`Ви народились у ${yeaBirth} році`);
}
}


{
confirm('Шопінг?') || alert('Ти, бяка!!')
}

{
let robot = confirm('Шопінг?');
if (!robot){
  alert('Ти, бяка!!')
}
}


{
let lastName = prompt("Введіть ваше прізвище:") || "Акакій";
let firstName = prompt("Введіть ваше ім'я:") || "Акакійович";
let surName = prompt("Введіть ваше по-батькові:") || "Акакієнко" ;
let fullName = `${lastName} ${firstName} ${surName}`;
console.log(fullName);
}

{
let lastName = prompt("Введіть ваше прізвище:") 
let firstName = prompt("Введіть ваше ім'я:") 
let surName = prompt("Введіть ваше по-батькові:")
if(!lastName) {
    lastName = "Акакій"
}
if(!firstName) {
    firstName = "Акакійович"
}
if (!surName) {
    surName = "Акакієнко" 
}
console.log(lastName, firstName, surName);
}


{
let login = prompt('Введіть логін:');
if (login === 'admin') {
    let password = prompt('Введіть пароль:');
    if (password === 'qwerty') {
        alert('Вітаю!');   
    }
    else {
        alert('Невірний пароль!');
    }
}
else {
    alert('Невірний логін!')
}
}


{
let valuta = prompt('Введить валют, яка вас цікавить (usd, eur, gbr):').toLowerCase();
let sdelka = confirm('Бажаєте купити?');
let rate;
if (valuta === 'usd') {
    rate = sdelka ? 39 : 38;
}
if (valuta === 'eur') {
    rate = sdelka ? 41  : 40;
}
if (valuta ==='gbr') {
    rate = sdelka ? 48 : 47;
}
let suma = prompt('Введіть суму у валюті:');
let sumaGrn = suma * rate;  
console.log(sumaGrn);
alert(`У гривнях це ${sumaGrn}.`);
}


{
let user = prompt("Камінь, ножиці, папір?");
let comp = Math.random();
if(comp <= 0.33) {
    comp = "камінь";
    alert("Вибір комп'ютера - камінь.");
}
if(comp <= 0.66) {
    comp = "ножиці";
    alert("Вибір комп'ютера - ножиці.");
}
if(comp <= 0.99) {
    comp = "папір";
    alert("Вибір комп'ютера - папір.");
}
if ((comp === "камінь" && user === "ножиці") || (comp === "ножиці" && user === "папір") || (comp === "папір" && user === "камінь")) {
    alert("Переміг комп'ютер.");
}
if ((user === "камінь" && comp === "ножиці") || (user === "ножиці" && comp === "папір") || (user === "папір" && comp === "камінь")) {
    alert("Вітаю, ви перемогли!");
}
if ( comp === user) {
    alert("Нічия!");
}
}


{
let user = prompt("Камінь, ножиці, папір?");
let comp = Math.random();
let vinc = (comp <= 0.33 && user === "ножиці") || (comp > 0.33 && comp <= 0.66 && user === "папір") || (comp > 0.66 && user === "камінь") ? "Вітаю, ви перемогли!" : ((user === "камінь" && comp > 0.66) || (user === "ножиці" && comp > 0.33 && comp <= 0.66) || (user === "папір" && comp <= 0.33)) ? "Комп'ютер переміг." : "Нічия.";
alert(vinc);
} //ця ковбаса мене доконала