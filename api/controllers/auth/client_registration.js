const {User} = require('../../db');

module.exports = async (ctx) => {

    const {doc_type,doc_number,name,surname,birthdate,phone_number,address_street,address_number,locality,province,country,id} = ctx.params

    const user = await User.update({
        doc_type,
        doc_number,
        name,
        surname,
        birthdate,
        phone_number,
        address_street,
        address_number,
        locality,
        province,
        country
    },{where:{id}});
    return 'Usuario actualizado';
}