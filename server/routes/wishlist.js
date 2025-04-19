const router = require('express').Router()
const {addToWishlist,removeFromWishlist,getWishlist} = require('../controllers/wishlist')

router.post('/',addToWishlist)
router.post('/remove',removeFromWishlist)
router.get('/list/:studentUid',getWishlist)

module.exports = router