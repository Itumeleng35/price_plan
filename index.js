import express from 'express';

import { addPricePlans, getPricePlans, deletePricePlans, updatePricePlans, totalPhoneBill } from './db.js';

const app = express();

const PORT = process.env.PORT || 4011;

app.listen(PORT, () => console.log(`Server started ${PORT}`))

 
app.use(express.static('public'))
app.use(express.json())


app.post('/api/price_plan/create', async (req, res) => {

    const plan_name = req.body.plan_name;
    const sms_price = req.body.sms_price;
    const call_price = req.body.call_price;
    
    await addPricePlans(plan_name, sms_price, call_price);

    res.json({
        status: 'success',
        message: `new price plan '${plan_name}' added sms: ${sms_price}, call: ${call_price}.`
    })
})


app.get('/api/price_plans/', async (req, res) => {

    const price_plans = await getPricePlans(); 

    console.log(price_plans)

    res.json({
        price_plans
    })
})


app.post('/api/price_plan/delete', async (req, res)=> {
    const id = req.body.id
    // add langage
    await deletePricePlans(id);


    res.json({
        status: 'Success',
        message: `price plans with id ${id} has been deleted`

    })  
})


app.post('/api/price_plan/update', async (req, res)=> {
    const plan_name = req.body.plan_name;
    const sms_price = req.body.sms_price;
    const call_price = req.body.call_price;
    const id = req.body.id

    await updatePricePlans(plan_name, sms_price, call_price, id);


    res.json({
        status: 'Success',
        message: `plan with id ${id} updated to '${plan_name}'`

    })  
})


app.post('/api/price_plan/phonebill/', async (req, res) => {

    const plan_name = req.body.plan_name;
    const actions = req.body.actions;
    
    res.json({
        status: 'success',
        total: await totalPhoneBill(actions, plan_name)
    })
})