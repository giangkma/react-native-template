/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import AsyncStorage from "@react-native-community/async-storage";
import { createDrawerNavigator } from "@react-navigation/drawer";
import {
    DarkTheme as NavigationDarkTheme,
    DefaultTheme as NavigationDefaultTheme,
    NavigationContainer,
} from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
    DarkTheme as PaperDarkTheme,
    DefaultTheme as PaperDefaultTheme,
    Provider as PaperProvider,
} from "react-native-paper";
import { AuthContext } from "./components/context";
import { DrawerContent } from "./screens/DrawerContent";
import MainTabScreen, {
    DetailsStackScreen,
    HomeStackScreen,
} from "./screens/MainTabScreen";
import AuthScreen from "./screens/RootStackScreen";
import LoadingApp from "./screens/LoadingApp";
import SupportScreen from "./screens/SupportScreen";
import { createStackNavigator } from "@react-navigation/stack";

const Drawer = createStackNavigator();

const App = () => {
    const [isDarkTheme, setIsDarkTheme] = React.useState(false);

    const initialLoginState = {
        isLoading: true,
        userName: null,
        userToken: null,
    };

    const CustomDefaultTheme = {
        ...NavigationDefaultTheme,
        ...PaperDefaultTheme,
        colors: {
            ...NavigationDefaultTheme.colors,
            ...PaperDefaultTheme.colors,
            background: "#ffffff",
            text: "#333333",
        },
    };

    const CustomDarkTheme = {
        ...NavigationDarkTheme,
        ...PaperDarkTheme,
        colors: {
            ...NavigationDarkTheme.colors,
            ...PaperDarkTheme.colors,
            background: "#333333",
            text: "#ffffff",
        },
    };

    const theme = isDarkTheme ? CustomDarkTheme : CustomDefaultTheme;

    const loginReducer = (prevState, action) => {
        switch (action.type) {
            case "RETRIEVE_TOKEN":
                return {
                    ...prevState,
                    userToken: action.token,
                    isLoading: false,
                };
            case "LOGIN":
                return {
                    ...prevState,
                    userName: action.id,
                    userToken: action.token,
                    isLoading: false,
                };
            case "LOGOUT":
                return {
                    ...prevState,
                    userName: null,
                    userToken: null,
                    isLoading: false,
                };
            case "REGISTER":
                return {
                    ...prevState,
                    userName: action.id,
                    userToken: action.token,
                    isLoading: false,
                };
        }
    };

    const [loginState, dispatch] = React.useReducer(
        loginReducer,
        initialLoginState
    );

    const authContext = React.useMemo(
        () => ({
            signIn: async (foundUser) => {
                // setUserToken('fgkj');
                // setIsLoading(false);
                const userToken = String(foundUser[0].userToken);
                const userName = foundUser[0].username;

                try {
                    await AsyncStorage.setItem("userToken", userToken);
                } catch (e) {
                    console.log(e);
                }
                // console.log('user token: ', userToken);
                dispatch({ type: "LOGIN", id: userName, token: userToken });
            },
            signOut: async () => {
                // setUserToken(null);
                // setIsLoading(false);
                try {
                    await AsyncStorage.removeItem("userToken");
                } catch (e) {
                    console.log(e);
                }
                dispatch({ type: "LOGOUT" });
            },
            signUp: () => {
                // setUserToken('fgkj');
                // setIsLoading(false);
            },
            toggleTheme: () => {
                setIsDarkTheme((isDarkTheme) => !isDarkTheme);
            },
        }),
        []
    );

    const [showLoadingPage, setShowLoadingPage] = useState(true);
    // useEffect(() => {
    //     setTimeout(async () => {
    //         setShowLoadingPage(false);
    //     }, 6000);
    // }, [setShowLoadingPage]);

    if (showLoadingPage) {
        return <LoadingApp />;
    }

    return (
        <PaperProvider theme={theme}>
            <AuthContext.Provider value={authContext}>
                <NavigationContainer theme={theme}>
                    {loginState.userToken !== null ? (
                        <Drawer.Navigator
                            drawerContent={(props) => (
                                <DrawerContent {...props} />
                            )}
                        >
                            <Drawer.Screen
                                name="HomeDrawer"
                                component={HomeStackScreen}
                            />
                            <Drawer.Screen
                                name="Details"
                                component={DetailsStackScreen}
                            />
                            <Drawer.Screen
                                name="SupportScreen"
                                component={SupportScreen}
                            />
                        </Drawer.Navigator>
                    ) : (
                        <AuthScreen />
                    )}
                </NavigationContainer>
            </AuthContext.Provider>
        </PaperProvider>
    );
};

export default App;
