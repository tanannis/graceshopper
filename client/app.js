import React from 'react'
import {Elements} from '@stripe/react-stripe-js'
import {loadStripe} from '@stripe/stripe-js'

import {NavbarComponent} from './components'
import Routes from './routes'

const stripePromise = loadStripe('pk_test_JJ1eMdKN0Hp4UFJ6kWXWO4ix00jtXzq5XG')

const App = () => {
  return (
    <div>
      <Elements stripe={stripePromise}>
        <NavbarComponent />
        <Routes />
      </Elements>
    </div>
  )
}

export default App
