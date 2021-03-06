import { HearthStoneCard, HearthStoneCardCollection } from "../../model";
import { CardState, SectionListItem } from "../reducers/CardReducer";
import { TYPES } from "../reducers/Types";

export const setCards = (allCards: HearthStoneCardCollection) => {
    const t1 = Date.now();
    const sectionList = generateSectionList(allCards);
    const cardMechanicList = generateCardMechanicList(allCards);
    const cardMechanics = Object.keys(cardMechanicList)
    const t2 = Date.now()

    console.log(`setCards // ${t2 - t1} ms.`);

    return {
        type: TYPES.SET_CARDS,
        payload: { allCards, sectionList, cardMechanicList, cardMechanics }
    }
}

export const filterByMechanic = (mechanic: string, currentState: CardState) => {
    let sectionList

    if (mechanic === "All")
        sectionList = generateSectionList(currentState.allCards);
    else {
        const selectedMechanic: HearthStoneCardCollection = {
            [mechanic]: currentState.cardMechanicList[mechanic]
        }

        sectionList = generateSectionList(selectedMechanic);
    }

    return {
        type: TYPES.SET_CARDS,
        payload: { sectionList }
    }
}

export const filterByName = (name: string, currentState: CardState) => {
    if (!name)
        return {}

    let filteredCollection: HearthStoneCardCollection = {}

    for (let key in currentState.allCards)
        filteredCollection[key] = currentState.allCards[key].filter((card: HearthStoneCard) =>
            card.name.toLocaleLowerCase()
                .startsWith((name.toLocaleLowerCase())))

    const sectionList = generateSectionList(filteredCollection)

    return {
        type: TYPES.SET_CARDS,
        payload: { sectionList }
    }
}

const generateSectionList = (collection: HearthStoneCardCollection) => {
    const sectionList: SectionListItem[] = []

    for (let key in collection) {
        if (collection[key].length === 0)
            continue;

        sectionList.push({
            title: key,
            data: collection[key],
        })
    }

    return sectionList
}

const generateCardMechanicList = (collection: HearthStoneCardCollection) => {
    const mechanicList: any = {}

    for (let cardSet in collection)
        for (let card of collection[cardSet])
            if (card.mechanics && card.mechanics.length > 0)
                card.mechanics.forEach(mec => {
                    if (mechanicList[mec.name])
                        mechanicList[mec.name] = [...mechanicList[mec.name], card]
                    else
                        mechanicList[mec.name] = [card]
                })

    return mechanicList;
}