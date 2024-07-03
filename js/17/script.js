const delay = ms => new Promise(ok => setTimeout(() => ok(ms), ms));

async function trafficLight() {
    
    const redLight = document.getElementById('red-light');
    const yellowLight = document.getElementById('yellow-light');
    const greenLight = document.getElementById('green-light');
    
    while (true) {
        greenLight.classList.add('green');
        await delay(5000);
        greenLight.classList.remove('green');
        
        yellowLight.classList.add('yellow');
        await delay(2000);
        yellowLight.classList.remove('yellow');
        
        redLight.classList.add('red');
        await delay(7000);
        redLight.classList.remove('red');
    }
};

trafficLight();





const domEventPromise = (element, event) => new Promise(resolve => element.addEventListener(event, resolve, { once: true }));

async function pedestrianTrafficLight() {

    const redLight = document.getElementById('redLight');
    const greenLight = document.getElementById('greenLight');
    const button = document.getElementById('button');

    while (true) {
        redLight.classList.add('red');
        greenLight.classList.remove('green');
        button.disabled = false;
        button.classList.remove('disabled');
        
        await Promise.race([
            delay(8000),
            domEventPromise(button, 'click')
        ]);

        button.disabled = true;
        button.classList.add('disabled');
        redLight.classList.remove('red');
        greenLight.classList.add('green');
        await delay(5000);

        greenLight.classList.remove('green');
        redLight.classList.add('red');
        await delay(5000);
    }
};

pedestrianTrafficLight();






async function speedtest(getPromise, count, parallel = 1) {
    const startTime = Date.now();
    let totalQueryDuration = 0;

    for (let i = 0; i < count; i++) {
        const promises = Array(parallel).fill(null).map(async () => {
            const queryStartTime = Date.now();
            await getPromise();
            totalQueryDuration += (Date.now() - queryStartTime);
        });
        await Promise.all(promises);
    }

    const endTime = Date.now();
    const duration = endTime - startTime;
    const queryDuration = totalQueryDuration / (count * parallel);
    const querySpeed = 1 / queryDuration;
    const parallelDuration = duration / count;
    const parallelSpeed = (count * parallel) / duration;

    return {
        duration,
        querySpeed, 
        queryDuration, 
        parallelSpeed,
        parallelDuration
    };
};

speedtest(() => delay(1000), 10, 10 ).then(result => console.log(result));
speedtest(() => fetch('http://swapi.dev/api/people/1').then(res => res.json()), 10, 5).then(result => console.log(result));






async function gql(endpoint, query, variables) {
    const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            query: query,
            variables: variables
        })
    });
    const result = await response.json();
    return result.data;
}


;(async () => {
    const catQuery = `query cats($q: String){
                                        CategoryFind(query: $q){
                                            _id name
                                        }
                                    }`
    const cats = await gql("http://shop-roles.node.ed.asmer.org.ua/graphql",  catQuery,  {q: "[{}]"})
    console.log(cats) //список категорій з _id name та всім таким іншим
    
    
    const loginQuery = `query login($login:String, $password:String){
                            	login(login:$login, password:$password)
                        }`
    
    const token = await gql("http://shop-roles.node.ed.asmer.org.ua/graphql", loginQuery ,{login: "test457", password: "123123"})
    console.log(token)
})()


function jwtDecode(token) {
    try {
        if (typeof token !== 'string') return undefined;
        const parts = token.split('.');
        if (parts.length !== 3) return undefined;
        const decodedBase64 = atob(parts[1]);
        return JSON.parse(decodedBase64);
    } 
    catch (e) {
        return undefined;
    }
}

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOnsiaWQiOiI2MzIyMDVhZWI3NGUxZjVmMmVjMWEzMjAiLCJsb2dpbiI6InRlc3Q0NTciLCJhY2wiOlsiNjMyMjA1YWViNzRlMWY1ZjJlYzFhMzIwIiwidXNlciJdfSwiaWF0IjoxNjY4MjcyMTYzfQ.rxV1ki9G6LjT2IPWcqkMeTi_1K9sb3Si8vLB6UDAGdw";
console.log(jwtDecode(token)); 

try {
    console.log(jwtDecode())         //undefined
    console.log(jwtDecode("дічь"))   //undefined
    console.log(jwtDecode("ey.ey.ey"))   //undefined
    
    console.log('до сюди допрацювало, а значить jwtDecode не матюкався в консоль червоним кольором')
}
finally{
    console.log('ДЗ, мабуть, закінчено')//ура
}