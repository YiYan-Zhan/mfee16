import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import Header from '../Header/'
import Hero from './ReservationCheckoutMain/Hero'
import Main from './ReservationCheckoutMain/'
import '../../styles/reservation/res_checkout/res_check.scss'
import axios from 'axios'
import { get } from 'jquery'

// import Footer from '../../components/Footer'

function CheckoutPage(props) {
  const history = useHistory()
  // const { checkList, setCheckList, test } = props
  const [dishList, setDishList] = useState([])
  const [checkList, setCheckList] = useState({})
  const [didMount, setDidMount] = useState(false)
  const [insertResData, setInsertResData] = useState({
    date: '',
    seat_id: 0,
    attendance: 0,
    name: '',
    mobile: '',
    total: 0,
    note: '',
    member_id: 1,
    mcm_id: 0,
    status: '未完成',
  })


  const checkInsertResData = Boolean(sessionStorage.getItem('insertResData'))

  useEffect(() => {
    setDidMount(true)

    // 如果沒有從訂位頁面得到props.location，則導回訂位頁面
    if (props.location.state !== undefined) {
      setDishList(props.location.state.dishList)
      setCheckList(props.location.state.checkList)
    } else {
      history.push('/reservation')
    }

    checkInsertResData &&
      setInsertResData(
        JSON.parse(window.sessionStorage.getItem('insertResData'))
      )
    // console.log(props.location.state.pathname)
  }, [])

  useEffect(() => {
    // 將訂位頁資料帶入insert物件中，使用didMount避免帶入空的coupon id與備註
    if (didMount) {
      let newInsertResData = { ...insertResData }
      newInsertResData.date = checkList.chosenDate
      newInsertResData.seat_id = checkList.seatId
      newInsertResData.attendance = checkList.attendance
      newInsertResData.total = checkList.total
      setInsertResData(newInsertResData)
    }
  }, [checkList])

  // 將insertResData存入sessionStorage
  useEffect(() => {
    window.sessionStorage.setItem(
      'insertResData',
      JSON.stringify(insertResData)
    )
  }, [insertResData])

  return (
    <>
      <Header />
      <Hero />
      <Main
        dishList={dishList}
        checkList={checkList}
        insertResData={insertResData}
        setInsertResData={setInsertResData}
      />
      {/* <Footer /> */}
    </>
  )
}

export default CheckoutPage