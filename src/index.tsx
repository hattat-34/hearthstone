import React from "react";
import Home from "./screens/Home";
import { StatusBar } from 'react-native';

const Hearthstone = () => {
    StatusBar.setBarStyle('light-content', true);
    return (<Home />) 
}

export default Hearthstone