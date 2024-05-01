function displayTable(DOMElement, jsonObject) {
    const table = document.createElement("table");
    table.style.border = "1px solid black";

    for (const [key, value] of Object.entries(jsonObject)) {
        const row = document.createElement("tr");
        const cell1 = document.createElement("td");
        const cell2 = document.createElement("td");
        cell1.textContent = key;
        cell1.style.border = "1px solid grey";
        cell2.style.border = "1px solid grey";

        const createButton = (url) => {
            const button = document.createElement('button');
            button.textContent = 'Показати дані';
            button.onclick = () => {
                fetch(url)
                    .then(res => res.json())
                    .then(newData => {
                        displayTable(cell2, newData);
                    })
            };
            return button;
        };

        if (Array.isArray(value)) {
            value.forEach(item => {
                if (typeof item === 'string' && item.startsWith('https://swapi.dev/api/')) {
                    cell2.append(createButton(item));
                }
            });
        } else if (typeof value === 'string' && value.startsWith('https://swapi.dev/api/')) {
            cell2.append(createButton(value));
        } else {
            cell2.textContent = value;
        }

        row.append(cell1);
        row.append(cell2);
        table.append(row);
    }
    DOMElement.append(table);
}

const container = document.createElement('div');

fetch('https://swapi.dev/api/people/1/')
    .then(res => res.json())
    .then(luke => {
        displayTable(container, luke);
        document.body.appendChild(container);
})







function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const fetchPromise = fetch('https://swapi.dev/api/people/1/')
    .then(response => response.json())
    .then(data => {
        console.log('Результат запиту з мережі:', data);
        return 'запит з мережі швидше ніж минуло 120 мілісекунд';
});

const delayPromise = delay(120)
    .then(() => {
        return `delay із затримкаю у 120 мілісекунд`;
});

Promise.race([fetchPromise, delayPromise])
    .then(result => console.log('Першим завершився:', result))
;






function confirmPromise(text) {
    return new Promise((resolve, reject) => {
        const result = confirm(text);
        if (result) {
            resolve('OK');
        } else {
            reject('Cancel');
        }
    });
}
confirmPromise('Проміси це складно?')
    .then(() => console.log('Не так вже й складно'))
    .catch(() => console.log('Respect за посидючість і уважність'))
;







function promptPromise(text) {
    return new Promise((resolve, reject) => {
        const userInput = prompt(text);
        if (userInput !== null) {
            resolve(userInput);
        } else {
            reject();
        }
    });
}
promptPromise("Як тебе звуть?")
    .then(name => console.log(`Тебе звуть ${name}`))
    .catch(() => console.log('Ну навіщо морозитися, нормально ж спілкувалися'))
;






function Password(parent, open) {
    this.input = document.createElement('input');
    this.input.type = 'password';
    parent.appendChild(this.input);

    this.toggleButton = document.createElement('button');
    this.toggleButton.textContent = '👁';
    parent.appendChild(this.toggleButton);

    this.input.addEventListener('input', () => {
        if (this.onChange) {
            this.onChange(this.input.value);
        }
    });

    this.toggleButton.addEventListener('click', () => {
        if (this.input.type === 'password') {
            this.input.type = 'text';
        } else {
            this.input.type = 'password';
        }
        if (this.onOpenChange) {
            this.onOpenChange(this.input.type === 'text');
        }
    });

    this.setValue = function(value) {
        this.input.value = value;
        if (this.onChange) {
            this.onChange(value);
        }
    };

    this.getValue = function() {
        return this.input.value;
    };

    this.setOpen = function(isOpen) {
        this.input.type = isOpen ? 'text' : 'password';
        if (this.onOpenChange) {
            this.onOpenChange(isOpen);
        }
    };

    this.getOpen = function() {
        return this.input.type === 'text';
    };

    this.setStyle = function(styleObject) {
        Object.assign(this.input.style, styleObject);
    };

    this.setValue('');
    this.setOpen(open);
}

function LoginForm(parent) {
    const loginField = new Password(parent, false); 
    const passwordField = new Password(parent, false); 

    const submitButton = document.createElement('button');
    submitButton.innerText = 'Submit';
    submitButton.disabled = true; 
    parent.append(submitButton);

    let login = '';
    let password = '';

    const updateButtonState = () => {
        submitButton.disabled = !(login && password);
    };

    Object.defineProperty(this, 'login', {
        get: () => login,
        set: (value) => {
            login = value;
            updateButtonState();
        }
    });

    Object.defineProperty(this, 'password', {
        get: () => password,
        set: (value) => {
            password = value;
            updateButtonState();
        }
    });

    loginField.onChange = (data) => {
        this.login = data;
    };

    passwordField.onChange = (data) => {
        this.password = data;
    };

    submitButton.addEventListener('click', () => {
        console.log(`Login: ${this.login}, Password: ${this.password}`);
        if (this.onSubmit) {
            this.onSubmit();
        }
    });
}


function loginPromise(parent) {
    function executor(resolve, reject) {
        const form = new LoginForm(parent);
        form.onSubmit = () => {
            const login = form.login;
            const password = form.password;
            if (login !== undefined && password !== undefined) {
                resolve({ login, password });
            } else {
                reject("Помилка при отриманні значень логіна та пароля");
            }
        };
    }
    return new Promise(executor);
}
loginPromise(document.body)
    .then(({ login, password }) => console.log(`Ви ввели ${login} та ${password}`))
;