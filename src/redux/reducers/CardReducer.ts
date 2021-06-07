import { HearthStoneCard, HearthStoneCardCollection } from "../../model"
import { TYPES } from "./Types"

export type CardState = {
    allCards: HearthStoneCardCollection,
    sectionList: [{ title: string, data: HearthStoneCard[] }] | [],
    cardMechanicList: { [key: string]: [] }
}

export const initialCardState: CardState = {
    allCards: {},
    sectionList: [],
    cardMechanicList: {},
}

export const cardReducer = (state: CardState, action: any) => {
    switch (action.type) {
        case TYPES.SET_CARDS:
            return { ...state, ...action.payload }
        default:
            return state
    }
}