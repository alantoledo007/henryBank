export const NOMBRE = 'NOMBRE';

export const nombre = payload => {

    return {
        type: NOMBRE,
        payload,
    }
}
