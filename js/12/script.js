function reducer(state, { type, ЩО, СКОКА, ціна }) {
  if (!state) {
    return {
      пиво: { СКОКА: 100, ціна: 60 },
      чіпси: { СКОКА: 100, ціна: 100 },
      сіги: { СКОКА: 100, ціна: 80 },
      каса: 0,
    };
  }

  if (type === 'КУПИТИ') {
    const новаКількість = state[ЩО].СКОКА - СКОКА;

    if (новаКількість <= 0) {
      alert(`Не можливо купити ${СКОКА} одиниць ${ЩО}. Недостатньо товару.`);
      return state;
    }
    
    return {
      ...state,
      [ЩО]: {
        СКОКА: новаКількість,
        ціна: state[ЩО].ціна,
      },
      каса: state.каса + state[ЩО].ціна * СКОКА,
    };
  }

  return state;
}

/*
let state = reducer(undefined, {});
console.log(state);
state = reducer(state, {type: 'КУПИТИ', ЩО: 'пиво', СКОКА: 5})
console.log(state)*/



function createStore(reducer){
  let state = reducer(undefined, {})                
  let callbacks =[];
  const getState = () => state;

  const subscribe = (callback) => {                   
    callbacks.push(callback);                   
    return () => callbacks = callbacks.filter(c => c !== callback)          

  }   
  const dispatch  = action => { 
    const newState = reducer(state, action)                       
    if (newState !== state){                             
      state = newState                            
      for (let callback of callbacks) {
        callback() 
      }                                        
    }
  }
  return {
    getState,                                   
    dispatch,
    subscribe
  }
}

const kiosk = createStore(reducer)
console.log(kiosk.getState())                  

const unsubscribe = kiosk.subscribe(
  () => console.log(kiosk.getState())
) 

const unsubscribe2 = kiosk.subscribe(
  () => {
    const {пиво, чіпси, сіги} = kiosk.getState()
    pivo.innerText = `Пиво: ${пиво.СКОКА}шт. Ціна: ${пиво.ціна}грн.`;
    chips.innerText = `Чіпси: ${чіпси.СКОКА}шт. Ціна: ${чіпси.ціна}грн.`;
    sigi.innerText = `Цигарки: ${сіги.СКОКА}шт. Ціна: ${сіги.ціна}грн.`;
    document.title = `каса: ${kiosk.getState().каса} грн.`;
  }
) 

kiosk.dispatch({type: 'КУПИТИ', ЩО: 'пиво', СКОКА: 0})

const купиПіваса = СКОКА => ({type: 'КУПИТИ', ЩО: 'пиво', СКОКА})
const купиЧіпсики = СКОКА => ({type: 'КУПИТИ', ЩО: 'чіпси', СКОКА})
const купиСіги = СКОКА => ({type: 'КУПИТИ', ЩО: 'сіги', СКОКА})

/*
kiosk.dispatch(купиПіваса(3))
kiosk.dispatch(купиЧіпсики(6))
kiosk.dispatch(купиПіваса(30))
kiosk.dispatch(купиСіги(10))*/


function купитиТовар() {
  const товар = document.getElementById('товар').value;
  const кількість = document.getElementById('кількість').value;
  const кошти = document.getElementById('кошти').value;
  
  if (isNaN(кількість) || isNaN(кошти)) {
      alert('Введіть коректні дані.');
      return;
  }
  if (кошти <= 0) {
      alert('Введіть коректну суму коштів.');
      return;
  }
  const купитиТоварЕкшен = (товар, кількість) => ({
    type: 'КУПИТИ',
    ЩО: товар,
    СКОКА: кількість,
  });
  kiosk.dispatch(купитиТоварЕкшен(товар, кількість));
}