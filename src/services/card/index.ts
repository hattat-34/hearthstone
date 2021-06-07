import { getJSON } from "../Request"

export const getAllCards = async () => {
    return await getJSON("cards")
}