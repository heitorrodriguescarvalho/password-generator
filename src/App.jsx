import React from 'react'

import LogoAndTitle from './components/LogoAndTitle'
import GeneratedPassword from './components/GeneratedPassword'
import PasswordConfiguration from './components/PasswordConfiguration'

const App = () => {
  return (
    <div className="App">
      <LogoAndTitle />
      <GeneratedPassword />
      <PasswordConfiguration />
    </div>
  )
}

export default App