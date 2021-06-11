import React from "react"
import { FlatList, StyleSheet, Text, View, Modal, TouchableWithoutFeedback, ImageBackground, SafeAreaView } from "react-native"
import { Button, Headline, IconButton, Searchbar } from "react-native-paper"
import ButtonFilter from "../components/ButtonFilter"
import { Deck } from "../components/Deck"
import Loading from "../components/Loading"
import { filterByMechanic, filterByName, setCards } from "../redux/actions/CardActions"
import { cardReducer, CardState, initialCardState } from "../redux/reducers/CardReducer"
import Services from "../services/"

const Home = () => {
    const [cardState, dispatch]: [cardState: CardState, dispatch: any] = React.useReducer(cardReducer, initialCardState)
    const [filterModalVisible, setFilterModalVisible] = React.useState(false);
    const [searchQuery, setSearchQuery] = React.useState('');
    const onChangeSearch = (query: string) => setSearchQuery(query);
    const [loading, setLoading] = React.useState(true);
    const [listItemCount, setListItemCount] = React.useState(0);

    React.useEffect(() => {
        Services.Card.getAllCards()
            .then(res => dispatch(setCards(res)))
            .catch(err => console.log(err))
            .finally(() => setLoading(false))
    }, [])

    React.useEffect(() => {
        let total = 0;
        for (let section of cardState.sectionList)
            total += section.data.length

        setListItemCount(total);
    }, [cardState.sectionList])


    return (
        <>
            <ImageBackground
                style={StyleSheet.absoluteFillObject}
                source={require('../assets/images/bg.png')}
                resizeMode={"cover"}
            />
            <SafeAreaView />
            <Loading loading={loading} />
            <Modal
                hardwareAccelerated={true}
                transparent={true}
                visible={filterModalVisible}
                animationType="slide"
                onRequestClose={() => setFilterModalVisible(false)}
            >
                <SafeAreaView />
                <TouchableWithoutFeedback onPress={() => setFilterModalVisible(false)}>
                    <View style={styles.modalOverlay} />
                </TouchableWithoutFeedback>
                <View style={styles.modalContainer}>
                    <View style={styles.modalView}>
                        <Headline style={styles.selectorHeadline}>Select a card mechanic...</Headline>
                        <ButtonFilter
                            keys={cardState.cardMechanics}
                            onPick={(result: string) => dispatch(filterByMechanic(result, cardState))}
                        />
                        <Button labelStyle={styles.selectorButton} onPress={() => setFilterModalVisible(false)}>OK</Button>
                    </View>
                </View>
            </Modal>
            <View style={styles.headerContainer}>
                <Searchbar
                    value={searchQuery}
                    onChangeText={onChangeSearch}
                    placeholder="Search..."
                    onEndEditing={e => dispatch(filterByName(e.nativeEvent.text, cardState))}
                    style={styles.searchBar}
                />
                <IconButton
                    icon="filter-variant"
                    color={'#FFF'}
                    size={35}
                    onPress={() => setFilterModalVisible(true)}
                />
            </View>
            <Text style={styles.listCounterLabel}>{`Total Item: ${listItemCount}`}</Text>
            <FlatList
                data={cardState.sectionList}
                keyExtractor={(section) => section.title}
                initialNumToRender={3}
                maxToRenderPerBatch={3}
                renderItem={({ item }) => (<Deck section={item} />)}
                ListEmptyComponent={renderNoResult}
            />
        </>
    )

    function renderNoResult() {
        if (Object.keys(cardState.allCards).length > 0)
            return (
                <View style={styles.noResultContainer}>
                    <Text style={styles.noResultText}>Sorry, we can't find anything..</Text>
                </View>
            )
        return null
    }
}

const styles = StyleSheet.create({
    headerContainer: {
        alignItems: 'center',
        padding: 10,
        flexDirection: 'row',
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
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalView: {
        margin: 20,
        backgroundColor: "#FFF",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalOverlay: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
    selectorHeadline: {
        marginBottom: 25,
        borderBottomWidth: 0.7
    },
    selectorButton: {
        fontSize: 20
    },
    searchBar: {
        height: 50,
        width: '85%',
        marginRight: 5
    },
    listCounterLabel: {
        marginRight: 10,
        alignSelf: 'flex-end',
        color: "#FFF"
    },
    noResultContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '50%'
    },
    noResultText: {
        color: "#FFF",
        fontSize: 17,
    }
})

export default Home
