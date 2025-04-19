const Wishlist = require('../Schema/Wishlist');

const addToWishlist = async (req, res) => {
  const { studentUid, eventId } = req.body;

  try {
    let wishlist = await Wishlist.findOne({ studentUid });

    if (!wishlist) {
      wishlist = new Wishlist({ studentUid, eventIds: [eventId] });
    } else {
      if (!wishlist.eventIds.includes(eventId)) {
        wishlist.eventIds.push(eventId);
      }
    }

    await wishlist.save();
    res.status(200).json({ message: 'Event added to wishlist', wishlist });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

const removeFromWishlist = async (req, res) => {
    const { studentUid, eventId } = req.body;
  
    try {
      const wishlist = await Wishlist.findOne({ studentUid });
  
      if (!wishlist) {
        return res.status(404).json({ message: 'Wishlist not found' });
      }
  
      wishlist.eventIds = wishlist.eventIds.filter(id => id !== eventId);
      await wishlist.save();
  
      res.status(200).json({ message: 'Event removed from wishlist', wishlist });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  };

  const getWishlist = async (req, res) => {
    const { studentUid } = req.params;
  
    try {
      const wishlist = await Wishlist.findOne({ studentUid });
  
      if (!wishlist) {
        return res.status(404).json({ message: 'Wishlist not found' });
      }
  
      res.status(200).json({ wishlist });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  };
  

module.exports = {addToWishlist,removeFromWishlist,getWishlist}
