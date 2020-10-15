import { STEP_ONE } from '../actions/register';
import { STEP_TWO } from '../actions/register';
import { STEP_THREE } from '../actions/register';
import { RESET_REGISTER } from '../actions/register';
import { REGISTER_CONFIRMATION } from '../actions/register';

const initialState = {
    name: 'default',
    surname:'default',
    doc_type:'default',
    doc_number:'default',
    phone_number:'default',
    address_street:'default',
    address_number:'default',
    locality:'default',
    province:'default',
    country:'default',
    birthdate: 'default',
}

export default (state = initialState, action) => {

    switch (action.type){
        
        case STEP_ONE: {
            return {
                ...state,
                name: action.payload.name,
                surname: action.payload.surname,
                birthdate: action.payload.birthdate
                
            }
        }
        case STEP_TWO: {
            return {
                ...state,
                doc_type: action.payload.doc_type,
                doc_number: action.payload.doc_number,
                phone_number: action.payload.phone_number
            } 
        }
        case STEP_THREE: {
            return {
                ...state,
                address_street: action.payload.address_street,
                address_number: action.payload.address_number,
                locality: action.payload.locality,
                province: action.payload.province,
                country: action.payload.country
            } 
        }
        case REGISTER_CONFIRMATION: {
            return {
                state: action.payload
            } 
        }
        case RESET_REGISTER: {
            return {
                state: initialState
            } 
        }
    }
    return state

}

