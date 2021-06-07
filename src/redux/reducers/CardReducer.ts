import { HearthStoneCard, HearthStoneCardCollection } from "../../model"
import { TYPES } from "./Types"

export type SectionListItem = { title: string, data: HearthStoneCard[] }

export type CardState = {
    allCards: HearthStoneCardCollection,
    sectionList: SectionListItem[] | [],
    cardMechanicList: { [key: string]: [] },
    cardMechanics: string[],
}


export const initialCardState: CardState = {
    allCards: {},
    sectionList: [],
    cardMechanicList: {},
    cardMechanics: [],
}

export const cardReducer = (state: CardState, action: any) => {
    switch (action.type) {
        case TYPES.SET_CARDS:
            return { ...state, ...action.payload }
        default:
            return state
    }
}