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

    if (новаКількість < 0 ) {
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
    if (kiosk.getState().каса === 24000){
      alert('Ми зачиняємось. Усе продано.')
      document.getElementById('end').style.visibility = 'visible';
      document.getElementById('vubir').style.visibility = 'hidden'
      const headerImg = document.querySelector('header img');
      headerImg.style.top = '100px';
      return;
    }
  }
) 

kiosk.dispatch({type: 'КУПИТИ', ЩО: 'пиво', СКОКА: 0})



function купитиТовар() {
  const товар = document.getElementById('товар').value;
  const кількість = document.getElementById('кількість').value;
  const кошти = document.getElementById('кошти').value;
  
  const ціна = kiosk.getState()[товар].ціна ; 
  const сума = кількість * ціна;

  if (кошти < сума) {
    alert('Недостатньо  коштів.');
    return;
  }
  if (кошти > сума && kiosk.getState()[товар].СКОКА >= кількість ) {
    const решта = кошти - сума;
    alert(`Ось вам решта: ${решта}грн`);
  }
  if (кошти == сума && kiosk.getState()[товар].СКОКА >= кількість) {
    alert(`Дякую, що подрасчет!`);
  }

  const купитиТоварЕкшен = (товар, кількість) => ({
    type: 'КУПИТИ',
    ЩО: товар,
    СКОКА: кількість,
  });

  kiosk.dispatch(купитиТоварЕкшен(товар, кількість));
}


// зробила ще по іншому.теж працює:
/*
const купиПіваса = СКОКА => ({type: 'КУПИТИ', ЩО: 'пиво', СКОКА})
const купиЧіпсики = СКОКА => ({type: 'КУПИТИ', ЩО: 'чіпси', СКОКА})
const купиСіги = СКОКА => ({type: 'КУПИТИ', ЩО: 'сіги', СКОКА})

function купитиТовар() {
  const товар = document.getElementById('товар').value;
  const кількість = document.getElementById('кількість').value;
  const кошти = document.getElementById('кошти').value;
  const ціна = kiosk.getState()[товар].ціна ; 
  const сума = кількість * ціна;

  if (кошти < сума) {
    alert('Недостатньо  коштів.');
    return;
  }
  if (кошти > сума && kiosk.getState()[товар].СКОКА >= кількість ) {
    const решта = кошти - сума;
    alert(`Ось вам решта: ${решта}грн`); 
  }  
  if (кошти == сума && kiosk.getState()[товар].СКОКА >= кількість) {
    alert(`Дякую, що подрасчет!`);
  }
  
  // до цього все теж саме

  const купитиТоварЕкшен = (товар) => {
    if (товар === 'пиво') {
      return kiosk.dispatch(купиПіваса(кількість));
    }
    if (товар === 'чіпси') {
      return kiosk.dispatch(купиЧіпсики(кількість));
    }
    if (товар === 'сіги') {
      return kiosk.dispatch(купиСіги(кількість));
    }
  }
  купитиТоварЕкшен(товар);
}
*/