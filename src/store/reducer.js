const billState = {
    billDetailsObj: (JSON.parse(localStorage.getItem('billDetailsStr')) ? JSON.parse(localStorage.getItem('billDetailsStr')) : {}),
    branchDetailsObj: (JSON.parse(localStorage.getItem('branchDetailsStr')) ? JSON.parse(localStorage.getItem('branchDetailsStr')) : {})
};

const reducer = (state = billState, action) => {
    const newState = { ...state };
    // eslint-disable-next-line
    switch (action.type) {
        case 'SAVE_BILL':
            newState.billDetailsObj = action.value;
            localStorage.setItem('billDetailsStr', JSON.stringify(action.value))
            break;

        case 'CLEAR_BILL':
            newState.billDetailsObj = {};
            localStorage.removeItem('billDetailsStr')
            break;

        case 'SAVE_BRANCH':
            newState.branchDetailsObj = action.value;
            localStorage.setItem('branchDetailsStr', JSON.stringify(action.value))
            break;

        case 'CLEAR_BRANCH':
            newState.branchDetailsObj = {};
            localStorage.removeItem('branchDetailsStr')
            break;
    }
    return newState;
};

export default reducer;