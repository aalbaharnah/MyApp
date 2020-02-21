import React, { useState, useEffect } from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

export default ({ cityName, onPress }) => {
    const [temp, setTemp] = useState(0);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        getWeatherInfo()
    }, []);

    return (
        <TouchableOpacity
            onPress={() => onPress()}
            style={styles.container}
        >
            <Text>{cityName}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 20,
        borderBottomWidth: 1,
        paddingVertical: 5,
        borderBottomColor: "#b3b3b3"
    }
})