{
let userName = prompt("Як вас звуть?");
alert(`Вітаю, ${userName} !`);
console.log(`Вітаю,${userName}!`);
}

{
let fraza = prompt("Опиши події свого дня через кому:");
let gopFraza = fraza.split(",").join(", блін,");
console.log(gopFraza);
alert(gopFraza);
}

{
let str = "cANBerRa";
let result = str[0].toUpperCase() + str.toLowerCase().slice(1);
console.log(result); //Canberra
}

{
let sentence = prompt("Напиши любе речення.");
let words = sentence.split(" ");
console.log(words.length);
alert(words.length);
}

{
let lastName = prompt("Введіть ваше прізвище:").trim();
let firstName = prompt("Введіть ваше ім'я:").trim();
let surName = prompt("Введіть ваше по-батькові:").trim();
let lastNameCap = lastName[0].toUpperCase() + lastName.toLowerCase().slice(1);
let firstNameCap = firstName[0].toUpperCase() + firstName.toLowerCase().slice(1);
let surNameCap = surName[0].toUpperCase() + surName.toLowerCase().slice(1);
let fullName = `${lastNameCap} ${firstNameCap} ${surNameCap}`;
console.log(fullName);
alert(fullName);
}

{
let str = "Було жарко. Василь пив пиво вприкуску з креветками";
let result = str.split("пиво").join("чай");
console.log(result); //"Було жарко. Василь пив чай уприкуску з креветками"
}

{
let str = "якийсь текст, в якому є один тег <br /> і всяке інше"
let result = str.slice(0, str.indexOf("<") - 1) + str.slice(str.indexOf(">") + 1); // -1, чтоб отрезать по пробел перед <, +1 чтоб отрезать после >.
console.log(result) //якийсь текст, в якому є один тег і всяке інше*
}

{
let str = "якийсь текст, у якому є один тег <br /> і всяке інше"
let result = str.slice(0, str.indexOf("<"));
console.log(result);
result += str.slice(str.indexOf("<"), str.indexOf("/")).toUpperCase();
console.log(result);
result += str.slice(str.indexOf("/"));
console.log(result); //якийсь текст, в якому є один тег <BR /> і всяке інше
}

{
let text = prompt(`Введіть текст, видділяючи рядки за допомогою \\n:`);
let multiText = text.split(`\\n`).join(``);
alert(multiText);
}

{
let youtubRegExp = /^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube(-nocookie)?\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|live\/|v\/)?)([\w\-]+)(\S+)?$/;
let textLink = prompt("Введіть посилання на youtube:");
console.log(textLink.match(youtubRegExp));
let idVideo = textLink.match(youtubRegExp)[6];
console.log(idVideo);
let embedCode = `<iframe width="560" height="315" src="https://www.youtube.com/embed/${idVideo}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
document.write(embedCode);
}










