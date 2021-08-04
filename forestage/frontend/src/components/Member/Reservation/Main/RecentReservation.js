import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import RecentReservationDetailModal from './RecentReservationDetailModal'
import { useMediaQuery } from 'react-responsive'

function RecentReservation(props) {
  const { memberId, setContentIsLoaded } = props
  const isDesktopOrMobile = useMediaQuery({ query: '(max-width: 768px)' })
  const [didMount, setDidMount] = useState(true)
  const [orders, setOrders] = useState([])
  const [reservationId, setReservationId] = useState('')

  // bootstrap modal 開啟關閉用
  const [show, setShow] = useState(false)
  const [bootstrapCdnLoad, setBootstrapCdnLoad] = useState(false)
  const handleClose = () => {
    setBootstrapCdnLoad(false)
    setShow(false)
  }
  const handleShow = () => {
    setBootstrapCdnLoad(true)
    setTimeout(() => {
      setShow(true)
    }, 10)
  }

  // 取得訂位資料
  const fetchRecentReservation = async () => {
    const response = await axios.get(
      `http://localhost:3001/member/reservation/recent/${memberId}`,
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json; charset=utf-8',
        },
      }
    )

    return response.data.data
  }

  useEffect(() => {
    setDidMount(false)
  }, [])

  useEffect(() => {
    if (didMount === false) {
      // 取得後端資料
      const fetchData = async () => {
        // 取得會員的訂位資料
        const recentReservation = await fetchRecentReservation()
        // console.log('didUpdate recent reservstion:', recentReservation)

        setOrders(recentReservation)
        setContentIsLoaded(true)
      }

      fetchData()
    }
  }, [memberId, didMount])

  // 電腦版按鈕列
  const btnRowDom = (
    <>
      <div className="content-foot">
        <div className="btns-container">
          <button className="cancel-resv-btn guide-button">取消訂位</button>
          <button className="update-resv-btn orange-guide-button">
            修改訂位內容
          </button>
        </div>
      </div>
    </>
  )

  // 手機版按鈕列
  const btnRowMdDom = (
    <>
      <div className="content-foot-md">
        <div className="msgbox-container">
          <p>共6件餐點</p>
          <p>合計金額: 2000元</p>
        </div>
        <div className="btns-container">
          <button className="cancel-resv-btn guide-button">取消訂位</button>
          <button className="update-resv-btn orange-guide-button">
            修改訂位內容
          </button>
        </div>
      </div>
    </>
  )

  // 沒有資料時的 DOM
  const noDataDom = (
    <>
      <div className="no-data-container">
        <h1>您近期沒有任何訂位</h1>
        <Link to="/reservation" className="no-data-link orange-guide-button">
          訂位
        </Link>
      </div>
    </>
  )

  // Bootstrap Cdn
  const bootstrapCdn = (
    <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css"
      integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC"
      crossorigin="anonymous"
    />
  )

  return (
    <>
      {/* bootstrap CDN */}
      {bootstrapCdnLoad && bootstrapCdn}

      <RecentReservationDetailModal
        show={show}
        handleClose={handleClose}
        memberId={memberId}
        reservationId={reservationId}
      />

      {orders.length > 0
        ? [
            orders.map((v, i) => {
              return (
                <>
                  <div className="recent-content" key={i}>
                    <div className="content-container">
                      <div className="content-head">
                        <h4 className="content-head-title">
                          訂位編號 #{v.reservation_id}
                        </h4>
                        <div className="detail-container">
                          <i
                            className="fas fa-eye"
                            onClick={() => {
                              setReservationId(v.reservation_id)
                              handleShow()
                            }}
                          ></i>
                        </div>
                      </div>
                      <div className="content-body">
                        <table className="content-table">
                          <thead>
                            <tr>
                              <th>訂位日期</th>
                              <th>表演歌手</th>
                              <th>座位區</th>
                              <th>人數</th>
                              <th>總金額</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>{v.date}</td>
                              <td>{v.singer_name}</td>
                              <td>{v.seat_name}</td>
                              <td>{v.attendance}</td>
                              <td>{v.total}</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>

                      {/* 手機版按鈕列 ←→ 電腦版按鈕列 */}
                      {isDesktopOrMobile ? btnRowMdDom : btnRowDom}
                    </div>
                  </div>
                </>
              )
            }),
          ]
        : /* 沒有資料 */
          noDataDom}
    </>
  )
}

export default RecentReservation
