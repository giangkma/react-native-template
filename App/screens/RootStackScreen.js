import React from "react";

import { createStackNavigator } from "@react-navigation/stack";

import SignInScreen from "./SignInScreen";
import SignUpScreen from "./SignUpScreen";

const AuthStack = createStackNavigator();

const AuthScreen = ({ navigation }) => (
    <AuthStack.Navigator headerMode="none">
        <AuthStack.Screen name="SignInScreen" component={SignInScreen} />
        <AuthStack.Screen name="SignUpScreen" component={SignUpScreen} />
    </AuthStack.Navigator>
);

export default AuthScreen;
