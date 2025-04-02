const getStates= async (req, res) => {
    try {
      const response = await fetch("https://cdn-api.co-vin.in/api/v2/admin/location/states");
      const data = await response.json();
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch States" });
    }
  }

  const getDistricts = async (req, res) => {
    try {
      const { stateId } = req.params
      const response = await fetch(`https://cdn-api.co-vin.in/api/v2/admin/location/districts/${stateId}`)
      const data = await response.json()
      res.json(data)
    }
    catch (e) {
      res.status(500).json({ error: "Failed to fetch district" })
    }
  }

module.exports = {getStates,getDistricts}