import React, { memo } from 'react';
import { ImageBackground, StyleSheet, Text, View } from 'react-native';
import { HearthStoneCard } from '../model'

interface CardProps {
    data: HearthStoneCard
}

const Card = ({ data }: CardProps) => {
    const imgSource = data.img ? { uri: data.img } : require('../assets/images/card.png')

    const populateCard = () => {
        if (!!data.img)
            return null
        return (
            <>
                <Text style={[styles.description, styles.name]}>{data.name}</Text>
                <Text style={styles.description}>{data.text}</Text>
                <Text style={styles.health}>{data.health}</Text>
                <Text style={styles.attack}>{data.attack}</Text>
                <Text style={styles.cost}>{data.cost}</Text>
            </>
        )
    }

    return (
        <View style={styles.container} >
            <ImageBackground
                source={imgSource}
                style={styles.background}
                resizeMode="contain"
            >
                {populateCard()}
            </ImageBackground>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 10,
    },
    name: {
        top: '52.5%',
        transform: [{ rotate: "-7deg" }],
        fontWeight: 'bold',
        fontSize: 12,
    },
    description: {
        position: 'absolute',
        top: '66%',
        left: '20%',
        right: '20%',
        textAlign: 'center',
        color: '#FFF',
        fontSize: 12,
    },
    background: {
        width: 200,
        height: undefined,
        aspectRatio: 0.7
    },
    health: {
        position: 'absolute',
        right: '10%',
        bottom: '5%',
        color: '#FFF',
        fontSize: 15,
    },
    attack: {
        position: 'absolute',
        left: '12%',
        bottom: '5%',
        color: '#FFF',
        fontSize: 15,
    },
    cost: {
        position: 'absolute',
        left: '11%',
        top: '9%',
        color: '#FFF',
        fontSize: 25,
        fontWeight: 'bold'
    }
})

const arePropsEqual = (prevProps: CardProps, nextProps: CardProps) => {
    return prevProps.data.cardId === nextProps.data.cardId
}

export default memo(Card, arePropsEqual)