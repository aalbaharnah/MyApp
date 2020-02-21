import React, { Component } from "react";
import { View, Text, StyleSheet, ActivityIndicator, Platform, TouchableOpacity } from "react-native"
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import Constants from "expo-constants";
import { gets } from "../js"

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
        gets.WeatherInfo(`${lat},${lng}`).then(data => {
            this.setState({
                city: data, // save weather response data in state
                isLoaded: true // flag isLoaded is true
            })
        })
    }

    // Gets weather info by city name
    async getWeatherBySearch(city_name) {
        this.setState({ isLoaded: false })
        gets.WeatherInfo(city_name).then(data => {
            this.setState({
                city: data,
                isLoaded: true,
                text: "", // reset text
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
                {/* view with the hight status bar height */}

                <View style={{ height: Constants.statusBarHeight, }} />


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
                        <View style={styles.section}>

                            {/* if city.location is not null show city name */}
                            <View style={{ flex: 1 }}>
                                {this.state.city.location != null && (
                                    <View>
                                        <Text style={{ fontSize: 28, fontWeight: "700" }}>{this.state.city.location.name}</Text>
                                        <Text style={{ fontSize: 16, color: "#b3b3b3" }}>{this.state.city.location.region}</Text>
                                    </View>
                                )}
                            </View>
                            <View style={{ flex: 1 }} />
                        </View>

                        <View style={styles.section}>
                            <View style={{ flex: 1 }}>
                                <View>
                                    <Text style={{ fontSize: 82, fontWeight: "bold" }}>{this.state.city.current.temperature}°</Text>
                                    {/* list of all desciptions comming from api */}
                                    {this.state.city.current.weather_descriptions.map((description, index) => {
                                        return (
                                            <Text
                                                key={`description_${index}`}
                                                style={{ color: "#b3b3b3", fontSize: 18, }}
                                            >{description}</Text>
                                        )
                                    })}
                                </View>
                            </View>
                            <View style={{ flex: 1 }} />
                        </View>

                        {/* bottom weather info */}
                        <View style={styles.bottom_container}>
                            <View style={styles.flex_center}>
                                <Icon.Feather name={"wind"} size={24} color={"#000"} />
                                <Text style={{ color: "#b3b3b3" }}>{this.state.city.current.wind_speed} mph</Text>
                            </View>
                            <View style={styles.flex_center}>
                                <Icon.Feather name={"eye"} size={24} color={"#000"} />
                                <Text style={{ color: "#b3b3b3" }}>{this.state.city.current.visibility}</Text>
                            </View>
                            <View style={styles.flex_center}>
                                <Icon.Feather name={"droplet"} size={24} color={"#000"} />
                                <Text style={{ color: "#b3b3b3" }}>{this.state.city.current.humidity}%</Text>
                            </View>
                        </View>

                    </View>

                ) : (
                        <View style={styles.flex_center}>
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
    },
    section: {
        flex: 1,
        marginHorizontal: 40,
        flexDirection: "row"
    },
    bottom_container: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        marginHorizontal: 20
    },
    flex_center: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
})