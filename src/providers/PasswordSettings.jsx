import { createContext, useState } from 'react'

export const PasswordSettingsContext = createContext({})

export const PasswordSettingsProvider = (props) => {
    const [passwordSettings, setPasswordSettings] = useState({
        length: 8,
        uppercase: true,
        lowercase: false,
        numbers: true,
        specialCharacters: false,
    })

    return (
        <PasswordSettingsContext.Provider
            value={{ passwordSettings, setPasswordSettings }}
        >
            {props.children}
        </PasswordSettingsContext.Provider>
    )
}
