import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import React, { useState } from 'react'
import AuthContext from './components/Auth/AuthContext'
// import Auth from './pages/Auth'
import Comment from './pages/Comment'
import Delivery from './pages/Delivery'
import Dish from './pages/Dish'
import Game from './pages/Game'
import GameResult from './components/Game/GameResult'
import Home from './pages/Home'
import Member from './pages/Member'
import Reservation from './pages/Reservation'
import Singer from './pages/Singer'

function App() {
  const [member, setMember] = useState(null)

  return (
    <AuthContext.Provider value={{ member, setMember }}>
      <Router>
        <Switch>
          {/* <Route path="/auth/">
          <Auth />
        </Route> */}
          <Route path="/comment/">
            <Comment />
          </Route>
          <Route path="/delivery/">
            <Delivery />
          </Route>
          <Route path="/singer/">
            <Singer />
          </Route>
          <Route path="/dish/">
            <Dish />
          </Route>
          <Route path="/game/result" component={GameResult}>
            {/* <GameResult /> */}
          </Route>
          <Route path="/game/" component={Game}>
            {/* <Game /> */}
          </Route>

          <Route path="/member/">
            <Member />
          </Route>
          <Route path="/reservation/">
            <Reservation />
          </Route>
          <Route exact path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    </AuthContext.Provider>
  )
}

export default App
