import React, { useEffect, useState } from 'react'
import Card from './Card'
import $ from 'jquery'
import { logDOM } from '@testing-library/react'
import axios from 'axios'

function SingerInfo(props) {
  let { singerInfo, style, tag } = props
  let defaulDomain = 'http://localhost:3000/images/common/'
  const [loading, setLoading] = useState(false)
  const [cardInfo, setCardInfo] = useState([])
  const [likeArray, setLikeArray] = useState([])

  const getCardInfo = async () => {
    const newCardInfo = []
    for (let i = 0; i < tag.length; i++) {
      const response = await axios.get(
        `http://localhost:3001/singer/comment/${tag[i]}`,
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json; charset=utf-8',
          },
        }
      )

      newCardInfo.push(response.data)
    }

    return newCardInfo
  }

  const getLike = async () => {
    const newLikeArray = []
    for (let i = 0; i < tag.length; i++) {
      const response = await axios.get(
        `http://localhost:3001/singer/likes/${tag[i]}`,
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json; charset=utf-8',
          },
        }
      )

      newLikeArray.push(response.data[0])
    }

    return newLikeArray
  }

  useEffect(() => {
    setLoading(true)
  }, [])
  useEffect(() => {
    if (loading === true) {
      const getData = async () => {
        const newCardInfo = await getCardInfo()
        const newLikeArray = await getLike()

        setCardInfo(newCardInfo)
        setLikeArray(newLikeArray)
      }
      getData()
    }
  }, [style, tag, loading])

  return (
    <>
      <div class="singer-title h2">
        {singerInfo.length > 0 && singerInfo[0].type}歌手
      </div>
      <div class="introduction-all">
        <div class="band">
          <img
            class="singerimg"
            src={singerInfo.length > 0 && defaulDomain + singerInfo[0].picture}
            alt=""
          />
        </div>
        <div class="introduction-text1">
          <div class="introduction">
            <div class="introduction-title">
              <div class="h3">
                {singerInfo.length > 0 && singerInfo[0].name}
              </div>
            </div>
            <div class="assess h4">
              <div className="star">
                <div className="empty_star">★★★★★</div>
                <div
                  className="full_star"
                  style={{
                    width: likeArray.length > 0 && `${likeArray[0].stars}%`,
                  }}
                >
                  ★★★★★
                </div>
              </div>
              <h4> ({likeArray.length > 0 && likeArray[0].reviewer})</h4>
            </div>
          </div>
          <div class="link-top"></div>
          <div class="introduction-content">
            {singerInfo.length > 0 && singerInfo[0].introduction}
          </div>
        </div>
      </div>
      <div class="comment">
        <div class="comment-bar">
          <div class="left-btn">
            <img class="btn-l" src="/Header/images/btn-left.svg" alt="" />
          </div>
          <ul class="comment-content">
            {cardInfo.length > 0 &&
              cardInfo[0].map(function (value, index) {
                return (
                  <Card
                    key={index}
                    name={value.name}
                    singer={value.singer}
                    img={value.img}
                    title={value.title}
                  />
                )
              })}
          </ul>
          <div class="right-btn">
            <img class="btn-r" src="/Header/images/btn-right.svg" alt="" />
          </div>
        </div>
      </div>
      <div class="introduction-all">
        <div class="band">
          <img
            class="singerimg"
            src={singerInfo.length > 0 && defaulDomain + singerInfo[1].picture}
            alt=""
          />
        </div>
        <div class="introduction-text1">
          <div class="introduction">
            <div class="introduction-title">
              <div class="h3">
                {singerInfo.length > 0 && singerInfo[1].name}
              </div>
            </div>
            <div class="assess h4">
              <div className="star">
                <div className="empty_star">★★★★★</div>
                <div
                  className="full_star"
                  style={{
                    width: likeArray.length > 0 && `${likeArray[1].stars}%`,
                  }}
                >
                  ★★★★★
                </div>
              </div>
              {console.log('likeArray1', likeArray[1])}
              <h4> ({likeArray.length > 0 && likeArray[1].reviewer})</h4>
            </div>
          </div>
          <div class="link-top"></div>
          <div class="introduction-content">
            {singerInfo.length > 0 && singerInfo[1].introduction}
          </div>
        </div>
      </div>
      <div class="comment">
        <div class="comment-bar">
          <div class="left-btn">
            <img class="btn-l" src="/Header/images/btn-left.svg" alt="" />
          </div>
          <ul class="comment-content">
            {cardInfo.length > 0 &&
              cardInfo[1].map(function (value, index) {
                return (
                  <Card
                    key={index}
                    name={value.name}
                    singer={value.singer}
                    img={value.img}
                    title={value.title}
                  />
                )
              })}
          </ul>
          <div class="right-btn">
            <img class="btn-r" src="/Header/images/btn-right.svg" alt="" />
          </div>
        </div>
      </div>
    </>
  )
}
export default SingerInfo
