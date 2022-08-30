// ================================Like in post====================================================
//Link post----------------------------------------------------------------------------------------
app.put('/like/:id', async (req, res) => {
    try {
        const filter = { _id: ObjectId(req.params.id) };
        const post = await buyerCollection.findOne(filter);
        const check = post?.likes?.filter(like => like?.email?.toString() === req?.body?.email).length;
        if (!check) {
            const options = { upsert: true };
            const updateDoc = { $push: { likes: req.body } };
            const result = await buyerCollection.updateOne(filter, updateDoc, options);
            res.status(200).json(result)
        } else {
            return res.status(400).json({ massage: "Post has not yet been liked" });
        }

    } catch (err) {
        res.status(500).send('Server Error')
    }

})


//unLink post-----------------------------------------------------------------------------------------
app.put('/unlike/:id', async (req, res) => {
    try {
        const filter = { _id: ObjectId(req.params.id) };
        const post = await buyerCollection.findOne(filter);
        const check = post?.likes?.filter(like => like?.email?.toString() === req?.body?.email).length;
        if (check) {
            const removeIndex = post?.likes?.filter(like => like.email.toString() !== req.body.email);
            const options = { upsert: true };
            const updateDoc = { $set: { likes: removeIndex } };
            const result = await buyerCollection.updateOne(filter, updateDoc, options);
            res.status(200).json(result,)
        } else {
            return res.status(400).json({ massage: "Post has not yet been liked" });
        }
    } catch (err) {
        res.status(500).send('Server Error')
    }
})

// =======================================================================================================================