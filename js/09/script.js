{
let i = 0
while (!confirm('Не набридло?')) {
     alert('Ще ітерація')
     i++
}
alert(`Вам набридло за ${i} разів.`)
}



{
const array = [];
let userInput;
while ((userInput = prompt("Введіть елемент:")) !== null) {
    array.push(userInput);
}
console.log(array);
}

{
const array = [];
let userInput;
while ((userInput = prompt("Введіть елемент:")) !== null) {
    array[array.length] = userInput;
}
console.log(array);
}

{
let i = 0;
while (Math.random()){
    i++;
    if (Math.random() > 0.9) {
        break;
    }
}
alert(`Кількість ітерацій: ${i}`);
}

{
let userInput;
while (userInput = prompt("Натисніть ОК для переривання або Скасувати для продовження.") === null); 
}


{
let N = prompt("Введіть дначення для N:");
let sum = 0;
for (let i = 1; i <= N; i += 3) {
    sum += i;
}
console.log(`Сума арифметичної прогресії від 1 до ${N}, з кроком 3: ${sum}`);   
}

{
let lengthLine = prompt("Введіть довжину рядка:");
let chessLine = '';
for (let i = 0; i < lengthLine; i++) {
    if (i % 2 === 0) {
        chessLine += '#';
    } else {
        chessLine += '.';
    }
}
console.log(chessLine);
}

{
let result = '';
for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
        result += j;
    }
    result += '\n';
}
console.log(result);
}


{
let chessBoard = '';
let widthChessBoard = prompt("Введіть ширину шахової дошки:");
let heightChessBoard = prompt("Введіть висоту шахової дошки:");
for (let i = 0; i < heightChessBoard; i++) {
    for (let j = 0; j < widthChessBoard; j++) {
        if ((i + j) % 2 === 0) {
            chessBoard += '.';
        } else {
            chessBoard += '#';
        }
    }
    chessBoard += '\n';
}
console.log(chessBoard);
}


{
const arr = [];
const N = prompt('Введіть кількість елементів у масиві:');
for (let i = 0; i < N; i++) {
    arr.push(i**3);
}
console.log(arr);
}



{
let multiplyTable = [];
for (let i = 0; i < 10; i++) {
    multiplyTable[i] = [];
    for (let j = 0; j < 10; j++) {
        multiplyTable[i][j] = (i + 1) * (j + 1);
    }
}
console.log(multiplyTable);
}



{
const readArrayOfObjects = () => {
    const arr = [];
    let continueInput;
    do {
        const obj = {};
        let key;
        do {
            key = prompt("Введіть ключ:");
            if (key === null) {
                break;
            }
            let value = prompt("Введіть значення для ключа:");
            if (value === null) {
                break;
            } 
            obj[key] = value;
        } 
        while (key !== null);
        arr.push(obj);
        continueInput = confirm("Бажаєте ввести ще один об'єкт?");
    } 
    while (continueInput);
    return arr;
}
readArrayOfObjects()
}



{
const rombik = (size) => {
    let strRombik = "";
    const middle = Math.floor(size / 2);
    for (let i = 0; i < size; i++) {
        let dots = Math.abs(middle - i);
        let hashes = size - 2 * dots;
        strRombik += `${".".repeat(dots)}${"#".repeat(hashes)}${".".repeat(dots)}\n`
    }
    return strRombik;
}
console.log(rombik(+prompt("Введіть розмір ромбу:")));
}


{
const multiplyTableContainer = document.getElementById('multiplyTable');
multiplyTable.style = 'display: flex; justify-content: center; padding: 100px;';
const table = document.createElement('table');
const headerRow = document.createElement('tr');
const cell0 = document.createElement('th');
cell0.innerText = 0;
cell0.style.border = '1px solid black';
headerRow.append(cell0);
for (let i = 1; i <= 9; i++) {
    let headerCell = document.createElement('th');
    headerCell.innerText = i;
    headerCell.style.border = '1px solid black';
    headerCell.style.padding = '10px';
    headerRow.append(headerCell);
    headerCell.addEventListener('mouseover', function() {
        headerCell.style.backgroundColor = '#A3D9F3';
    });
    headerCell.addEventListener('mouseout', function() {
        headerCell.style.backgroundColor = '';
    });
}
table.append(headerRow);
for (let i = 1; i <= 9; i++) {
    const row = document.createElement('tr');
    const rowHeaderCell = document.createElement('th');
    rowHeaderCell.innerText = i;
    rowHeaderCell.style.border = '1px solid black';
    rowHeaderCell.style.padding = '10px 15px';
    row.append(rowHeaderCell);
    rowHeaderCell.addEventListener('mouseover', function() {
       rowHeaderCell.style.backgroundColor = '#FDFFA4';
    });
    rowHeaderCell.addEventListener('mouseout', function() {
        rowHeaderCell.style.backgroundColor = '';
    });
    for (let j = 1; j <= 9; j++) {
        const cell = document.createElement('td');
        cell.innerText = i * j;
        cell.style = `border: 1px solid black; width: 40px; text-align: center;`;
        row.append(cell);
        cell.addEventListener('mouseover', function() {
            cell.style.backgroundColor = '#B5E279';
            cell.style.fontSize = '1.3rem';
            row.style.backgroundColor = '#f7fa3398';
            table.querySelectorAll(`td:nth-child(${j + 1})`).forEach(col => col.classList.add('highlighted-column'));
            table.querySelectorAll(`tr:nth-child(${i + 1}) td, th`)[j].style.backgroundColor = '#9ed9f7';
        });
        cell.addEventListener('mouseout', function() {
            cell.style.backgroundColor = '';
            cell.style.fontSize = '';
            row.style.backgroundColor = '';
            if (i % 2 !== 0) {
                row.style.backgroundColor = '#ECECEC';
            } 
            table.querySelectorAll('.highlighted-column').forEach((col) => col.classList.remove('highlighted-column'));
            table.querySelectorAll(`tr:nth-child(${i + 1}) td, th`)[j].style.backgroundColor = '';
        });
    }
    table.append(row);
    if (i % 2 !== 0) {
       row.style.backgroundColor = '#ECECEC';
    };
}
multiplyTableContainer.append(table);
}