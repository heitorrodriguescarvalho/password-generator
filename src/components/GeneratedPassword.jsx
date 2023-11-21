import React, { useContext, useEffect, useState } from 'react'
import { PasswordSettingsContext } from '../providers/PasswordSettings'
import { CopyToClipboard } from 'react-copy-to-clipboard'

const GeneratedPassword = () => {
    const { passwordSettings } = useContext(PasswordSettingsContext)
    const [password, setPassword] = useState('')
    const [passwordCharacteristics, setpasswordCharacteristics] = useState({
        length: password.length,
        strenght: 'Easy',
    })
    const [copy, setCopy] = useState(false)

    const { uppercase, lowercase, numbers, specialCharacters, length } =
        passwordSettings

    const listOfUppercaseLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    const listOfLowercaseLetters = 'abcdefghijklmnopqrstuvwxyz'
    const listOfNumbersDigits = '1234567890'
    const listOfSpecialCharacters = '!@#$%^&*()'

    useEffect(() => {
        handleClick()
    }, [])

    useEffect(() => {
        passwordAnalyzer()
    }, [password])

    const handleChange = (event) => {
        setPassword(() => event.target.value)
    }

    const handleCopy = () => {
        setCopy(true)
        setTimeout(() => {
            setCopy(false)
        }, 1000)
    }

    const handleClick = () => {
        let numberOfUppercaseLetters = 0
        let numberOfLowercaseLetters = 0
        let numberOfNumbers = 0
        let numberOfSpecialCharacters = 0

        do {
            let charactersRemaining = length
            let numberOfVariations = 0
            const selectedVariations = [
                uppercase,
                lowercase,
                numbers,
                specialCharacters,
            ]
            selectedVariations.map((e) => (e ? (numberOfVariations += 1) : 0))

            const calculateNumberOfVariation = (variation) => {
                if (!variation) {
                    return 0
                } else {
                    if (numberOfVariations == 1) {
                        return charactersRemaining
                    } else {
                        numberOfVariations -= 1

                        const numberOfVariation = parseInt(
                            Math.random() * (charactersRemaining - 1) + 1
                        )

                        charactersRemaining -= numberOfVariation
                        return numberOfVariation
                    }
                }
            }

            numberOfUppercaseLetters = calculateNumberOfVariation(uppercase)
            numberOfLowercaseLetters = calculateNumberOfVariation(lowercase)
            numberOfNumbers = calculateNumberOfVariation(numbers)
            numberOfSpecialCharacters =
                calculateNumberOfVariation(specialCharacters)
        } while (
            (uppercase && numberOfUppercaseLetters < 1) ||
            (lowercase && numberOfLowercaseLetters < 1) ||
            (numbers && numberOfNumbers < 1) ||
            (specialCharacters && numberOfSpecialCharacters < 1)
        )

        const sortCharacters = (amount, list) => {
            const characters = []
            for (let i = 0; i < amount; i++) {
                characters.push(
                    list.split('')[
                        parseInt(Math.random() * (list.length - 1) + 1)
                    ]
                )
            }

            return characters
        }

        let uppercaseLettersOfPassword = sortCharacters(
            numberOfUppercaseLetters,
            listOfUppercaseLetters
        )
        let lowercaseLettersOfPassword = sortCharacters(
            numberOfLowercaseLetters,
            listOfLowercaseLetters
        )
        let numbersOfPassword = sortCharacters(
            numberOfNumbers,
            listOfNumbersDigits
        )
        let specialCharactersOfPassword = sortCharacters(
            numberOfSpecialCharacters,
            listOfSpecialCharacters
        )

        const passwordCharacters = [
            ...uppercaseLettersOfPassword,
            ...lowercaseLettersOfPassword,
            ...numbersOfPassword,
            ...specialCharactersOfPassword,
        ]

        let passwordCharactersRemaining = [...passwordCharacters]
        let newestPassword = ''
        while (passwordCharactersRemaining.length > 0) {
            const characterIndex = parseInt(
                Math.random() * (passwordCharactersRemaining.length - 1)
            )
            newestPassword += passwordCharactersRemaining[characterIndex]
            passwordCharactersRemaining.splice(characterIndex, 1)
        }

        setPassword(newestPassword)
    }

    const passwordAnalyzer = () => {
        let containsUppercase = false
        let containsLowercase = false
        let containsNumbers = false
        let containsSpecialCharacters = false

        password.split('').map((e) => {
            listOfUppercaseLetters.includes(e) ? (containsUppercase = true) : 0
            listOfLowercaseLetters.includes(e) ? (containsLowercase = true) : 0
            listOfNumbersDigits.includes(e) ? (containsNumbers = true) : 0
            listOfSpecialCharacters.includes(e)
                ? (containsSpecialCharacters = true)
                : 0
        })

        const passwordAnalysis = [
            containsUppercase,
            containsLowercase,
            containsNumbers,
            containsSpecialCharacters,
        ]
        let passwordStrengthNumber = 0
        passwordAnalysis.map((e) => (e ? (passwordStrengthNumber += 1) : 0))

        setpasswordCharacteristics((prev) => {
            const passwordStrength =
                passwordStrengthNumber < 3
                    ? 'Easy'
                    : passwordStrengthNumber === 3
                    ? 'Medium'
                    : 'Hard'
            return {
                length: password.length,
                strenght: passwordStrength,
            }
        })
    }

    const characteristicsText =
        passwordCharacteristics.length < 8
            ? 'Too short'
            : passwordCharacteristics.strenght

    const characteristicsColor =
        passwordCharacteristics.length < 8 ||
        passwordCharacteristics.strenght === 'Easy'
            ? 'red'
            : passwordCharacteristics.strenght === 'Medium'
            ? 'blue'
            : 'green'

    return (
        <div className="GeneratedPassword">
            <div className="input-area">
                <input type="text" value={password} onChange={handleChange} />
                <button onClick={handleClick}>
                    <img
                        src="./src/assets/reset.svg"
                        alt="Reset Password"
                    />
                </button>
            </div>
            <CopyToClipboard text={password} onCopy={handleCopy}>
                <button className="copy-password">
                    <img
                        src="./src/assets/copy.svg"
                        alt="Copy Password"
                    />
                    <p>{copy ? 'Copied' : 'Copy'}</p>
                </button>
            </CopyToClipboard>
            <p style={{ color: characteristicsColor }}>{characteristicsText}</p>
        </div>
    )
}

export default GeneratedPassword
