import React, { useContext } from 'react'
import { PasswordSettingsContext } from '../providers/PasswordSettings'

const PasswordConfiguration = () => {
    const { passwordSettings, setPasswordSettings } = useContext(
        PasswordSettingsContext
    )

    const { uppercase, lowercase, numbers, specialCharacters, length } =
        passwordSettings

    const handleChange = (event) => {
        if (event.target.id === 'length') {
            setPasswordSettings((prev) => {
                return {
                    ...prev,
                    length: event.target.value,
                }
            })
        } else {
            setPasswordSettings((prev) => {
                return {
                    ...prev,
                    [event.target.id]: event.target.checked,
                }
            })
        }
    }

    let numberOfVariations = 0
    const selectedVariations = [
        uppercase,
        lowercase,
        numbers,
        specialCharacters,
    ]
    selectedVariations.map((e) => (e ? (numberOfVariations += 1) : 0))

    return (
        <div className="PasswordSettings">
            <div className="range-area">
                <label htmlFor="length">
                    Password Lenght: {passwordSettings.length}
                </label>
                <input
                    type="range"
                    id="length"
                    min={4}
                    max={32}
                    step={1}
                    value={length}
                    onChange={handleChange}
                />
            </div>

            <div className="checkbox-area">
                <label htmlFor="uppercase">Uppercase</label>
                <input
                    type="checkbox"
                    id="uppercase"
                    checked={uppercase}
                    onChange={handleChange}
                    disabled={
                        uppercase && numberOfVariations == 1
                    }
                />
            </div>
            <div className="checkbox-area">
                <label htmlFor="lowercase">Lowercase</label>
                <input
                    type="checkbox"
                    id="lowercase"
                    checked={lowercase}
                    onChange={handleChange}
                    disabled={
                        lowercase && numberOfVariations == 1
                    }
                />
            </div>
            <div className="checkbox-area">
                <label htmlFor="numbers">Numbers</label>
                <input
                    type="checkbox"
                    id="numbers"
                    checked={numbers}
                    onChange={handleChange}
                    disabled={
                        numbers && numberOfVariations == 1
                    }
                />
            </div>
            <div className="checkbox-area">
                <label htmlFor="specialCharacters">Special Characters</label>
                <input
                    type="checkbox"
                    id="specialCharacters"
                    checked={specialCharacters}
                    onChange={handleChange}
                    disabled={
                        specialCharacters &&
                        numberOfVariations == 1
                    }
                />
            </div>
        </div>
    )
}

export default PasswordConfiguration
