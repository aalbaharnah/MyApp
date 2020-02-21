import React, { Component } from "react";
import { View, Text, StyleSheet, Platform, TouchableOpacity, FlatList } from "react-native";
import Constants from "expo-constants";
import * as Icon from "@expo/vector-icons";
import { connect } from "react-redux";
import City from "../components/City"

class ListScreen extends Component {

    onPress(item) {
        const params = this.props.route.params // extract params object from previous screen
        params.onSearchCityName(item); // exexute funtion in the previous screen 

        this.props.navigation.goBack(); // navigate back to the previous screen
    }

    render() {
        return (
            <View style={styles.container}>

                <View style={{ height: Constants.statusBarHeight, }} />

                {/* Customizable icon to press on to navigate to pervious screen */}
                <TouchableOpacity style={{ marginLeft: 20, height: 55, justifyContent: "center" }}
                    onPress={() => this.props.navigation.goBack()}
                >
                    <Icon.AntDesign name={"arrowleft"} size={22} color={"#000"} />
                </TouchableOpacity>

                <View style={{ margin: 20 }}>
                    <Text style={{ fontSize: 24, fontWeight: "bold" }}>Favorite List</Text>
                </View>

                {/* List of favorite cities from redux */}
                <FlatList
                    data={this.props.Cities}
                    keyExtractor={(item, index) => `${item}_${index}`}
                    renderItem={({ item }) => <City cityName={item} onPress={() => this.onPress(item)} />}
                />
            </View>
        )
    }
}

// listing the needed reducers
const MapStateToProps = state => ({
    // add reducers here
    Cities: state.Cities
})

// connecting the list of reducers with the current compoenent
export default connect(MapStateToProps)(ListScreen)

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})