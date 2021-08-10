import React, { useState, useEffect } from 'react'
import axios from 'axios'
import moment from 'moment'

function ChatDialogBox(props) {
  const {
    isShowDialogBox,
    ws,
    memberId,
    memberAvatar,
    setMemberAvatar,
    memberEmail,
    employees,
  } = props
  const [connected, setConnected] = useState(false)
  const [contentValue, setContentValue] = useState('')
  const [adminInputValue, setAdminInputValue] = useState('')
  const [dialogBoxChildren, setDialogBoxChildren] = useState([])

  // 滾動到最下面
  const scrollToBottom = () => {
    let dialogBox = document.querySelector('.dialog-box')
    dialogBox.scrollTo(dialogBox.scrollHeight, dialogBox.scrollHeight)
  }

  // 傳送訊息到 Server
  const sendMessage = (eventName) => {
    //以 emit 送訊息，並以 getMessage或getMessageAll或getMessageLess 為名稱送給 server 捕捉
    ws.emit(eventName, contentValue)
  }

  // 產生使用者的 DOM
  const customerRowDom = () => {
    return (
      <div className="customer-row" key={dialogBoxChildren.length}>
        <div className="message-box">
          <div className="content-box">
            <span className="content">{contentValue}</span>
          </div>
          <span className="time">{moment().format('HH:mm:ss')}</span>
        </div>
        <div className="avatar-box">
          {/* <img
            className="avatar"
            // src={process.env.PUBLIC_URL + '/images/member/default-user.png'}
            src={memberAvatar}
            alt=""
          ></img> */}
        </div>
      </div>
    )
  }

  // 產生管理者的 DOM
  const adminRowDom = () => {
    return (
      <div className="admin-row" key={dialogBoxChildren.length}>
        <div className="avatar-box">
          <img
            className="avatar"
            src={
              process.env.PUBLIC_URL + '/images/member/customer_service_btn.png'
            }
            alt=""
          ></img>
        </div>
        <div className="message-box">
          <div className="content-box">
            <span className="content">{adminInputValue}</span>
          </div>
          <span className="time">{moment().format('HH:mm:ss')}</span>
        </div>
      </div>
    )
  }

  // 取得會員大頭貼
  const fetchMemberAvatar = async () => {
    const response = await axios.get(
      `http://localhost:3001/member/profile/${memberId}`,
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json; charset=utf-8',
        },
      }
    )
    const data = response.data
    const resMemberAvatar = data.data[0].avatar
    return resMemberAvatar
  }

  // 設定監聽 Server 的事件及訊息
  const initWebSocket = () => {
    //對 getMessage 設定監聽，如果 server 有透過 getMessage 傳送訊息，將會在此被捕捉
    ws.on('getMessage', (message) => {
      console.log(message)
    })

    /*回傳給所有連結著的 client*/
    ws.on('getMessageAll', (message) => {
      console.log(message)
    })

    /*回傳給除了發送者外所有連結著的 client*/
    ws.on('getMessageLess', (message) => {
      console.log(message)
      setAdminInputValue(message)
    })
  }

  useEffect(() => {
    if (
      memberAvatar === null &&
      memberEmail !== null &&
      employees.includes(memberEmail) === false
    ) {
      // 取得會員大頭貼
      const fetchData = async () => {
        const newMemberAvatar = await fetchMemberAvatar()
        setMemberAvatar('http://localhost:3001/' + newMemberAvatar)
      }
      fetchData()
    }
    if (ws && connected === false) {
      //連線成功
      console.log('WebSocket 連線成功')
      // 初始化事件
      initWebSocket()
      // 設為已經連線狀態
      setConnected(true)
    }
    if (connected && adminInputValue !== null) {
      // 將新產生的 DOM 新增到狀態
      const newDialogBoxChildren = [...dialogBoxChildren, adminRowDom()]
      setDialogBoxChildren(newDialogBoxChildren)
      // 設定回空
      setAdminInputValue(null)
      // 滾動到最下面
      scrollToBottom()
    }
  }, [memberEmail, ws, adminInputValue])

  return (
    <>
      {isShowDialogBox && (
        <div className="chat-dialog-box-container">
          <div className="dialog-box">
            <div className="admin-row ">
              <div className="avatar-box">
                <img
                  className="avatar"
                  src={
                    process.env.PUBLIC_URL +
                    '/images/member/customer_service_btn.png'
                  }
                  alt=""
                ></img>
              </div>
              <div className="message-box">
                <div className="content-box">
                  <span className="content">您好，請問有什麼需要服務的嗎?</span>
                </div>
                <span className="time">{moment().format('HH:mm:ss')}</span>
              </div>
            </div>
            {/* <div className="customer-row">
              <div className="message-box">
                <div className="content-box">
                  <span className="content">請問餐廳的營業時間是甚麼時候?</span>
                </div>
                <span className="time">12:11:30</span>
              </div>
              <div className="avatar-box">
                <img
                  className="avatar"
                  src={
                    process.env.PUBLIC_URL + '/images/member/default-user.png'
                  }
                  alt=""
                ></img>
              </div>
            </div> */}

            {dialogBoxChildren}
          </div>

          <div className="reply-box">
            <div class="content-box">
              <input
                className="content"
                type="text"
                placeholder="寫點什麼..."
                value={contentValue}
                onChange={(e) => {
                  setContentValue(e.target.value)
                }}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    document.querySelector('.submit').click()
                  }
                }}
              />
            </div>
            <button
              className="submit orange-guide-button"
              onClick={() => {
                const newDialogBoxChildren = [
                  ...dialogBoxChildren,
                  customerRowDom(),
                ]
                setDialogBoxChildren(newDialogBoxChildren)

                // 傳送訊息給 Server
                sendMessage('getMessageLess')

                // 清空 input 欄位
                setContentValue('')

                // 滾動到最下面
                scrollToBottom()
              }}
            >
              <i class="fas fa-paper-plane"></i>
            </button>
          </div>
        </div>
      )}
    </>
  )
}

export default ChatDialogBox