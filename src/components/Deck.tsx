import React, { memo } from "react"
import { FlatList, StyleSheet, Text, View } from "react-native"
import { HearthStoneCard } from "../model/Cards"
import { SectionListItem } from "../redux/reducers/CardReducer"
import Card from './Card'

interface DeckProps {
    section: SectionListItem
}

export const Deck = ({ section }: DeckProps) => {
    if (section.data.length > 0) {
        return (
            <>

                <View style={styles.headerContainer}>
                    <Text style={styles.sectionHeader}>
                        {section.title}
                    </Text>
                    <View style={styles.sectionSeperator} />
                </View>
                <FlatList
                    keyExtractor={(item) => item.cardId}
                    horizontal
                    initialNumToRender={3}
                    maxToRenderPerBatch={3}
                    windowSize={4}
                    showsHorizontalScrollIndicator={false}
                    data={section.data}
                    renderItem={renderCard}
                />
            </>
        )
    }
    return null
}

function renderCard({ item }: { item: HearthStoneCard }) {
    return (<Card data={item} />)
}

export const styles = StyleSheet.create({
    headerContainer: {
        padding: 10,
        flexDirection: 'row'
    },
    sectionHeader: {
        fontSize: 20,
        color: '#FFF',
        fontWeight: 'bold'
    },
    sectionSeperator: {
        flex: 1,
        alignSelf: 'center',
        marginLeft: 20,
        borderBottomColor: '#FFF',
        borderBottomWidth: 2,
    },
})

export default memo(Deck);