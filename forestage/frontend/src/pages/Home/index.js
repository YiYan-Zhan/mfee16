
import React, { useEffect, useState } from 'react'
import '../../styles/home/home.scss'
import $ from 'jquery'
// Screens
import FirstScreen from './sections/FirstScreen'
import SecondScreen from './sections/SecondScreen'
import ThirdScreen from './sections/ThirdScreen'
import FourthScreen from './sections/FourthScreen'
import FivethScreen from './sections/FivthScreen'
import SixthScreen from './sections/SixthScreen'
import SeventhScreen from './sections/SeventhScreen'
import EightScreen from './sections/EightScreen'
//
import moment from 'moment'

// header
import Header from '../../components/Header'


function Home() {
  // 當天歌手資訊
  const [singerName, setSingerName] = useState()
  const [singerImg, setSingerImg] = useState()
  const [singerIntroduction, setSingetIntroduction] = useState()

  // 登入狀態
  const [loginState, setLoginState] = useState(false)
  const [all, setAll] = useState({})
  const [cart, setCart] = useState([])
  const [item, setItem] = useState([])
  let current = moment().format('MM/DD')
  const [loading, setLoading] = useState(false)
  // ComponentDidmount
  useEffect(() => {
    // 取得當天表演者資訊
    $.ajax({
      url: 'http://localhost:3001/home/singer_today',
      method: 'GET',
      dataType: 'json',
    }).then(function (result) {
      setSingerName(result.name)
      setSingerImg(result.picture)
      setSingetIntroduction(result.introduction)
    })
    $('.home').on('click', function () {
      $('.cart-big').addClass('disabled')
      $('.cart-small').addClass('disabled')
      $('.header-cart').removeClass('active')
    })
  }, [])

  return (
    <>
      <Header item={item} setItem={setItem} />
      <div className="home">
        <FirstScreen
          singerName={singerName}
          singerImg={singerImg}
          singerDate={current}
        />
        <SecondScreen singerName={singerName} />
        <ThirdScreen
          singerName={singerName}
          singerImg={singerImg}
          singerIntroduction={singerIntroduction}
        />
        <FourthScreen />
        <FivethScreen />
        <SixthScreen />
        <SeventhScreen />
        <EightScreen all={all} setAll={setAll} item={item} setItem={setItem} />
      </div>
    </>
  )
}

export default Home
