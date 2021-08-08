import React, { useState, useEffect } from 'react'
import '../../styles/game/musicTestResult.scss'
import '../../styles/game/style.scss'
import axios from 'axios'
import $ from 'jquery'
import Auth from '../../components/Auth'
import Header from '../../components/Header/'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { Link } from 'react-router-dom'

function GameResult(props) {
  const result = props.result
  const setGoResult = props.setGoResult
  const [authToken, setAuthToken] = useState('')
  const [memberId, setMemberId] = useState(0)
  const [login, setLogin] = useState(false)
  const [showAuthModal, setShowAuthModal] = useState(false)
  const setQuestionNumber = props.setQuestionNumber
  function getCoupon() {
    if (Boolean(localStorage.getItem('authToken'))) {
      axios
        .post('http://localhost:3001/game/getCoupon', {
          memberId: memberId,
        })
        .then(function (response) {
          console.log(response)
          const CheckDataSwal = withReactContent(Swal)
          CheckDataSwal.fire({
            title: '您的訂位已送出',
            icon: 'success',
          })
        })
    } else {
      setShowAuthModal(true)
    }
  }

  useEffect(() => {
    // let token = localStorage.getItem('authToken')
    // setAuthToken(token)

    // $.ajax({
    //   url: 'http://localhost:3001/auth/me',
    //   method: 'GET',
    //   dataType: 'JSON',
    //   headers: {
    //     Accept: 'application/json',
    //     'Content-Type': 'application/json; charset=utf-8',
    //     Authorization: `Bearer ${token}`,
    //   },
    // }).then(function (result) {
    //   setMemberId(result.memberId)
    // })
    let authToken = window.localStorage.getItem('authToken')
    // console.log('auth', authToken)
    axios
      .get('http://localhost:3001/auth/me', {
        method: 'get',
        headers: {
          authorization: `Bearer ${authToken}`,
        },
      })
      .then((result) => {
        setMemberId(result.data.memberId)
      })
  }, [])

  return (
    <>
      <Header />
      <main class="music-main">
        <div class="wrapper">
          <div class="title">
            <span class="h2 elfin"></span>
            <span class="h2 test-title"></span>
          </div>
          <h4 class="sub-title h4"></h4>
          <div class="game-bg">
            <div class="question">
              <div class="elfin-avatar"></div>
              <div class="question-box">
                <div class="triangle"></div>
                <div class="box h4">你的音樂類型是…</div>
              </div>
            </div>
            <div class="result-card">
              <h2 class="main-title">{result[0]}</h2>
              <figure class="style-pic">
                <img
                  src={'http://localhost:3000/images/game/' + result[1]}
                  alt=""
                />
              </figure>
              <h4 class="recommend">推薦歌手</h4>
              <h3 class="singer-name">{result[2]}</h3>
              <p class="style-text">{result[3]}</p>
            </div>
            <div class="button-group">
              <div
                class="again-button"
                onClick={() => {
                  setQuestionNumber(1)
                  setGoResult(false)
                }}
              >
                <img
                  src="http://localhost:3000/images/game/redo-solid.svg"
                  alt=""
                />
              </div>
              <div
                class="guide-button orange h4 get-coupon"
                onClick={function () {
                  getCoupon()
                  const CheckDataSwal = withReactContent(Swal)
                  if (Boolean(localStorage.getItem('authToken'))) {
                    CheckDataSwal.fire({
                      title: '恭喜獲得折價券',
                      icon: 'success',
                      buttonsStyling: false,
                    })
                  }
                }}
              >
                領折價券
              </div>
              <Link to={{ pathname: '/' }}>
                <div class="guide-button orange next h4">
                  去投票
                  <div class="icon"></div>
                </div>
              </Link>
            </div>
          </div>
        </div>
        {showAuthModal && (
          <Auth
            showAuthModal={showAuthModal}
            setShowAuthModal={setShowAuthModal}
          />
        )}
      </main>
    </>
  )
}

export default GameResult
