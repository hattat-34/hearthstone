import React from "react"
import { FlatList, StyleSheet, Text, View, Modal, TouchableWithoutFeedback } from "react-native"
import { Button, Headline, IconButton, Searchbar } from "react-native-paper"
import ButtonFilter from "../components/ButtonFilter"
import Card from "../components/Card"
import Loading from "../components/Loading"
import { HearthStoneCard } from "../model"
import { filterByMechanic, filterByName, setCards } from "../redux/actions/CardActions"
import { cardReducer, CardState, initialCardState } from "../redux/reducers/CardReducer"

const Home = () => {
    const [cardState, dispatch]: [cardState: CardState, dispatch: any] = React.useReducer(cardReducer, initialCardState)
    const [filterModalVisible, setFilterModalVisible] = React.useState(false);
    const mechanicList = React.useMemo(() => Object.keys(cardState.cardMechanicList), [cardState.cardMechanicList])
    const [searchQuery, setSearchQuery] = React.useState('');
    const onChangeSearch = (query: string) => setSearchQuery(query);
    const [loading, setLoading] = React.useState(true)
    // const mechanicFilterResult = React.useCallback((result) => {
    //     console.log(result);
    // }, [])

    React.useEffect(() => {
        const getAllCards = () => {
            fetch("https://omgvamp-hearthstone-v1.p.rapidapi.com/cards", {
                "method": "GET",
                "headers": {
                    "x-rapidapi-key": "fcd47dd5b0msh8d362b80a2d33bep1c48e4jsnd7bb0da826a7",
                    "x-rapidapi-host": "omgvamp-hearthstone-v1.p.rapidapi.com"
                }
            })
                .then(response => {
                    if (response.status === 200)
                        response.json()
                            .then(allcards => {
                                console.log('result: ', allcards);
                                dispatch(setCards(allcards))
                            })
                            .catch((error) => console.log(error))
                    else
                        console.log('response status: ', response.status)
                })
                .catch((error) => console.log(error))
        }
        getAllCards();
    }, [])

    React.useEffect(() => {
        if (Object.keys(cardState.allCards).length > 0)
            setLoading(false)
        console.log('cardState: ', cardState)
    }, [cardState])


    return (
        <>
            <Loading loading={loading} />
            <Modal
                hardwareAccelerated={true}
                transparent={true}
                visible={filterModalVisible}
                animationType="slide"
                onRequestClose={() => setFilterModalVisible(false)}
            >
                <TouchableWithoutFeedback onPress={() => setFilterModalVisible(false)}>
                    <View style={styles.modalOverlay} />
                </TouchableWithoutFeedback>
                <View style={styles.modalContainer}>
                    <View style={styles.modalView}>
                        <Headline style={{ marginBottom: 25, borderBottomWidth: 0.7 }}>Select a card mechanic...</Headline>
                        <ButtonFilter
                            keys={mechanicList}
                            onPick={(result: string) => dispatch(filterByMechanic(result, cardState))}
                        />
                        <Button labelStyle={{ fontSize: 20 }} onPress={() => setFilterModalVisible(false)}>OK</Button>
                    </View>
                </View>
            </Modal>
            <View style={styles.headerContainer}>
                <Searchbar
                    value={searchQuery}
                    onChangeText={onChangeSearch}
                    placeholder="Search..."
                    onEndEditing={e => dispatch(filterByName(e.nativeEvent.text, cardState))}
                    style={{ height: 50, width: '85%', marginRight: 5 }}
                />
                <IconButton
                    icon="filter-variant"
                    color={'red'}
                    size={35}
                    onPress={() => setFilterModalVisible(true)}
                />
            </View>
            <FlatList
                data={cardState.sectionList}
                keyExtractor={(section) => section.title}
                initialNumToRender={3}
                maxToRenderPerBatch={3}
                renderItem={renderListItem}
                ListEmptyComponent={renderNoResult}
            />
        </>
    )

    function renderNoResult() {
        if (Object.keys(cardState.allCards).length > 0)
            return (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: '50%' }}>
                    <Text style={{ fontSize: 17 }}>Sorry, we can't find anything..</Text>
                </View>
            )
        return null
    }

    function renderCard({ item }: { item: HearthStoneCard }) {
        return (<Card data={item} />)
    }

    function renderListItem({ item }: any) {
        console.log('renderedListItem')
        if (item.data && item.data.length > 0) {
            return (
                <>
                    <View style={{ padding: 10, flexDirection: 'row' }}>
                        <Text style={styles.sectionHeader}>
                            {item.title}
                        </Text>
                        <View style={styles.sectionSeperator} />
                    </View>
                    <FlatList
                        keyExtractor={(item, index) => item.cardId + index}
                        horizontal
                        initialNumToRender={3}
                        maxToRenderPerBatch={5}
                        windowSize={10}
                        showsHorizontalScrollIndicator={false}
                        data={item.data}
                        renderItem={renderCard}
                    />
                </>
            )
        }
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
        color: '#000',
    },
    sectionSeperator: {
        flex: 1,
        alignSelf: 'center',
        marginLeft: 20,
        borderBottomColor: 'black',
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
});

export default Home
