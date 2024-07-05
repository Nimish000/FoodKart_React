const mongoose = require('mongoose');

const bannerSchema = mongoose.Schema(
  {
    url: {
      type: String,
      required: true,
    },
    id: {
      type: String,
      required: true,
    },
   
  },
  {
    timestamps: true,
  }
);

const Banner = mongoose.model('Banners', bannerSchema);

module.exports = Banner;
