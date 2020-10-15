const { User, Transaction } = require("../../db");
const {MoleculerError} = require('moleculer').Errors;

module.exports = async (ctx) => {
	const { amount, card_number, card_cvv, card_expiration_date, holder_name } = ctx.params;
    const client_id = ctx.meta.user.id;
    
    if (amount < 100) {
		throw new MoleculerError(`Monto minimo de recarga no alcanzado`,401,"INVALID_AMOUNT",{ nodeID: ctx.nodeID, action:ctx.action.name })
    }
    
    if (String(card_number).length !== 16 || String(card_cvv).length !== 3) {
        throw new MoleculerError(`Datos de tarjeta invalidos`,401,"INVALID_CARD_DATA",{ nodeID: ctx.nodeID, action:ctx.action.name })
    }

    if (!holder_name.includes(' ') || holder_name.length < 5) {
        throw new MoleculerError(`Nombre y apellido invalidos`,401,"INVALID_CARD_HOLDER_NAME",{ nodeID: ctx.nodeID, action:ctx.action.name })

    }

    const client = await User.findOne({where: {id: client_id}})

	const recharge = await Transaction.create({
		title: `Recargaste ${amount}`,
		description: 'Recarga de saldo',
		amount,
		user_id: client_id,
	});

	client.balance = client.balance + amount
	await client.save()
	
	return recharge
};
