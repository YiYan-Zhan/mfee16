import React, { useState, useEffect } from 'react'
import '../../styles/game/style.scss'
import '../../styles/game/musicTest.scss'
import $ from 'jquery'
import { Link } from 'react-router-dom'
import Header from '../../components/Header'
import GameResult from '../../components/Game/GameResult'

function Game() {
  const [goResult, setGoResult] = useState(false)
  const [answer, setAnswer] = useState([0, 0, 0, 0, 0])
  const [questionNumber, setQuestionNumber] = useState(1)
  const [question, setQuestion] = useState('')
  const [result, setResult] = useState([])
  const [musicList, setMusicList] = useState([
    'r or l (mp3cut.net).mp3',
    'li (mp3cut.net).mp3',
    'rock (mp3cut.net).mp3',
    'jazz2 (mp3cut.net).mp3',
    'jazz (mp3cut.net).mp3',
  ])
  const [rock, setRock] = useState([
    '搖滾樂',
    'rock.png',
    '魔力紅 ,聯合公園',
    '搖滾樂，彷彿是觸電了一般，解放那個過動的自己，就是想不斷的ROCK&ROLL，找回熱血的青春',
  ])
  const [jazz, setJazz] = useState([
    '爵士樂',
    'jazz.png',
    '李榮浩 ,劉德華',
    '爵士樂，就像這種音樂本身的自由解放精神，還在不斷地探索更立體的思維空間，以及變化出更多姿多采的面貌。',
  ])
  const [lyrical, setLyrical] = useState([
    '抒情樂',
    'lyrical.png',
    '楊丞琳 ,蕭敬騰',
    '抒情樂，如同釋放自我心中最深切的情感，在音樂中一遍遍的回味，最後如淡出一般淡淡放下',
  ])
  const [music, setMusic] = useState('')
  const [style, setStyle] = useState('')
  const [answerA, setAnswerA] = useState({
    text: '',
    value: 0,
  })
  const [answerB, setAnswerB] = useState({
    text: '',
    value: 0,
  })
  const [answerC, setAnswerC] = useState({
    text: '',
    value: 0,
  })

  function saveAnswerA() {
    let newAnswer = [...answer]
    newAnswer[questionNumber - 1] = answerA.value
    setAnswer(newAnswer)
    // setAnswer
  }
  function saveAnswerB() {
    let newAnswer = [...answer]
    newAnswer[questionNumber - 1] = answerB.value
    setAnswer(newAnswer)
    // setAnswer
  }
  function saveAnswerC() {
    let newAnswer = [...answer]
    newAnswer[questionNumber - 1] = answerC.value
    setAnswer(newAnswer)
    // setAnswer
  }
  // 找答案數量
  function answerCount() {
    let a = 0
    let b = 0
    let c = 0
    answer.forEach((item) => {
      switch (item) {
        case 1:
          a++
          break
        case 2:
          b++
          break
        case 3:
          c++
          break
        default:
          break
      }
    })
    if (a >= 2) {
      setStyle('爵士')
    } else if (b >= 2) {
      setStyle('抒情')
    } else if (c >= 2) {
      setStyle('搖滾')
    }
  }
  function getQ() {
    switch (questionNumber) {
      case 1:
        setQuestion('你喜歡哪首歌1')
        break
      case 2:
        setQuestion('哪首歌令你感到開心2')
        break
      case 3:
        setQuestion('你喜歡哪首歌3')
        break
      case 4:
        setQuestion('哪首歌令你感到開心4')
        break
      case 5:
        setQuestion('哪首歌令你感到開心5')
        break
      default:
        break
    }
  }

  function getA() {
    const newAnsA = { ...answerA }
    switch (questionNumber) {
      case 1:
        newAnsA.text = '1-A'
        newAnsA.value = 1
        setAnswerA(newAnsA)
        break
      case 2:
        newAnsA.text = '2-A'
        newAnsA.value = 1
        setAnswerA(newAnsA)
        break
      case 3:
        newAnsA.text = '3-A'
        newAnsA.value = 1
        setAnswerA(newAnsA)
        break
      case 4:
        newAnsA.text = '4-A'
        newAnsA.value = 1
        setAnswerA(newAnsA)
        break
      case 5:
        newAnsA.text = '5-A'
        newAnsA.value = 1
        setAnswerA(newAnsA)
        break
      default:
        break
    }
  }
  function getB() {
    const newAnsB = { ...answerB }
    switch (questionNumber) {
      case 1:
        newAnsB.text = '1-B'
        newAnsB.value = 2
        setAnswerB(newAnsB)
        break
      case 2:
        newAnsB.text = '2-B'
        newAnsB.value = 2
        setAnswerB(newAnsB)
        break
      case 3:
        newAnsB.text = '3-B'
        newAnsB.value = 2
        setAnswerB(newAnsB)
        break
      case 4:
        newAnsB.text = '4-B'
        newAnsB.value = 2
        setAnswerB(newAnsB)
        break
      case 5:
        newAnsB.text = '5-B'
        newAnsB.value = 2
        setAnswerB(newAnsB)
        break
      default:
        break
    }
  }
  function getC() {
    const newAnsC = { ...answerC }
    switch (questionNumber) {
      case 1:
        newAnsC.text = '1-C'
        newAnsC.value = 3
        setAnswerC(newAnsC)
        break
      case 2:
        newAnsC.text = '2-C'
        newAnsC.value = 3
        setAnswerC(newAnsC)
        break
      case 3:
        newAnsC.text = '3-C'
        newAnsC.value = 3
        setAnswerC(newAnsC)
        break
      case 4:
        newAnsC.text = '4-C'
        newAnsC.value = 3
        setAnswerC(newAnsC)
        break
      case 5:
        newAnsC.text = '5-C'
        newAnsC.value = 3
        setAnswerC(newAnsC)
        break
      default:
        break
    }
  }
  useEffect(() => {
    switch (style) {
      case '搖滾':
        setResult(rock)
        break
      case '爵士':
        setResult(jazz)
        break
      case '抒情':
        setResult(lyrical)
        break
      default:
        break
    }
  }, [style])
  useEffect(() => {
    setMusic(musicList[questionNumber - 1])
  }, [questionNumber])

  useEffect(() => {
    $('.answer').on('click', function () {
      $(this).addClass('active')
      $(this).siblings().removeClass('active')
    })
    $('.orange.next').on('click', function () {
      $('.answer').removeClass('active')
    })
  }, [])
  function playMusic() {
    console.log('music played')
    let musicTarget = document.querySelector('audio')
    musicTarget.load()
    musicTarget.play()
  }
  useEffect(() => {
    getQ()
    getA()
    getB()
    getC()
    answerCount()
  }, [questionNumber])
  return goResult ? (
    <GameResult
      result={result}
      setGoResult={setGoResult}
      setQuestionNumber={setQuestionNumber}
    />
  ) : (
    <>
      <Header />
      <main classNameName="music-main">
        <div classNameName="wrapper">
          <div classNameName="title">
            <span classNameName="h2 elfin">Elfin</span>
            <span classNameName="h2 test-title">音樂測驗</span>
            <audio
              id="music-target"
              src={'http://localhost:3000/images/game/' + music}
              controls="controls"
            ></audio>
          </div>
          <h4 classNameName="sub-title h4">
            回答以下的問題，找出你最Match的音樂歌手，完成遊戲後還可以拿到折價券哦！
          </h4>
          <div classNameName="game-bg">
            <div classNameName="numbers">
              <div
                classNameName={
                  questionNumber <= 5
                    ? 'test-number-circle active'
                    : 'test-number-circle '
                }
              >
                <span classNameName="test-number h2">1</span>
              </div>
              <div classNameName="line"></div>
              <div
                classNameName={
                  questionNumber >= 2
                    ? 'test-number-circle active'
                    : 'test-number-circle '
                }
              >
                <span classNameName="test-number h2">2</span>
              </div>
              <div classNameName="line"></div>
              <div
                classNameName={
                  questionNumber >= 3
                    ? 'test-number-circle active'
                    : 'test-number-circle '
                }
              >
                <span classNameName="test-number h2">3</span>
              </div>
              <div classNameName="line"></div>
              <div
                classNameName={
                  questionNumber >= 4
                    ? 'test-number-circle active'
                    : 'test-number-circle '
                }
              >
                <span classNameName="test-number h2">4</span>
              </div>
              <div classNameName="line"></div>
              <div
                classNameName={
                  questionNumber >= 5
                    ? 'test-number-circle active'
                    : 'test-number-circle '
                }
              >
                <span classNameName="test-number h2">5</span>
              </div>
            </div>
            <div classNameName="question">
              <div classNameName="elfin-avatar"></div>
              <div classNameName="question-box">
                <div classNameName="triangle"></div>
                <div classNameName="box h4">{question}</div>
              </div>
            </div>
            <button
              classNameName="play-button"
              onClick={() => {
                playMusic()
              }}
            >
              <div classNameName="play"></div>
            </button>
            <div classNameName="answers">
              <div
                classNameName="answer h4"
                onClick={() => {
                  saveAnswerA()
                }}
              >
                {answerA.text}
              </div>
              <div
                classNameName="answer h4"
                onClick={() => {
                  saveAnswerB()
                }}
              >
                {answerB.text}
              </div>
              <div
                classNameName="answer h4"
                onClick={() => {
                  saveAnswerC()
                }}
              >
                {answerC.text}
              </div>
            </div>
            {questionNumber < 5 ? (
              <div
                classNameName="guide-button orange next h4"
                onClick={() => {
                  questionNumber < 5 && setQuestionNumber(questionNumber + 1)
                }}
              >
                {questionNumber < 5 ? '下一題' : '看結果'}
                <div classNameName="icon"></div>
              </div>
            ) : (
              <button
                classNameName="guide-button orange next h4"
                onClick={() => {
                  setGoResult(true)
                }}
              >
                前往結果
              </button>
            )}
          </div>
        </div>
      </main>
    </>
  )
}

export default Game
