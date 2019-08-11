
const postModel =  require('./postModel');

module.exports = (app) => {

    app.get('/post/:postId',async(req,res) => {

        try {
            const postId = req.params.postId;

            const postCollection = await postModel.getPostById(postId);

            res.status(200).send({
                success : true,
                data : postCollection,
                error : null
            })

        }
        catch(e){
            console.log(e);

            res.status(500).send({
                success: false,
                data : null,
                error : e
            })

        }

    })

    app.post('/insertpost',async (req,res) => {

        try{
            console.log("post",req.body);
            const post = {
                 title : req.body.title,
                 bodyMessage : req.body.bodyMessage,
                 userId : req.body.userId
            }
            

            const postCollection = await postModel.insertPost(post);


            res.status(200).send({
                success : true,
                data: postCollection,
                error : null
            })

        }
        catch(e){
            console.log(e);

            res.status(500).send({
                success : false,
                data : null,
                error : e
            })

        }

    })


}