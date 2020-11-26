import React from "react";
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    Platform,
    StyleSheet,
    StatusBar,
    Alert,
} from "react-native";
import * as Animatable from "react-native-animatable";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";

import { useTheme } from "react-native-paper";

import { AuthContext } from "../components/context";

import Users from "../model/users";

const SignInScreen = ({ navigation }) => {
    const [data, setData] = React.useState({
        username: "",
        password: "",
        check_textInputChange: false,
        secureTextEntry: true,
        isValidUser: true,
        isValidPassword: true,
    });

    const { colors } = useTheme();

    const { signIn } = React.useContext(AuthContext);

    const textInputChange = (val) => {
        if (val.trim().length >= 4) {
            setData({
                ...data,
                username: val,
                check_textInputChange: true,
                isValidUser: true,
            });
        } else {
            setData({
                ...data,
                username: val,
                check_textInputChange: false,
                isValidUser: false,
            });
        }
    };

    const handlePasswordChange = (val) => {
        if (val.trim().length >= 8) {
            setData({
                ...data,
                password: val,
                isValidPassword: true,
            });
        } else {
            setData({
                ...data,
                password: val,
                isValidPassword: false,
            });
        }
    };

    const updateSecureTextEntry = () => {
        setData({
            ...data,
            secureTextEntry: !data.secureTextEntry,
        });
    };

    const handleValidUser = (val) => {
        if (val.trim().length >= 4) {
            setData({
                ...data,
                isValidUser: true,
            });
        } else {
            setData({
                ...data,
                isValidUser: false,
            });
        }
    };

    const loginHandle = (userName, password) => {
        const foundUser = Users.filter((item) => {
            return userName == item.username && password == item.password;
        });

        if (data.username.length == 0 || data.password.length == 0) {
            Alert.alert("Lỗi", "Tài khoản và mật khẩu không được để trống", [
                { text: "Đã hiểu" },
            ]);
            return;
        }

        if (foundUser.length == 0) {
            Alert.alert(
                "Người dùng không tồn tại!",
                "Tài khoản hoặc mật khẩu không chính xác",
                [{ text: "Đã hiểu" }]
            );
            return;
        }
        signIn(foundUser);
    };

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor="#009387" barStyle="light-content" />
            <View style={styles.header}>
                <Animatable.Text animation="fadeInRightBig">
                    <Text style={styles.text_header}>Đăng nhập</Text>
                </Animatable.Text>
            </View>

            <Animatable.View
                animation="fadeInUpBig"
                style={[
                    styles.footer,
                    {
                        backgroundColor: colors.background,
                    },
                ]}
            >
                <Text
                    style={[
                        styles.text_footer,
                        {
                            color: colors.text,
                        },
                    ]}
                >
                    Tài khoản
                </Text>
                <View style={styles.action}>
                    <FontAwesome name="user-o" color={colors.text} size={20} />
                    <TextInput
                        placeholder="Tài khoản"
                        placeholderTextColor="#666666"
                        style={[
                            styles.textInput,
                            {
                                color: colors.text,
                            },
                        ]}
                        autoCapitalize="none"
                        onChangeText={(val) => textInputChange(val)}
                        onEndEditing={(e) =>
                            handleValidUser(e.nativeEvent.text)
                        }
                    />
                    {data.check_textInputChange ? (
                        <Animatable.View animation="bounceIn">
                            <Feather
                                name="check-circle"
                                color="green"
                                size={20}
                            />
                        </Animatable.View>
                    ) : null}
                </View>
                {data.isValidUser ? null : (
                    <Animatable.View animation="fadeInLeft" duration={500}>
                        <Text style={styles.errorMsg}>
                            Tài khoản cần nhiều hơn 4 kí tự
                        </Text>
                    </Animatable.View>
                )}

                <Text
                    style={[
                        styles.text_footer,
                        {
                            color: colors.text,
                            marginTop: 35,
                        },
                    ]}
                >
                    Mật khẩu
                </Text>
                <View style={styles.action}>
                    <Feather name="lock" color={colors.text} size={20} />
                    <TextInput
                        placeholder="Mật khẩu"
                        placeholderTextColor="#666666"
                        secureTextEntry={data.secureTextEntry ? true : false}
                        style={[
                            styles.textInput,
                            {
                                color: colors.text,
                            },
                        ]}
                        autoCapitalize="none"
                        onChangeText={(val) => handlePasswordChange(val)}
                    />
                    <TouchableOpacity onPress={updateSecureTextEntry}>
                        {data.secureTextEntry ? (
                            <Feather name="eye-off" color="grey" size={20} />
                        ) : (
                            <Feather name="eye" color="grey" size={20} />
                        )}
                    </TouchableOpacity>
                </View>
                {data.isValidPassword ? null : (
                    <Animatable.View animation="fadeInLeft" duration={500}>
                        <Text style={styles.errorMsg}>
                            Mật khẩu cần nhiều hơn 8 kí tự
                        </Text>
                    </Animatable.View>
                )}

                <View style={styles.button}>
                    <TouchableOpacity
                        style={styles.signIn}
                        onPress={() => {
                            loginHandle(data.username, data.password);
                        }}
                        style={[
                            styles.signIn,
                            {
                                backgroundColor: "#009387",
                                marginTop: 15,
                            },
                        ]}
                    >
                        <Text
                            style={[
                                styles.textSign,
                                {
                                    color: "#fff",
                                },
                            ]}
                        >
                            Đăng nhập
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => navigation.navigate("SignUpScreen")}
                        style={[
                            styles.signIn,
                            {
                                borderColor: "#009387",
                                borderWidth: 1,
                                marginTop: 15,
                            },
                        ]}
                    >
                        <Text
                            style={[
                                styles.textSign,
                                {
                                    color: "#009387",
                                },
                            ]}
                        >
                            Đăng kí
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => navigation.navigate("SplashScreen")}
                        style={[
                            styles.signIn,
                            {
                                borderColor: "#009387",
                                borderWidth: 1,
                                marginTop: 15,
                            },
                        ]}
                    >
                        <Text
                            style={[
                                styles.textSign,
                                {
                                    color: "#009387",
                                },
                            ]}
                        >
                            Quay lại
                        </Text>
                    </TouchableOpacity>
                </View>
            </Animatable.View>
        </View>
    );
};

export default SignInScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#009387",
    },
    header: {
        flex: 1,
        justifyContent: "flex-end",
        paddingHorizontal: 20,
        paddingBottom: 50,
    },
    footer: {
        flex: 3,
        backgroundColor: "#fff",
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30,
    },
    text_header: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 30,
    },
    text_footer: {
        color: "#05375a",
        fontSize: 18,
    },
    action: {
        flexDirection: "row",
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#f2f2f2",
        paddingBottom: 5,
    },
    actionError: {
        flexDirection: "row",
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#FF0000",
        paddingBottom: 5,
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === "ios" ? 0 : -12,
        paddingLeft: 10,
        color: "#05375a",
    },
    errorMsg: {
        color: "#FF0000",
        fontSize: 14,
    },
    button: {
        alignItems: "center",
        marginTop: 50,
    },
    signIn: {
        width: "100%",
        height: 50,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
    },
    textSign: {
        fontSize: 18,
        fontWeight: "bold",
    },
});
