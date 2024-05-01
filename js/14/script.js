
function htmlTree(element) {
    let result = `<${element.tagName}`;
    if (element.attrs) {
        for (let [key, value] of Object.entries(element.attrs)) {
            result += ` ${key}='${value}'`;
        }
    }
    result += '>';

    if (element.children) {
        for (let child of element.children) {
            if (child && child.tagName) {
                result += htmlTree(child);
            } else {
                result += child;
            }
        }
    } 
    
    result += `</${element.tagName}>`;
    return result;
}


const table = {
    tagName: 'table',
    attrs: {
        border: "1",
    },
    children: [
        {
            tagName: 'tr',
            children: [
                {
                    tagName: "td",
                    children: ["1x1"],
                },
                {
                    tagName: "td",
                    children: ["1x2"],
                },
            ]
        },
        {
            tagName: 'tr',
            children: [
                {
                    tagName: "td",
                    children: ["2x1"],
                },
                {
                    tagName: "td",
                    children: ["2x2"],
                },
            ]
        }
    ]
};

const resultHtml = htmlTree(table);
document.write(resultHtml); 




function domTree(parent, element) {
    const elem = document.createElement(element.tagName);

    if (element.attrs) {
        for (let [key, value] of Object.entries(element.attrs)) {
            elem.setAttribute(key, value);
        }
    }

    if (element.children) {
        for (let child of element.children) {
            if (child.tagName) {
                domTree(elem, child);
            } else {
                const textNode = document.createTextNode(child);
                elem.append(textNode);
            }
        }
    }

    parent.append(elem);
}
domTree(document.body, table);




{
function deepCopy(obj) {
    const copy = Array.isArray(obj) ? [] : {};

    for (let key in obj) {
        copy[key] = (typeof obj[key] === 'object' && obj[key] !== null) ? deepCopy(obj[key]) : obj[key];
    }
    return copy;
}
const arr = [1, "string", null, undefined, {a: 15, b: 10, c: [1,2,3,4], d: undefined, e: true}, true, false];
const arr2 = deepCopy(arr);
console.log(arr2);
}




function stringify(obj) {
    if (obj === null) {
      return 'null';
    } else if (obj === undefined) {
      return 'null';
    } else if (typeof obj === 'string') {
      return '"' + obj + '"';
    } else if (Array.isArray(obj)) {
      return '[' + obj.map(stringify).join(',') + ']';
    } else if (typeof obj === 'object') {
      const keys = Object.keys(obj);
      const result = keys
        .filter(key => obj[key] !== undefined)
        .map(key => {
          return stringify(key) + ':' + stringify(obj[key]);
        });
      return '{' + result.join(',') + '}';
    } else {
      return String(obj);
    }
}

const arr  = [1,"string", null, undefined, {a: 15, b: 10, c: [1,2,3,4],d: undefined, e: true }, true, false]
const jsonString = stringify(arr) 
const jsonString2 = stringify(table) 
console.log(JSON.parse(jsonString)) 
console.log(jsonString === JSON.stringify(arr)) // true
console.log(jsonString2 === JSON.stringify(table)) // true 






function getElementById(idToFind) {
    function walker(parent) {
        for (const child of parent.children) {
            if (child.id === idToFind) {
                throw child;
            }
            if (child.children.length > 0) {
                walker(child);
            }
        }
    }

    try {
        walker(document.body);
    } catch (element) {
        return element;
    }
    throw new Error(`Елемент із id '${idToFind}' не знайдено.`);
}

try {
    const element = getElementById('h3-8'); //id з лекції
    console.log(element); // знайшов у лекції: <h3 id="h3-8"><section id="h3-8_0">Рекурсія з погляду коду</section></h3>
} catch (error) {
    console.log(error.message); // у домашці : Елемент із id 'h3-8' не знайдено.
}
