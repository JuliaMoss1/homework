alert("Вітаємо у нашому магазині! Почнемо покупку?"); 
let quantityBread = prompt("кількість хліба?"); //кількість придбаного хліба
let priceBread = 20;  //ціна буханки хліба

let quantityMilk = prompt("кількість молока?") ; //кількість придбаних пакетів молока
let priceMilk = 35;  //ціна пакету молока

let totalPriceBread  = quantityBread * priceBread; // сума за весь бридбанний хліб
let totalPriceMilk = quantityMilk * priceMilk; //сумі за все придбане молоко

let totalPrice = totalPriceBread + totalPriceMilk; // сума всієї покупки
let result  = totalPrice;
alert("Дякуємо за покупки!")
console.log(result);