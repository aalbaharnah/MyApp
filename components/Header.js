// import React from "react";
// import { View, Text, StyleSheet, TextInput, TouchableOpacity } from "react-native";
// import * as Icon from "@expo/vector-icons";
// import { connect } from "react-redux";
// import { ADD, REMOVE } from "../redux/actions/types"

// class Header extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             focus: false // default state of text input focus
//         }
//     }

//     onLikePress() {
//         // checks if this.props.cityName exist in the array this.props.Cities 
//         const isCityExist = this.props.Cities.some(city => city === this.props.cityName);

//         if (isCityExist) {
//             // remove city if already exist
//             this.props.dispatch({
//                 type: REMOVE,
//                 city: this.props.cityName
//             })
//         } else {
//             // add city if does not exit 
//             this.props.dispatch({
//                 type: ADD,
//                 city: this.props.cityName
//             })
//         }
//     }

//     render() {
//          // checks if this.props.cityName exist in the array this.props.Cities 
//         const isCityExist = this.props.Cities.some(city => city === this.props.cityName);

//         return (
//             <View style={{ marginHorizontal: 40, flexDirection: "row" }}>

//                 <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
//                     <Icon.Feather name={"search"} size={22} color={this.state.focus ? "#000" : "#b3b3b3"} />
//                     <View style={{ marginHorizontal: 10 }}>
//                         <TextInput
//                             placeholder={"Where ... ?"}
//                             value={this.props.text}
//                             onChangeText={text => this.props.onChange(text)} // triggered automatically when user types anything in keyboard
//                             onSubmitEditing={() => this.props.onSubmit()} // triggered when user press on return in keyboard
//                             onFocus={() => this.setState({ focus: true })} // changes state on foucs
//                             onBlur={() => this.setState({ focus: false })} // changes state on blur
//                         />
//                     </View>
//                 </View>

//                 <TouchableOpacity
//                     onPress={() => this.onLikePress()} 
//                 >
//                     {/* if city exist show colored button else show empty one */}
//                     {isCityExist ? (
//                         <Icon.AntDesign name={"like1"} size={22} color={"#000"} />
//                     ) : (
//                             <Icon.AntDesign name={"like2"} size={22} color={"#000"} />
//                         )}
//                 </TouchableOpacity>

//                 <TouchableOpacity style={{ marginLeft: 10 }}
//                     onPress={() => this.props.navigation.navigate("list", {
//                         name: "Ali", // passing name to next screen
//                         onSearchCityName: (name) => this.props.getWeatherBySearch(name) // passing function from props to next screen
//                     })}
//                 >
//                     <Icon.AntDesign name={"arrowright"} size={22} color={"#000"} />
//                 </TouchableOpacity>
//             </View>
//         )
//     }
// }

// // listing the needed reducers
// const MapStateToProps = state => ({
//     // add reducers here
//     Cities: state.Cities
// })

// // connecting the list of reducers with the current compoenent
// export default connect(MapStateToProps)(Header)

import React, { useState, useEffect } from "react"
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import * as Icon from "@expo/vector-icons";
import { connect, useSelector, useDispatch } from "react-redux";
import { ADD, REMOVE } from "../redux/actions/types"

const Header = (props) => {
    const dispatch = useDispatch();
    const Cities = useSelector(state => state.Cities);

    const [foucs, setFoucs] = useState(false);
    const [background, setBackground] = useState("#fff")

    useEffect(() => {
        // RUN ONCE VIEW IS RENDER
        const color = background === "#fff" ? "#b3b3b3" :  "#fff"
        setBackground(color)
    },[Cities])

    function onLikePress() {
        // checks if this.props.cityName exist in the array this.props.Cities 
        const isCityExist = Cities.some(city => city === props.cityName);

        if (isCityExist) {
            // remove city if already exist
            dispatch({
                type: REMOVE,
                city: props.cityName
            })
        } else {
            // add city if does not exit 
            dispatch({
                type: ADD,
                city: props.cityName
            })
        }
    }

    const isCityExist = Cities.some(city => city === props.cityName);
    return (
        <View style={{ marginHorizontal: 40, flexDirection: "row", backgroundColor: background }}>

            <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
                <Icon.Feather name={"search"} size={22} color={foucs ? "#000" : "#b3b3b3"} />
                <View style={{ marginHorizontal: 10 }}>
                    <TextInput
                        placeholder={"Where ... ?"}
                        value={props.text}
                        onChangeText={text => props.onChange(text)} // triggered automatically when user types anything in keyboard
                        onSubmitEditing={() => props.onSubmit()} // triggered when user press on return in keyboard
                        onFocus={() => setFoucs(true)} // changes state on foucs
                        onBlur={() => setFoucs(false)} // changes state on blur
                    />
                </View>
            </View>

            <TouchableOpacity
                onPress={() => onLikePress()}
            >
                {/* if city exist show colored button else show empty one */}
                {isCityExist ? (
                    <Icon.AntDesign name={"like1"} size={22} color={"#000"} />
                ) : (
                        <Icon.AntDesign name={"like2"} size={22} color={"#000"} />
                    )}
            </TouchableOpacity>

            <TouchableOpacity style={{ marginLeft: 10 }}
                onPress={() => props.navigation.navigate("list", {
                    name: "Ali", // passing name to next screen
                    onSearchCityName: (name) => props.getWeatherBySearch(name) // passing function from props to next screen
                })}
            >
                <Icon.AntDesign name={"arrowright"} size={22} color={"#000"} />
            </TouchableOpacity>
        </View>
    )

}

export default Header;