const College = require('../Schema/College')
const admin = require('firebase-admin')

const registerCollege = async (req, res) => {
  try {
    console.log(req.college)
    const { uid, email, name } = req.college;

    let college = await College.findOne({ $or: [{ uid: uid }, { name: name }] });
    if (college) {
      try {
        await admin.auth().deleteUser(req.college.uid);
        console.log("Firebase user deleted due to registration error.");
      } catch (firebaseError) {
        console.error("Error deleting user from Firebase Auth:", firebaseError);
      }
      return res.status(400).json({ message: "College already exists" });

    }

    college = new College({ uid, email, name });
    await college.save(); // Ensure save is awaited

    res.status(201).json({ msg: "College Registered Successfully" ,uid:uid});
  } catch (e) {
    console.error("Registration Error: ", e); // Log the actual error
    return res.status(500).json({ error: e.message }); // Send error message
  }
}

const loginCollege = async (req, res) => {
  try {
    const { uid } = req.college;
    const college = await College.findOne({ uid });

    if (!college) return res.status(404).json({ msg: "College not found" });

    res.status(200).json({ msg: "Login Successful" ,uid:uid});
  } catch (e) {
    console.error("Login Error: ", e);
    res.status(500).json({ error: e.message });
  }
}

const setDetails = async (req, res) => {
  const {
    uid, name, collegeEmail, collegeCode, address, state, district, city,collegeLogo,
    pincode, adminName, adminEmail, adminContact, website, affiliation, accreditation
  } = req.body;
  try {
    const updatedCollege = await College.findOneAndUpdate(
      { uid },
      {
        name, collegeEmail, collegeCode, address, state, district, city,
        pincode, adminName, adminEmail, adminContact, website, affiliation, accreditation,collegeLogo
      },
      { new: true, upsert: false } // `new: true` returns the updated document
    );

    if (!updatedCollege) {
      return res.status(404).json({ message: "College not found" });
    }

    res.status(200).json({ message: "College details updated", college: updatedCollege });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
}

const verifyCollege = async (req, res) => {
  const { collegeUid } = req.params;
  try {
      const college = await College.findOne({ uid: collegeUid });
      if(college.verified)
        return res.status(200).json({message:"College is verifies",status:"Ok"})
      else
        return res.status(400).json({message:"College is not verified",status:"NotOK"})
  } catch (error) {
      res.status(500).json({ error: "Internal server error"});
  }
}

const getDetails = async (req, res) => {
  try {
    const collegeUid = req.params.collegeUid
    const college =  await College.findOne({ uid: collegeUid })
    res.status(200).json(college)
  }
  catch (e) {
    res.status(500).json({ success: false, error: "Internal server error: " + e })
  }
}

const getCollegeList = async (req, res) => {
  try {
    const college = await College.find().sort({ verified: -1, createdAt: -1 })
    res.status(200).json({ success: true, college })
  } catch (e) {
    console.log("Error fetching college list")
    return res.status(500).json({ success: false, message: 'Internal server error', e })
  }
}

const changeStatus = async (req, res) => {
  try {
    const college = await College.findOne({ uid: req.params.collegeUid })

    if (!college) {
      return res.status(404).json({ success: false, message: 'College not found' })
    }

    const updatedCollege = await College.findOneAndUpdate(
      { uid: req.params.collegeUid },
      { $set: { verified: !college.verified } },
      { new: true }
    )

    return res.status(200).json({ success: true, college: updatedCollege })
  } catch (e) {
    console.log("Error changing status: ", e)
    return res.status(500).json({ success: false, message: 'Internal Server Error', e })
  }
}




module.exports = {registerCollege,loginCollege,setDetails,verifyCollege,getDetails,getCollegeList,changeStatus}