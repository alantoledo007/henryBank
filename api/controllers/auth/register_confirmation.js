const {User} = require('../../db');
const axios = require('axios');
const { MoleculerError } = require("moleculer").Errors;

module.exports = async (ctx) => {

    const {doc_type,doc_number,name,surname,birthdate,phone_number,address_street,address_number,locality,province,country} = ctx.params
    const {id} = ctx.meta.user
    
    //No hice verificación de nombre y apellido porque puede existir cualquier cosa
    //No hice verificación del correo porque en teoría se verificó en el registro

    //Verificaciones de DNI y número telefónico
    if(doc_type !== "dni" && doc_type !== "passport"){
        throw new MoleculerError("Invalid document type",422,"DOCUMENTTYPE_WRONG", { nodeID: ctx.nodeID, action:ctx.action.name });

    }

    if(`${doc_number}`.length>10){
        throw new MoleculerError("Invalid document number",422,"DOCUMENT_WRONG", { nodeID: ctx.nodeID, action:ctx.action.name });

    }

    if(`${phone_number}`.length<10 || `${phone_number}`.length>20){
        throw new MoleculerError("Invalid phone number",422,"PHONENUMBER_WRONG", { nodeID: ctx.nodeID, action:ctx.action.name });
    }



    //Normalización de la dirección del usuario.
    
    if(address_street.length<1){
        throw new MoleculerError("Invalid address format",422,"STREET_WRONG", { nodeID: ctx.nodeID, action:ctx.action.name });

    }


    const data = await axios.get(`https://apis.datos.gob.ar/georef/api/direcciones?direccion=${address_street} ${address_number}&provincia=${province}&localidad=${locality}`)
    .then(async response =>{
        const information = response.data

        if(information.cantidad==0){
            throw new MoleculerError("Invalid address",422,"CONFIRMATION_FAILED", { nodeID: ctx.nodeID, action:ctx.action.name });
        }

        if(information.cantidad !== 0){
            User.update({
                doc_type,
                doc_number,
                name,
                surname,
                birthdate,
                phone_number,
                address_street:information.direcciones[0].calle.nombre,
                address_number:information.direcciones[0].altura.valor,
                locality:information.direcciones[0].localidad_censal.nombre,
                province:information.direcciones[0].provincia.nombre,
                country,
                dataCompletedAt: Date.now()
            },{where:{id}});

            return {status: 200, message: 'Register confirmation success'};
        }
    })

    return {data}
    

}