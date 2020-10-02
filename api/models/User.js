const mongoose = require("mongoose");


module.exports = mongoose.model("User", mongoose.Schema({
    avatar: {type: 'string'},
    name: {type: 'string'},
    surname: {type: 'string'},
    doc_type: {type: 'string'},
    doc_number: {type: 'string'},
    phone_number: {
        type: 'string',
        validate: {
            validator: function(v) {
              return /\d{3}-\d{3}-\d{4}/.test(v);
            },
            message: props => `${props.value} is not a valid phone number!`
          },
    },
    role: {
        type: 'string',
        enumValues: ['client', 'admin'],
        default: 'client'
    },
    balance: {type: 'number', default: 0.00},
    email: {type: 'string', unique:true},
    address_street: {type: 'string'},
    address_number: {type: 'number'},
    locality: {type:'string'},
    province: {type: 'string'},
    country: {type: 'string'},
    cvu: {type: 'string', maxlength:22, minlength: 22},
    birthdate: {type:'date'}
}));