const express = require('express');
const cors = require('cors')
const app = express()
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();
app.use(cors())
app.use(express.json())




const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.p8qnexq.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });



async function run(){
    try{
        const serviceCollection = client.db('mentalPress').collection('services');
        const commentCollection = client.db('mentalPress').collection('comments');

        app.get('/services', async(req, res) =>{
            const query = {};
            const cursor = serviceCollection.find(query);
            const services = await cursor.toArray();
            res.send(services);
        })

        app.get('/services/:id', async(req, res) =>{
            const id = req.params.id;
            const query = {_id: ObjectId(id)};
            const service = await serviceCollection.findOne(query);
            res.send(service);
        })

        app.post('/services', async(req, res) =>{
            const services = req.body;
            const result = await serviceCollection.insertOne(services)
            res.send(result);
        })




        app.post('/comments', async(req, res) =>{
            const comment = req.body;
            const result = await commentCollection.insertOne(comment)
            res.send(result);
        })
        app.get('/comments',  async(req, res) =>{
            const query = {};
            const cursor = commentCollection.find(query);
            const orders = await cursor.toArray();
            res.send(orders);
        })


        app.delete('/comments/:id', async(req, res) =>{
            const id = req.params.id;
            const query = {_id: ObjectId(id)};
            const result = await commentCollection.deleteOne(query)
            res.send(result);
        })

        // app.patch('/comments/:id', async(req, res) =>{
        //     const id = req.params.id;
        //     const query = {_id: ObjectId(id)}
        //     const result = await commentCollection.updateOne(query);//, updateDoc
        //     res.send(result);
        // })
    }
    finally{

    }
}

run().catch(err => console.error(err))


app.get('/', (req, res) =>{
    res.send('Mental Press server running')
})

app.listen(port, () =>{
    console.log(`Mental Press server running on ${port}:`);
})