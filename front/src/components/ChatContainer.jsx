import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Logout from "./Logout";
import ChatInput from "./ChatInput";
import { saveMessageRoute, getMessagesRoute } from "../utils/APIRouter";


function ChatContainer({ currentChat, user }) {
  const [chatMessages, setChatMessages] = useState([])
  const [isLoaded, setIsLoaded] = useState(false)

  const load = () => {
    if (currentChat && user) {
      setIsLoaded(true)
      return true
    }
    return false
  }

  useEffect(() => {
    async function fetchApi() {
      const response = await fetch(getMessagesRoute, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          from: user._id,
          to: currentChat._id,
        })
      })
      const data = await response.json()
      setChatMessages(data)
    }
    load() &&
      fetchApi()
  }, [currentChat])

  const handleSendMsg = async (msg) => {
    await fetch(saveMessageRoute, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: user._id,
        to: currentChat._id,
        message: msg
      })
    })

  }
  return <>
    {currentChat &&
      <Container>
        <div className="chat-header">
          <div className="user-details">
            <div className="avatar">
              <img src={currentChat.avatarImage.split('?')[0]} alt="avatar" />
            </div>
            <div className="username">
              <h3>{currentChat.username}</h3>
            </div>
          </div>
          <Logout />
        </div>
        <div className="chat-messages">
          {
            chatMessages.map((message) => {
              return (
                <div>
                  <div className={`message ${message.fromSelf} ? "sended":"recieved"`}>
                    <div className="content">
                      <p>
                        {message.message}
                      </p>
                    </div>
                  </div>
                </div>
              )
            })
          }
        </div>
        <ChatInput handleSendMsg={handleSendMsg} />
      </Container>
    }
  </>
}

const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 80% 10%;
  gap: 0.1rem;
  overflow: hidden;
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    grid-template-rows: 15% 70% 15%;
  }
  .chat-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 2rem;
    .user-details {
      display: flex;
      align-items: center;
      gap: 1rem;
      .avatar {
        img {
          height: 3rem;
        }
      }
      .username {
        h3 {
          color: white;
        }
      }
    }
  }
  .chat-messages {
    padding: 1rem 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    overflow: auto;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .message {
      display: flex;
      align-items: center;
      .content {
        max-width: 40%;
        overflow-wrap: break-word;
        padding: 1rem;
        font-size: 1.1rem;
        border-radius: 1rem;
        color: #d1d1d1;
        @media screen and (min-width: 720px) and (max-width: 1080px) {
          max-width: 70%;
        }
      }
    }
    .sended {
      justify-content: flex-end;
      .content {
        background-color: #4f04ff21;
      }
    }
    .recieved {
      justify-content: flex-start;
      .content {
        background-color: #9900ff20;
      }
    }
  }
`;
export default ChatContainer;