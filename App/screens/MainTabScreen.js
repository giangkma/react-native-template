import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import Icon from "react-native-vector-icons/Ionicons";
import DetailsScreen from "./DetailsScreen";
import HomeScreen from "./HomeScreen";

const HomeStack = createStackNavigator();
const DetailsStack = createStackNavigator();

export const HomeStackScreen = ({ navigation }) => (
    <HomeStack.Navigator
        screenOptions={{
            headerStyle: {
                backgroundColor: "#009387",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
                fontWeight: "bold",
            },
        }}
    >
        <HomeStack.Screen
            name="Home"
            component={HomeScreen}
            options={{
                title: "Trang chủ",
                headerLeft: () => (
                    <Icon.Button
                        name="ios-menu"
                        size={25}
                        backgroundColor="#009387"
                        onPress={() => navigation.openDrawer()}
                    ></Icon.Button>
                ),
            }}
        />
    </HomeStack.Navigator>
);

export const DetailsStackScreen = ({ navigation }) => (
    <DetailsStack.Navigator
        screenOptions={{
            headerStyle: {
                backgroundColor: "#1f65ff",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
                fontWeight: "bold",
            },
        }}
    >
        <DetailsStack.Screen
            name="Details"
            component={DetailsScreen}
            options={{
                headerLeft: () => (
                    <Icon.Button
                        name="ios-menu"
                        size={25}
                        backgroundColor="#1f65ff"
                        onPress={() => navigation.openDrawer()}
                    ></Icon.Button>
                ),
            }}
        />
    </DetailsStack.Navigator>
);
