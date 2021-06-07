export type HearthStoneCard = {
    cardId: string,
    dbfId: string,
    name: string,
    cardSet: string,
    type: string,
    text?: string,
    img?: string,
    playerClass: string,
    locale: string,
    mechanics?: CardMechanic[],
    health?: number,
    attack?: number,
    cost?: number,
}

export type HearthStoneCardCollection = { [key: string]: HearthStoneCard[] }

export type CardMechanic = { name: string }

export enum CardSet {
    Basic = "Basic",
    Classic = "Classic",
    HallofFame = "Hall of Fame",
    Missions = "Missions",
    Demo = "Demo",
    System = "System",
    Debug = "Debug",
    Promo = "Promo",
    Naxxramas = "Naxxramas",
    GoblinsvsGnomes = "Goblins vs Gnomes",
    BlackrockMountain = "Blackrock Mountain",
    TheGrandTournament = "The Grand Tournament",
    Credits = "Credits",
    HeroSkins = "HeroSkins",
    TavernBrawl = "Tavern Brawl",
    TheLeagueofExplorers = "The League of Explorers",
    WhispersoftheOldGods = "Whispers of the Old Gods",
    OneNightinKarazhan = "One Night in Karazhan",
    MeanStreetsofGadgetzan = "Mean Streets of Gadgetzan",
    JourneytoUnGoro = "Journey to Un'Goro",
    KnightsoftheFrozenThrone = "Knights of the Frozen Throne",
    KoboldsnCatacombs = "Kobolds & Catacombs",
    TheWitchwood = "The Witchwood",
    TheBoomsdayProject = "The Boomsday Project",
    RastakhansRumble = "Rastakhan's Rumble",
    RiseofShadows = "Rise of Shadows",
    TavernsofTime = "Taverns of Time",
    SaviorsofUldum = "Saviors of Uldum",
    DescentofDragons = "Descent of Dragons",
    GalakrondsAwakening = "Galakrond's Awakening",
    AshesofOutland = "Ashes of Outland",
    WildEvent = "Wild Event",
    ScholomanceAcademy = "Scholomance Academy",
    Battlegrounds = "Battlegrounds",
    DemonHunterInitiate = "Demon Hunter Initiate",
    MadnessAtTheDarkmoonFaire = "Madness At The Darkmoon Faire",
    ForgedintheBarrens = "Forged in the Barrens",
    Legacy = "Legacy",
    Core = "Core",
    Vanilla = "Vanilla",
    WailingCaverns = "Wailing Caverns",
}