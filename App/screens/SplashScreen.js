import React from "react";
import {
    View,
    Text,
    TouchableOpacity,
    Dimensions,
    StyleSheet,
    StatusBar,
    Image,
} from "react-native";
import * as Animatable from "react-native-animatable";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { useTheme } from "@react-navigation/native";

const SplashScreen = ({ navigation }) => {
    const { colors } = useTheme();

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor="#009387" barStyle="light-content" />
            <View style={styles.header}>
                <Animatable.Image
                    animation="pulse"
                    easing="ease-out"
                    iterationCount="infinite"
                    source={require("../assets/logo.png")}
                    style={styles.logo}
                    resizeMode="stretch"
                />
            </View>
            <Animatable.View
                style={[
                    styles.footer,
                    {
                        backgroundColor: colors.background,
                    },
                ]}
                animation="fadeInUpBig"
            >
                <Animatable.Text animation="fadeInUpBig">
                    <Text
                        style={[
                            styles.title,
                            {
                                color: colors.text,
                            },
                        ]}
                    >
                        Chào mừng bạn !
                    </Text>
                </Animatable.Text>

                <Animatable.Text animation="fadeInUpBig" delay={500}>
                    <Text style={styles.text}>
                        ✔️ MLAB luôn tự hào là ứng dụng học tập hàng đâù Việt
                        Nam về chất lượng
                    </Text>
                </Animatable.Text>
                <Animatable.Text animation="fadeInUpBig" delay={1000}>
                    <Text style={styles.text}>
                        ✔️ Với chọn bộ câu hỏi Toán học dưới hình thức trắc
                        nghiệm cho học sinh từ lớp 1 đến lớp 12
                    </Text>
                </Animatable.Text>

                <Animatable.Text animation="fadeInUpBig" delay={1500}>
                    <Text style={styles.text}>
                        ✔️ Học sinh sẽ được xếp hạng số điểm mà mình đạt được
                        sau mỗi buổi học, điều này sẽ giúp tăng hứng thú học tập
                    </Text>
                </Animatable.Text>

                <Animatable.Text animation="fadeInUpBig" delay={2000}>
                    <Text style={styles.text}>
                        ✔️ Và còn rất nhiều điều thú vị nữa đang chờ đón bạn !
                        Hãy bắt đầu nào !
                    </Text>
                </Animatable.Text>

                <View style={styles.button}>
                    <TouchableOpacity
                        onPress={() => navigation.navigate("SignInScreen")}
                        style={{ display: "flex", flexDirection: "row" }}
                    >
                        <Animatable.Text animation="fadeInUpBig" delay={2500}>
                            <Text style={styles.textSign}>Bắt đầu</Text>
                        </Animatable.Text>
                        <Animatable.Text animation="fadeInUpBig" delay={2500}>
                            <MaterialIcons
                                name="navigate-next"
                                color="black"
                                size={35}
                            />
                        </Animatable.Text>
                    </TouchableOpacity>
                </View>
            </Animatable.View>
        </View>
    );
};

export default SplashScreen;

const { height } = Dimensions.get("screen");
const height_logo = height * 0.28;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#009387",
    },
    header: {
        flex: 2,
        justifyContent: "center",
        alignItems: "center",
    },
    footer: {
        flex: 1,
        backgroundColor: "#fff",
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingVertical: 40,
        paddingHorizontal: 30,
        paddingBottom: 100,
    },
    logo: {
        width: height_logo,
        height: height_logo,
    },
    title: {
        color: "#05375a",
        fontSize: 30,
        fontWeight: "bold",
    },
    text: {
        color: "grey",
        marginTop: 5,
    },
    button: {
        alignItems: "center",
        marginTop: 30,
    },
    signIn: {
        width: 150,
        height: 40,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 50,
        flexDirection: "row",
    },
    textSign: {
        color: "black",
        fontWeight: "bold",
        fontSize: 24,
    },
});
