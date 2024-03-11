{
let a = 10
{
    let b = 20
    {
        let c = 30
        //які тут будуть значення змінних a, b, c, d 
        //10, 20, 30, d не існує.
        b++
        a *= 10
    }
    {
        let c = 50
        //які тут будуть значення змінних a, b, c, d
        // 100, 21, 50, d не існує.
        b += 500
    }
    {
        const a = 100500
        const d = "value"
        //які тут будуть значення змінних a, b, c, d
        //100500, 521, c не існує, "value"
        {
            let a = -50
            b     = 1000
            //які тут будуть значення змінних a, b, c, d
            //-50, 1000, c не існує, "value"  
        }
        //які тут будуть значення змінних a, b, c, d
        //100500, 1000, c не існує, "value"
    }
    //які тут будуть значення змінних a, b, c, d 
    //100, 1000, c не існує, d не існує, 
}
//які тут будуть значення змінних a, b, c, d
//100, b, c та d не існують, бо створені не у зоні видимості
}



{
var age = + prompt ("Скільки вам років?", "");
if (age <= 0) {
    alert("ще не народився");
}
else if (age > 0 && age < 1) {
    alert("немовля");
}
else if ( age >= 1 && age < 6) {
    alert("дитина");
}
else if (age >= 6 && age < 18) {
    alert("школяр");
}
else if (age >= 18 && age <= 30){
    alert("молодь");
}
else if (age > 30 && age <= 45){
    alert("зрілість");
}
else if (age > 45 && age <= 60){
    alert("захід сонця");
}
else {
    alert("як пенсія?");
}
}



{
let color = prompt("Введіть колір", "");
if (color === "red" || color === "black") {
    document.write("<div style='background-color: red;'>червоний</div><div style='background-color: black; color: white;'>чорний</div>");
} 
else if (color === "blue" || color === "green") {
    document.write("<div style='background-color: blue;'>синій</div><div style='background-color: green;'>зелений</div>");
} 
else {
    document.write("<div style='background-color: gray;'>Я не зрозумів</div>");
}
}



{
const noSwitch = (key, cases, defaultKey='default') => {
    if (key in cases) {
        return cases[key]();
    }
    else {
        return cases[defaultKey]();
    }
}

const drink = prompt("Що ви любите пити?")
noSwitch(drink, {
    воду: () => console.log('Найздоровіший вибір!'),
    чай(){
        console.log('Смачна та корисна штука. Не перестарайтеся з цукром')
    },
    "пиво": () => console.log('Добре влітку, та в міру'),
    віскі: function(){
        console.log('Та ви, батечку, естет! Не забудьте лід і сигару')
    },
    default(){
        console.log('шото я не зрозумів')
    }
})
}



{
fetch('https://open.er-api.com/v6/latest/USD').then(res => res.json()).then(data => {
    for (const currency in data.rates) {
        const newButton = document.createElement("button");
        newButton.innerText = currency;
        newButton.onclick = () => {
            const sum = +prompt(`Введіть суму в ${currency}:`);
            if (sum) {
                const usdSum = (data.rates['USD'] / data.rates[currency] *sum).toFixed(2) ;
                alert(`Сума в ${sum} ${currency} дорівнює ${usdSum} USD.`);
            }
            else {
                alert('Введить суму вірно!');
            }
        }
        document.body.appendChild(newButton);
    }
})
}



{
fetch('https://open.er-api.com/v6/latest/USD').then(res => res.json()).then(data => {
    for (const currency in data.rates) {
        const optionFrom = document.createElement('option');
        optionFrom.innerText = currency;
        from.append(optionFrom);
        const optionTo = document.createElement('option');
        optionTo.innerText = currency;
        to.append(optionTo);
    }
    const conversion = () => {
        rate.innerText = `Курс між ${from.value} та ${to.value}: ${(data.rates[to.value] / data.rates[from.value]).toFixed(2)}`;
        const resultAmount = (data.rates[to.value] / data.rates[from.value] * amount.value).toFixed(2);
        result.innerText = `Сума у ${amount.value} ${to.value} дорівнює ${resultAmount} ${from.value}.`
    }
    from.onchange = conversion;
    to.onchange = conversion;
    amount.oninput = conversion;
})
}



{
fetch('https://raw.githubusercontent.com/russ666/all-countries-and-cities-json/master/countries.min.json')
.then(res => res.json())
.then(data => {
    for (const country in data) {
        const option = document.createElement('option');
        option.innerText = country;
        countries.append(option);
    }
    countries.onchange = () => {
        cities.innerHTML = '';
        for (const city of data[countries.value]) {
            const option = document.createElement('option');
            option.innerText = city;
            cities.append(option);
        }
    };
    countries.onchange();
})
}







