import React, { Component } from "react";
import { View, Text, StyleSheet, ActivityIndicator, Platform, TouchableOpacity } from "react-native"
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import Constants from "expo-constants";
import { myKey } from "../MyKey/mykey"

import * as Icon from "@expo/vector-icons";

import Header from "../components/Header"

export default class MainScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // default state values
            city: {},
            isLoaded: false,
            text: "",
        }
    }

    componentDidMount() {
        this.getLocation() // execute a funciton to get user location
    }

    getLocation() {
        // First get user permission
        Permissions.askAsync(Permissions.LOCATION).then(response => {
            if (response.status !== "granted") {
                alert("Permission is denied اخوك"); // return alert if permission is not granted
                return; // stops here and not continue below 
            }

            // gets user coords
            Location.getCurrentPositionAsync({}).then((location) => {
                const coords = location.coords;
                const lat = coords.latitude; // extract latitude
                const lng = coords.longitude; // extract longitude

                // execute a function with coords to get weather info
                this.getWeatherByCoords(lat, lng);
            })
        })
    }

    // Gets weather info by coords
    async getWeatherByCoords(lat, lng) {
        const key = myKey
        if(!key){
            alert("where is your key اخوك");
            return;
        }
        return fetch(
            `http://api.weatherstack.com/current?access_key=${key}&query=${lat},${lng}`
        ).then(response => response.json()).then(data => {
            this.setState({
                city: data, // save weather response data in state
                isLoaded: true, // flag isLoaded is true
            })
        })
    }

    // Gets weather info by city name
    async getWeatherBySearch(city_name) {
        const key = myKey
        if(!key){
            alert("where is your key اخوك");
            return;
        }
        this.setState({ isLoaded: false })
        return fetch(
            `http://api.weatherstack.com/current?access_key=${key}&query=${city_name}`
        ).then(response => response.json()).then(data => {
            this.setState({
                city: data, // save weather response data in state
                isLoaded: true, // flag isLoaded is true
                text: "" // reset text
            })
        })
    }

    // Executed when user press on Enter on keyboard
    onSubmitEditing() {
        this.getWeatherBySearch(this.state.text); // current typed city
    }


    render() {
        return (
            <View style={styles.container}>
                {/* view with the hight status bar height only and only if OS is ios */}
                {Platform.OS === "ios" && (
                    <View style={{ height: Constants.statusBarHeight, }} />
                )}

                {/* text input search, like button and navigation arrow */}
                <Header
                    onChange={(text) => this.setState({ text })} // onChangeText inside the header
                    onSubmit={() => this.onSubmitEditing()} // onSubmitEditing inside the header
                    text={this.state.text} // passing current text state to header
                    navigation={this.props.navigation} // passing navigation props to header
                    cityName={this.state.city.location ? this.state.city.location.name : null} // if city is not {} and has a location key pass location.name else pass null
                    getWeatherBySearch={name => this.getWeatherBySearch(name)} // passing getWeatherBySearch function to header
                />


                {/* if is loaded is true show the full view else show activity indicatior */}
                {this.state.isLoaded ? (
                    <View style={{ flex: 1 }}>
                        <View style={{ flex: 1, margin: 40 }}>

                            {/* if city.location is not null show city name */}
                            {this.state.city.location != null && (
                                <Text style={{ fontSize: 22 }}>{this.state.city.location.name}</Text>
                            )}
                        </View>

                        <View style={{ flex: 2, justifyContent: "center", marginHorizontal: 40 }}>
                            <Text style={{ fontSize: 62, fontWeight: "bold" }}>{this.state.city.current.temperature}°</Text>
                            {/* list of all desciptions comming from api */}
                            {this.state.city.current.weather_descriptions.map((description, index) => {
                                return (
                                    <Text
                                        key={`description_${index}`}
                                        style={{ color: "#b3b3b3" }}
                                    >{description}</Text>
                                )
                            })}
                        </View>

                        {/* bottom weather info */}
                        <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-between", marginHorizontal: 20 }}>
                            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                                <Icon.Feather name={"wind"} size={18} color={"#000"} />
                                <Text>{this.state.city.current.wind_speed}</Text>
                            </View>
                            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                                <Icon.Feather name={"eye"} size={18} color={"#000"} />
                                <Text>{this.state.city.current.visibility}</Text>
                            </View>
                            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                                <Icon.Feather name={"droplet"} size={18} color={"#000"} />
                                <Text>{this.state.city.current.humidity}</Text>
                            </View>
                        </View>

                    </View>

                ) : (
                        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                            <ActivityIndicator />
                        </View>
                    )
                }
            </View>
        )
    }






}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff"
    }
})