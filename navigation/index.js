// import { createAppContainer } from "react-navigation";
// import { createStackNavigator } from "react-navigation-stack";

// import MainScreen from "../screens/MainScreen";
// import ListScreen from "../screens/ListScreen";

// const StackNavigator = createStackNavigator({
//     main: {
//         screen: MainScreen,
//         navigationOptions: {
//             header: null
//         }
//     },
//     list: {
//         screen: ListScreen
//     }
// })

// const AppContainer = createAppContainer(StackNavigator);

// export default AppContainer;

import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import MainScreen from "../screens/MainScreen";
import ListScreen from "../screens/ListScreen";

const Stack = createStackNavigator();

export default () => {
    return (
        <NavigationContainer>
            <Stack.Navigator headerMode={"none"}>
                {/* add screens here */}
                <Stack.Screen name={"main"} component={MainScreen}/>
                <Stack.Screen name={"list"} component={ListScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}