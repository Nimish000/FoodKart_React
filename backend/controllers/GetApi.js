

const Banner = require("../models/Banner");



// Controller to get the list of banners
const getBanners = async (req, res) => {
  try {
    const banners = await Banner.find({});
    res.status(200).json({
      message: 'Banners fetched successfully',
      result_flag: 1,
      banners,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error', result_flag: 0 });
  }
};




module.exports = { getBanners };

