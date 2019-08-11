const  userModel =  require('./userModel');
module.exports = (app,producer,kafka_topic) => {


    app.get('/getUser/:userId',async(req,res) => {

        try{

            const userId = req.params.userId;
        
            const userCollection = await userModel.getUserById(userId);

            res.status(200).send({
                success : true,
                data : userCollection,
                error : null
            })

        }
        catch(e){

            console.log(e);

            res.status.send({
                success : false,
                data : null,
                error : e
            })

        }
    
    })

    app.post('/insertUser',async (req,res) => {

        const user = {
            username : req.body.username
        }

        try {

            const userCollection = await userModel.insertUser(user);

            res.status(200).send({
                success : true,
                data : userCollection,
                error : null
            })

        }
        catch(e) {
            console.log(e);

            res.status(500).send({
                success : false,
                data : null,
                error : e
            })

        }

    });

    app.post('/deleteUser',async (req,res) => {

        try {

            const userId = req.body.userId;

            let userCollection = await userModel.getUserById(userId);

            if(userCollection) {
                userCollection = userCollection.toObject();
                let payload = [{
                    topic : kafka_topic,
                    messages : JSON.stringify({
                        type : "DELETE_USER_POST",
                        data : userCollection._id
                    })
                }]

                producer.send(payload,(err,data) => {
                    if(err) {
                        console.log('[kafka-producer -> '+kafka_topic+']: broker update failed')
                    }
            
                    console.log('[kafka-producer -> '+kafka_topic+']: broker update success');
                })

                await userModel.deleteUser(userId);
            
                res.status(200).send({
                    success : true,
                    data : "Deleted Successfully",
                    error : null
                })

            }
            else{

                res.status(404).send({
                    success : false,
                    data: null,
                    error : "Not Found"
                })

            }



        }
        catch(e) {
            console.log(e);

            res.status(500).send({
                success : false,
                data : null,
                error : e
            })

        }
        

    })

}

