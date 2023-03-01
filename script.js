const addMatch = document.querySelector(".btn.lws-addMatch");
const matches = document.querySelector(".all-matches.container");


const INCREMENT = 'increment'
const DECREMENT = 'decrement'
const RESET = 'reset';

function generateId() {
    return new Date().valueOf()
}

//initial states
const initialStates = {
    matches: [
        {
          id: generateId(),
          total: 0,
        }
    ]
}


function matchReducer(state = initialStates, action) {
    switch(action.type) {
        case 'add' :
            return {
                ...state,
                matches: [
                    ...state.matches,
                    {
                        id: generateId(),
                        total: 0,
                    }
                ],
            }
        case INCREMENT :
            const updatedState = {
                matches: []    
            }
            updatedState.matches = state.matches.map((match) => {
                if (match.id === action.id) {
                    return {...match, total: match.total + Number(action.payload)}
                } else {
                    return match;
                }
            });
            return updatedState;

        case DECREMENT :
            const updatedStateDecrement = {
                matches: [] 
            }
            updatedStateDecrement.matches = state.matches.map((match) => {
                if (match.id === action.id) {
                    return {...match, total: (match.total - Number(action.payload)) >= 0 ? (match.total - Number(action.payload)) : 0}
                } else {
                    return match;
                }
            });
            return updatedStateDecrement;
        
        case RESET :
            const resetState = {
                matches: []
            }
            resetState.matches = state.matches.map((match) => {
                return {...match, total: 0}
            });
            return resetState;

        default :
            return state;
    }
}

const store = Redux.createStore(matchReducer);

renderMatch();
store.subscribe(renderMatch);

addMatch.addEventListener("click", () => {
    store.dispatch({
        type: 'add'
    });
});

function renderMatch(){
    const state = store.getState();
    const appendContent = state.matches.map((value, key) => {
        return `
            <div class="match">
            <div class="wrapper">
                <button class="lws-delete">
                    <img src="./image/delete.svg" alt="" />
                </button>
                <h3 class="lws-matchName">Match ${key + 1}</h3>
            </div>
            <div class="inc-dec">
                <form onsubmit="handleIncrement(event, ${value.id})" class="incrementForm">
                    <h4>Increment</h4>
                    <input
                        type="number"
                        name="increment"
                        class="lws-increment"
                    />
                </form>
                <form onsubmit="handleDecrement(event, ${value.id})" class="decrementForm">
                    <h4>Decrement</h4>
                    <input
                        type="number"
                        name="decrement"
                        class="lws-decrement"
                    />
                </form>
            </div>
            <div class="numbers">
                <h2 class="lws-singleResult">${value.total}</h2>
            </div>
            </div>
            `;
    });
    matches.innerHTML = appendContent;
}

function handleIncrement(event, number){
    event.preventDefault();
    // console.log(event.target.closest('.match').children[2].children[0].innerHTML);
    // console.log(event.target.elements[0].value);
    // event.target.closest('.match').children[2].children[0].innerHTML = event.target.elements[0].value;
    store.dispatch({
        type: INCREMENT,
        id: number,
        payload: event.target.elements[0].value
    });

}

function handleDecrement(event, number){
    event.preventDefault();
    // console.log(event.target.closest('.match').children[2].children[0].innerHTML);
    // console.log(event.target.elements[0].value);
    // event.target.closest('.match').children[2].children[0].innerHTML = event.target.elements[0].value;
    store.dispatch({
        type: DECREMENT,
        id: number,
        payload: event.target.elements[0].value
    });

}

function handleReset() {
    store.dispatch({
        type: RESET 
    });
}