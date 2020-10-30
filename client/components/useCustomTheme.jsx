import React, { useState, useEffect } from 'react';

import { useSelector } from 'react-redux';

import {useColorScheme as useDefaultTheme } from 'react-native'

function useColorScheme() {
    const reduxTheme = useSelector(state => state.theme)
    const defaultTheme = useDefaultTheme()
    const [theme, setTheme] = useState(defaultTheme);

    useEffect(()=>{
        if(reduxTheme.theme){
            setTheme(reduxTheme.theme)
        } else {
            setTheme(defaultTheme)
        }
    }, [reduxTheme]);

    return theme;
}

export default useColorScheme;