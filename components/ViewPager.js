import React, { useEffect, useState } from "react";
import {
  View,
  Image,
  StyleSheet,
  ActivityIndicator,
  Pressable,
} from "react-native";
import Swiper from "react-native-swiper";
import { Colorss } from "../Colors/Colors";
import { Service } from "../Utils/Service/Service";
import { EndPoints } from "../Utils/Service/Endpoint";

const ViewPager = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [banners, setBanners] = useState([]);

  useEffect(() => {
    console.log(banners);
    getBannersList();
  }, []);

  const getBannersList = () => {
    var endPoint = EndPoints.banners;
    Service.getUsingToken(endPoint, (res) => {
      console.log("banners----->", res.banners);
      const convertedBanners = res.banners.map(banner => ({
        ...banner,
        url: convertDriveUrl(banner.url),
      }));
      setBanners(convertedBanners);
      setLoading(false);
    },
    (err) => {
      console.error("Error fetching banner data:", err);
      setLoading(false);
    });
  };

  const convertDriveUrl = (url) => {
    const fileId = url.split('/d/')[1].split('/view')[0];
    return `https://drive.google.com/uc?id=${fileId}`;
  };

  if (loading) {
    return (
      <ActivityIndicator
        size="large"
        color="black"
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      />
    );
  }

  return (
    <Swiper
      style={styles.wrapper}
      showsButtons={false}
      autoplay={true}
      autoplayTimeout={5}
      showsPagination={true}
      dotStyle={{ backgroundColor: "black", width: 8, height: 8 }}
      activeDotStyle={{ backgroundColor: Colorss.green, width: 10, height: 10 }}
    >
      {banners.map((banner, id) => (
        <Pressable key={id}>
          <View style={styles.slide}>
            <Image style={styles.image} source={{ uri: banner.url }} />
          </View>
        </Pressable>
      ))}
    </Swiper>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    height: 220,
  },
  slide: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 6,
    resizeMode: "cover",
  },
});

export default ViewPager;
