
async function jsonPost(url, data) {
    const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(data)
    });

    if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
    }
    const jsonResponse = await response.json();
    return jsonResponse;
}


let nextMessageId = 0;

async function sendMessage(nick, message) {
    await jsonPost("http://students.a-level.com.ua:10012", { func: 'addMessage', nick: nick, message: message });
    document.getElementById('messageInput').value = "";
}

async function getMessages() {
    const response = await jsonPost("http://students.a-level.com.ua:10012", { func: 'getMessages', messageId: nextMessageId});
    const chatContainer = document.getElementById('chatContainer');

    response.data.forEach(message => {
        const messageDiv = document.createElement('div');
        const messageTime = new Date(message.timestamp);
        const formattedTime = messageTime.toLocaleString();
        messageDiv.innerHTML = `<strong>${message.nick}:</strong> ${message.message} (Time:${formattedTime})`;
        chatContainer.append(messageDiv);
    });

    
    if (nextMessageId === 0) {
        chatContainer.innerHTML = '';
    }
    
    nextMessageId = response.nextMessageId;
    return nextMessageId;
}

async function sendAndCheck() {
    const nick = document.getElementById('nickInput').value;
    const message = document.getElementById('messageInput').value;

    if (!nick || !message) {
        alert("Введіть ще раз ник або повідомлення.");
        return;
    }

    await sendMessage(nick, message);
    await getMessages();
}

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
async function checkLoop() {
    while (true) {
        await getMessages();
        await delay(5000); 
    }
}

document.getElementById('sendButton').addEventListener('click', sendAndCheck);

checkLoop(); 


/* хай буде
function jsonPost(url, data) {
    return fetch(url, {
        method: 'POST',
        body: JSON.stringify(data)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('status is not 200');
        }
        return response.json();
    });
}
*/



async function swapiLinks(url) {
    async function processValue(elem) {
        if (typeof elem === 'string' && elem.startsWith('http')) {
            const response = await fetch(elem);
            return await response.json();
        } else if (Array.isArray(elem)) {
            return await Promise.all(elem.map(async (item) => await processValue(item)));
        } else if (typeof elem === 'object' && elem !== null) {
            for (const key of Object.keys(elem)) {
                elem[key] = await processValue(elem[key]);
            }
            return elem;
        }
        return elem;
    }

    const response = await fetch(url);
    const data = await response.json();
    const processedData = await processValue(data);

    return processedData;
}

swapiLinks("https://swapi.dev/api/people/20/")
    .then(yodaWithLinks => console.log(JSON.stringify(yodaWithLinks, null, 4)))
;





function domEventPromise(element, eventName) {
    function executor(resolve) {
        function eventHandler(event) {
            element.removeEventListener(eventName, eventHandler);
            resolve(event);
        }
        element.addEventListener(eventName, eventHandler);
    }
    return new Promise(executor); 
}

const knopka = document.createElement("button");
knopka.textContent = "тиць";
knopka.style = "position: absolute; top: 50px; right: 50px; background-color: green";
document.body.append(knopka);

domEventPromise(knopka, 'click').then(e => console.log('event click happens', e));
