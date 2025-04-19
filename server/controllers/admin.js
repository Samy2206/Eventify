const Admin = require('../Schema/Admin')

const loginAdmin = async (req, res) => {
    try {
        
      const { uid } = req.student;
      const admin = await Admin.findOne({ uid:uid });
      console.log(admin)
      if (!admin) return res.status(404).json({ msg: "User not found" });
  
      res.status(200).json({ msg: "Login Successful",uid:uid});
    } catch (e) {
      console.error("Login Error: ", e);
      res.status(500).json({ error: e.message });
    }
  }

  module.exports = {loginAdmin}