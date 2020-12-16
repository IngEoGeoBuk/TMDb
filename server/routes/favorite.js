const express = require('express');
const router = express.Router();
const { Favorite } = require('../models/Favorite');

//=================================
//             User
//=================================

// index.js에서 app.use('/api/favorite', require('./route/favorite'));
// 이런 식으로 미리 지정했기때문에 /api/favorite/favoriteNumber가 아닌
// 그냥 favoriteNumber로 해도 된다

router.post("/favoriteNumber", (req, res) => {
    //mongoDB에서 favorite 숫자를 가져오기
    Favorite.find({ "movieId": req.body.movieId })
    // 여기서 body란 index.js에서 bodyParser를 쓰는데
    // views/MovieDetail/Sections/Favorite.js에서 보내준 movieId를 받을 수 있다
        .exec((err, info) => {
            if(err) return res.status(400).send(err)
            res.status(200).json({ success:true, favoriteNumber: info.length })
        })
    // 그 다음에 프론트에 다시 숫자 정보를 보내주기
});

router.post('/favorited', (req, res) => {
    // 내가 이 영화를 Favorite 리스트에 넣었는 지 정보를 DB에서 가져오기
    Favorite.find({ 'movieId': req.body.movieId, 'userFrom': req.body.userFrom})
    // views/MovieDetail/Sections/Favorite.js에서 
    // Axios.post('/api/favorite/favorited', variables) <-- 이런 식으로 userFrom 보낸 것을 받기
        .exec((err, info) => {
            if (err) return res.status(400).send(err)
            let result = false;
            if (info.length !== 0) {
                result = true;
            }
            res.status(200).json({ success: true, favorited: result })
        })
})

router.post('/addToFavorite', (req, res) => {
    const favorite = new Favorite(req.body)
    // favorite.save()를 하면 views/MovieDetail/Sections/Favorite.js에서 선언한
    // req.body에 있는 variables 정보들이 담긴다.
    // body-parser는 router.post랑 Axios.post 서로 주거니 받거니 하는 거 찾아주는 거라 생각하면 될듯?
    favorite.save((err, doc) => {
        if(err) return res.status(400).send(err)
        return res.status(200).json({ success: true })
    })
})

router.post('/removeFromFavorite', (req, res) => {
    Favorite.findOneAndDelete({ movieId: req.body.movieId, userFrom: req.body.userFrom })
        .exec((err, doc) => {
            if(err) return res.status(400).send(err)
            res.status(200).json({ success: true, doc });
        })
})

router.post('/getFavoritedMovie', (req, res) => {
    Favorite.find({ 'userFrom': req.body.userFrom })
        .exec((err, favorites) => {
            if(err) return res.status(400).send(err)
            return res.status(200).json({ success: true, favorites })
        })
})

router.post('/onClickDelete', (req, res) => {
    Favorite.findOneAndDelete({ movieId: req.body.movieId, userFrom: req.body.userFrom })
        .exec((err, favorites) => {
            if(err) return res.status(400).send(err)
            return res.status(200).json({ success: true, favorites })
        })
})


module.exports = router;
