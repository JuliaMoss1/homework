{
function makeProfileTimer() {
    const startTime = performance.now();
    return function() {
        const endTime = performance.now();
        return endTime - startTime;
    };
}
const timer = makeProfileTimer() 
alert('Вимiрюємо час роботи цього alert'); 
alert(timer()); 
const timer2 = makeProfileTimer();
prompt('');
alert(`Час роботи двух аlert та одного prompt ${timer()}`);
alert(`Час роботи prompt та попереднього alert ${timer2()}`);
}



{
const makeSaver = (f, isCalled = false) => {
    let result;
    return (...params) => {
        if (!isCalled) {
            result = f(...params);
            isCalled = true;
        }
        return result;
    }
}

let saver = makeSaver(Math.random); 
let value1 = saver();              
let value2 = saver() ;                                                
alert(`Random: ${value1} === ${value2}`);

let saver2 = makeSaver(() => {
    console.log('saved function called');
    return [null, undefined, false, '', 0, Math.random()][Math.floor(Math.random()*6)];
})
let value3 = saver2();
let value4 = saver2();
value3 === value4 ;// теж має бути true

let namePrompt = prompt.bind(window, 'Як тебе звуть?');
let nameSaver = makeSaver(namePrompt);
alert(`Привіт! Prompt ще не було!`);
alert(`Привіт ${nameSaver()}. Щойно запустився prompt, перший та останній раз`);
alert(confirm(`Слухай, ${nameSaver()}, го пити пиво. Адже prompt був лише один раз`)? "А давай!" : "Дякую, краще віскі.");
}





{

function myBind(f, context, defaultArgs) {
    return function(...args) {
      let realArgs = [];
      let defaultIndex = 0;
      for (let i = 0; i < defaultArgs.length; i++) {
        if (defaultArgs[i] !== undefined) {
          realArgs.push(defaultArgs[i]);
        } else if (defaultIndex < args.length) {
          realArgs.push(args[defaultIndex]);
          defaultIndex++;
        } else {
          realArgs.push(undefined);
        }
      }
      for (let i = defaultIndex; i < args.length; i++) {
        realArgs.push(args[i]);
      }
      return f.apply(context, realArgs);
    };
}

let pow5 = myBind(Math.pow, Math, [, 5])
let cube = myBind(Math.pow, Math, [, 3])
console.log(pow5(2)); // => 32, викликає Math.pow(2,5), співвіднесіть з [undefined, 5]
console.log(pow5(4));// => 1024, викликає Math.pow(4,5), співвіднесіть з [undefined, 5]
console.log(cube(3));// => 27

let chessMin = myBind(Math.min, Math, [, 4, , 5,, 8,, 9])
console.log(chessMin(-1,-5,3,15)) // викликає Math.min(-1, 4, -5, 5, 3, 8, 15, 9), результат -5

let zeroPrompt = myBind(prompt, window, [undefined, "0"]) // аналогічно, тільки тепер задається "0" як текст за замовчанням в prompt,
let someNumber = zeroPrompt("Введіть число") // викликає prompt("Введіть число","0")
console.log(someNumber)

const bindedJoiner = myBind((...params) => params.join(''), null, [, 'b', , , 'e', 'f'])//('a','c','d') === 'abcdef'
console.log(bindedJoiner('a','c','d')) //'abcdef'
console.log(bindedJoiner('1','2','3')) //'1b23ef'
}






{
function checkResult(original, validator) {
    function wrapper(...params) {
        let result;
        do {
            result = original.call(this, ...params);
        } while (result === null || !validator(result));
        return result;
    }
    return wrapper;
}

const numberPrompt = checkResult(prompt, x => !isNaN(+x));
let  number  = +numberPrompt("Введіть число", "0"); 

const gamePrompt   = checkResult(prompt, x => ['камень', 'ножиці', 'папір'].includes(x.toLowerCase())) ;
const turn = gamePrompt("Введіть щось зі списку: 'камень', 'ножиці', 'папір'");
console.log(turn);
}