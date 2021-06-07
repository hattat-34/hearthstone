import React from 'react'
import { Modal, View, ActivityIndicator, StyleSheet, Text } from "react-native"

interface LoadingModalProps {
    loading: boolean
    text?: string
}
const Loading = (props: LoadingModalProps) => {
    return (
        <Modal transparent visible={props.loading}>
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#00ff00" />
                <Text style={styles.text}>
                    {props.text}
                </Text>
            </View>
        </Modal>
    )
}

export default Loading

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgba(0,0,0,0.33)',
        flex: 1,
        justifyContent: 'center'
    },
    text: {
        fontSize: 16,
        lineHeight: 21,
        includeFontPadding: false,
        fontFamily: "sans-serif-light",
        fontWeight: "normal",
        backgroundColor: "transparent",
        alignSelf: "center",
        color: "#00ff00",
    },
})