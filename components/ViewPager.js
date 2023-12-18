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
// import { getBanners } from "../Util/auth";

const Data = [
    require("../assets/drawables/banner.png"),
    require("../assets/drawables/banner2.png"),
    require("../assets/drawables/banner3.png"),
  ];

const ViewPager = ({ navigation }) => {
//   const [bannerData, setBannerData] = useState({ banners: [Data] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // const fetchData = async () => {
    //   try {
    //     const data = await getBanners();
    //     setBannerData(data);
    //   } catch (error) {
    //     console.error("Error fetching banner data:", error);
    //   } finally {
    //     setLoading(false);
    //   }
    // };

    // fetchData();
  }, []);

//   if (loading) {
//     return (
//       <ActivityIndicator
//         size="large"
//         color="black"
//         style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
//       />
//     );
//   }

  return (
    <Swiper
      style={styles.wrapper}
      showsButtons={false}
      autoplay={true}
      autoplayTimeout={5} // Set to 3 seconds
      showsPagination={true} // Enable pagination (dots)
      dotStyle={{ backgroundColor: "black", width: 8, height: 8 }} // Customize dot style
      activeDotStyle={{ backgroundColor: Colorss.green, width: 10, height: 10 }} // Customize active dot style
    >
      {Data.map((banner, id) => (
        <Pressable key={id} >
          <View  style={styles.slide}>
            {/* <Image style={styles.image} source={{ uri: banner.image }} /> */}
            <Image style={styles.image} source={ banner} />

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
    height: 200,
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