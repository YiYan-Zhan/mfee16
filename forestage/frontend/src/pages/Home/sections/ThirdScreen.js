import React, { useState, useEffect, useRef } from 'react'
import $ from 'jquery'
import CommentCard from '../../../components/Home/CommentCard'
import MobileSinger from '../../../components/Home/MobileSinger'
import { CSSTransition } from 'react-transition-group'
import gsap from 'gsap'

function ThirdScreen(props) {
  // 歌手資訊轉場
  const [transitionState, setTransitionState] = useState(false)
  // CDA,CDU
  useEffect(() => {
    setTimeout(setTransitionState(false), 500)
  }, [transitionState])
  let { Img, Introduction, Name } = props
  // 取得評論區資訊之狀態設定
  const [comment, setComment] = useState([])
  const [targetId, setTargetId] = useState(10)

  // 取得歌手詳情之狀態設定
  const [singerId, setSingerId] = useState(5)
  const [singerName, setSingerName] = useState()
  const [singerInfo, setSingerInfo] = useState()
  const [singerImg, setSingerImg] = useState()
  const [mobileInfo, setMobileInfo] = useState([])
  useState(() => {
    $.ajax({
      url: 'http://localhost:3001/home/singer_all',
      method: 'GET',
      dataType: 'JSON',
    }).then(function (result) {
      setMobileInfo(result)
    })
  }, [])
  useEffect(() => {
    //获取拖拽实验对象
    let el = document.getElementById('drag-target')
    //在该对象上绑定鼠标点击事件
    el.onmousedown = (e) => {
      //鼠标按下，计算鼠标触点距离元素左侧和顶部的距离
      let disX = e.clientX - el.offsetLeft
      let disY = e.clientY - el.offsetTop
      document.onmousemove = function (e) {
        //计算需要移动的距离
        let tX = e.clientX - disX
        let tY = e.clientY - disY
        //移动当前元素
        if (tX >= 0 && tX <= window.innerWidth - el.offsetWidth) {
          el.style.left = tX + 'px'
        }
        if (tY >= 0 && tY <= window.innerHeight - el.offsetHeight) {
          el.style.top = tY + 'px'
        }
      }
      //鼠标松开时，注销鼠标事件，停止元素拖拽。
      document.onmouseup = function (e) {
        document.onmousemove = null
        document.onmouseup = null
      }
    }
    $('.selectBlock').on('click', function () {
      // console.log(this)
      $(this).addClass('active')
      $(this)
        .closest('li')
        .siblings()
        .find('.selectBlock')
        .removeClass('active')
    })
  }, [])

  // 取得歌手詳情
  useEffect(() => {
    $.ajax({
      url: `http://localhost:3001/home/singer/${singerId}`,
      method: 'GET',
      dataType: 'json',
    }).then(function (result) {
      // for動畫的settimeout
      setTimeout(() => {
        setSingerName(result.name)
        setSingerInfo(result.introduction)
        setSingerImg(result.picture)
        gsap.to('.singerInfo', { x: 0, opacity: 1 })
      }, 300)
    })
  }, [singerId])

  // 取得評論區顯示所需資料，componentDidUpdate
  useEffect(() => {
    $.ajax({
      url: `http://localhost:3001/home/comment/${targetId}`,
      method: 'GET',
      dataType: 'json',
    }).then(function (result) {
      setComment(result)
    })
  }, [targetId])
<<<<<<< HEAD
  let fullPath = 'http://localhost:3000/images/home/歌手/' + singerImg
=======
  let fullPath = 'http://localhost:3000/images/common/' + singerImg

>>>>>>> home
  //主要頁面
  let ThirdScreen = (
    <div id="thirdScreen">
      <div className="green-bg-right">
        <img
          src="http://localhost:3000/images/home/green-background-right.svg"
          alt=""
        />
      </div>
      <div className="liveIcon" id="drag-target">
        <img
          src="http://localhost:3000/images/home/liveIcon.svg"
          alt=""
          className="liveIconImg"
        />
        <div className="iconAside">
          <h3 className="h3">直播中</h3>
          <img
            src="http://localhost:3000/images/home/iconPlay.png"
            alt=""
            className="iconPlay"
          />
        </div>
      </div>
      <h2 className="h2">駐唱歌手</h2>

      <div className="singerInfo">
        <CSSTransition
          in={transitionState}
          timeout={400}
          classNames="transition"
        >
          <figure className="singerPageFigure">
            <img src={fullPath} alt="" />
          </figure>
        </CSSTransition>
        <div className="singerPageInfo">
          <CSSTransition
            in={transitionState}
            timeout={400}
            classNames="transition"
          >
            <div className="info">
              <h3>{singerName}</h3>
              <p>{singerInfo}</p>
            </div>
          </CSSTransition>
          <button className="button-orange">
            <h4 className="btn-innerText">看更多</h4>
            <i className="fas fa-arrow-circle-right"></i>
          </button>
          <div className="singerSelect">
            <ul>
              <li>
                <div
                  className="selectBlock active" //楊丞琳
                  onClick={() => {
                    setTransitionState(!transitionState)
                    setTargetId(10)
                    setSingerId(5)
                  }}
                ></div>
              </li>
              <li>
                <div
                  className="selectBlock" //李榮浩
                  onClick={() => {
                    setTransitionState(!transitionState)
                    setTargetId(11)
                    setSingerId(3)
                  }}
                ></div>
              </li>
              <li>
                <div
                  className="selectBlock" //劉德華
                  onClick={() => {
                    setTransitionState(!transitionState)
                    setTargetId(12)
                    setSingerId(4)
                  }}
                ></div>
              </li>
              <li>
                <div
                  className="selectBlock" //聯合公園
                  onClick={() => {
                    setTransitionState(!transitionState)
                    setTargetId(13)
                    setSingerId(6)
                  }}
                ></div>
              </li>
              <li>
                <div
                  className="selectBlock" //蕭敬騰
                  onClick={() => {
                    setTransitionState(!transitionState)
                    setTargetId(14)
                    setSingerId(2)
                  }}
                ></div>
              </li>
              <li>
                <div
                  className="selectBlock" //Maroon 5
                  onClick={() => {
                    setTransitionState(!transitionState)
                    setTargetId(15)
                    setSingerId(1)
                  }}
                ></div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      {/* 手機板歌手 */}
      <div class="mobile-singer-out">
        <div className="mobile-singer-border">
          {mobileInfo.length > 0 &&
            mobileInfo.map(function (value, index) {
              return (
                <MobileSinger
                  key={value.singer_id}
                  name={value.name}
                  introduction={value.introduction}
                  img={value.picture}
                />
              )
            })}
        </div>
      </div>
      <button className="button-orange mobile-btn">
        <h4 className="btn-innerText">撰寫評論</h4>
        <i className="fas fa-arrow-circle-right"></i>
      </button>
      <div className="audienceComment">
        <h2 className="h2">客戶好評</h2>
        <div className="commentSide">
          <ul className="card-ul">
            {comment.map(function (v, i) {
              return (
                <CommentCard
                  key={i}
                  name={v.name}
                  singer={v.singer}
                  title={v.title}
                  nickname={v.nickname}
                  img={v.img}
                  likes={v.likes}
                />
              )
            })}
          </ul>
        </div>
        <button className="button-orange seeMore">
          <h4 className="btn-innerText">撰寫評論</h4>
          <i className="fas fa-arrow-circle-right"></i>
        </button>
      </div>
    </div>
  )
  return <>{ThirdScreen}</>
}

export default ThirdScreen
