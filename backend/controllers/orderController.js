import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js"
import Stripe from "stripe"

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
const stripe = new Stripe("sk_test_51PkXCGKqrj7aSYT94dGtbvkEkeO8rl3IkF2SVPAbIlJzYPtPNpXquwq4F2oYcLv3amINT5VKKjJNf9ckzXVhrbxR00I4ACQAyp");

//placing user order for front\
const placeOrder = async (req, res) => {

    const fronted_url = 'https://lo-distinguidos.onrender.com'

    try {
        const newOrder = new orderModel({
            userId: req.body.userId,
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address,
        })

        await newOrder.save()
        await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} })

        const line_items = req.body.items.map((item) => ({
            price_data: {
                currency: "clp",
                product_data: {
                    name: item.name
                },
                unit_amount: item.price
            },
            quantity: item.quantity
        }))

        line_items.push({
            price_data: {
                currency: "clp",
                product_data: {
                    name: "Gastos de envío"
                },
                unit_amount: 3000
            },
            quantity: 1
        })

        const session = await stripe.checkout.sessions.create({
            line_items: line_items,
            mode: "payment",
            success_url: `${fronted_url}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${fronted_url}/verify?success=false&orderId=${newOrder._id}`
        })

        res.json({ success: true, session_url: session.url })

    } catch (error) {
        console.log(error);
        res.json({ success: false, messagge: "Error" })
    }

}

const verifyOrder = async (req, res) => {
    const { orderId, success } = req.body
    try {
        if (success == "true") {
            await orderModel.findByIdAndUpdate(orderId, { payment: true })
            res.json({ success: true, messagge: "Pagado" })
        } else {
            await orderModel.findByIdAndDelete(orderId)
            res.json({ success: false, messagge: "No pagado" })
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, messagge: "Error" })
    }
}

//user orders for front
const userOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({ userId: req.body.userId })
        res.json({ success: true, data: orders })
    } catch (error) {
        console.log(error);
        res.json({ success: false, messagge: "Error" })
    }
}

//Listing orders for admin panel
const listOrders = async (req, res) => {

    try {
        const orders = await orderModel.find({})
        res.json({ success: true, data: orders })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })

    }

}

//api for updating order status
const updateStatus = async (req, res) => {
    try {
        await orderModel.findByIdAndUpdate(req.body.orderId,{status:req.body.status})
        res.json({success:true, message:"Estado actualizado"})
    } catch (error) {
        console.log(error);
        res.json({success:false, message:"Error"})
        
    }
}

// Insertar orden manualmente desde el panel de administración
const insertManualOrder = async (req, res) => {
    try {
        // Crear una nueva orden con los datos recibidos
        const newOrder = new orderModel({
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address, // Opcional, si no es necesario puedes eliminarlo
        });

        // Guardar la orden en la base de datos
        await newOrder.save();

        // Responder con éxito y la nueva orden creada
        res.json({ success: true, order: newOrder });
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: "Error al guardar la orden" });
    }
};

export { placeOrder, verifyOrder, userOrders, listOrders, updateStatus, insertManualOrder }
