export const STEP_ONE = 'STEP_ONE';
export const STEP_TWO = 'STEP_TWO';
export const STEP_THREE = 'STEP_THREE';

export const stepOne = payload => {

    return {
        type: STEP_ONE,
        payload,
    }
}

export const stepTwo = payload => {

    return {
        type: STEP_TWO,
        payload,
    }
}
export const stepThree = payload => {

    return {
        type: STEP_THREE,
        payload,
    }
}
