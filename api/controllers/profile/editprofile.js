const { User, Account } = require("../../db");
const { MoleculerError } = require("moleculer").Errors;
const axios = require("axios");


module.exports = async (ctx)=>{
    const {id} = ctx.meta.user
    let {phone_number,address_street,address_number,locality,province} = ctx.params

    const profile = await User.findOne({where:{id}})


    if(!phone_number){
        phone_number = profile.dataValues.phone_number
    }
    if(!address_street){
        address_street = profile.dataValues.address_street
    }
    if(!address_number){
        address_number = profile.dataValues.address_number
    }
    if(!locality){
        locality = profile.dataValues.locality
    }
    if(!province){
        province = profile.dataValues.province
    }

    const data = await axios
        .get(`https://apis.datos.gob.ar/georef/api/direcciones?direccion=${address_street} ${address_number}&provincia=${province}&localidad=${locality}`)
        .then(async ({data}) =>{
            if(data.cantidad == 0){
                console.log('error relacionado a la api gobierno')
                throw new MoleculerError(
					"Invalid address",
					422,
					"CONFIRMATION_FAILED",
					{ nodeID: ctx.nodeID, action: ctx.action.name }
				);
            }

            if(data.cantidad !== 0){

                await profile.update({
                    phone_number,
                    address_street:data.direcciones[0].calle.nombre,
                    address_number:data.direcciones[0].altura.valor,
                    locality:data.direcciones[0].localidad_censal.nombre,
                    province:data.direcciones[0].provincia.nombre
                });

                return {
                    status:200,
                    message:"User information updated."
                }

            }
        })

    const userUpdated = await User.findOne({where:{id},attributes:['name','surname','avatar','doc_type','doc_number','phone_number','email','address_street','address_number','locality','province','createdAt']})

    return {userUpdated}

}
