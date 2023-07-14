const {Router} = require('express')
const router = Router()


const admin = require("firebase-admin");

const db = admin.firestore();

router.post('/api/series', async (req, res) => {//ojo

    try{
        await db.collection("series")
        .doc()
        .create({name: req.body.name})
        return res.status(204).json();
    }catch(error){
        console.log(error)
        return res.status(500).send(error);
    }

});

router.get("/api/series", async(req, res)=>{
    try{
        const query = db.collection("series");
        const querySnapshot = await query.get();
        const docs = querySnapshot.docs;
        const response = docs.map((doc)=>({
        id: doc.id,
        name: doc.data().name
    }));

    return res.status(200).json(response);

    }catch(error){
        return res.status(500).json(response);
    }
})

module.exports = router