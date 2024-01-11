import React, { useEffect, useState } from "react";
import styled from "styled-components";

function Contacts({ contacts, currentUser, changeChat }) {
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);
  useEffect(() => {
    if (currentUser) {
      setCurrentUserImage(currentUser.avatarImage)
      setCurrentUserName(currentUser.username)
    }
  }, [currentUser])
  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index)
    changeChat(contact)

  }
  return (
    <>
      {
        currentUserImage && currentUserName && (
          <Container>
            <div className="brand">
              <h3>Chat App</h3>
            </div>
            <div className="contacts">
              {
                contacts.map((contact, index) => {
                  return (
                    <div className={`contact ${currentSelected === index ? "selected" : ""}`}
                      key={index}
                      onClick={() => changeCurrentChat(index, contact)}
                    >
                      <div className="avatar">
                        <img src={contact.avatarImage.split('?')[0]} alt="avatar" />
                      </div>
                      <div className="username">
                        <h3>{contact.username}</h3>
                      </div>
                    </div>
                  )
                })

              }
            </div>
            <div className="current-user">
              <div className="avatar">
                <img src={currentUserImage.split('?')[0]} alt="avatar" />
              </div>
              <div className="username">
                <h1>{currentUserName}</h1>
              </div>
            </div>
          </Container>
        )
      }
    </>
  )
}
const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 75% 15%;
  overflow: hidden;
  background-color: #212121;
  border-top-left-radius: 0.3rem;
  border-bottom-left-radius: 0.3rem;
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    border-top-left-radius: 0.3rem;
    img {
      height: 2rem;
    }
    h3 {
      color: white;
      text-transform: uppercase;
    }
  }
  .contacts {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    gap: 0.8rem;
    border-bottom-left-radius: 0.3rem;
    border-top-left-radius: 0.3rem;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .contact {
      background-color: #B2DFDB;
      min-height: 5rem;
      cursor: pointer;
      width: 90%;
      border-radius: 0.2rem;
      padding: 0.4rem;
      display: flex;
      gap: 1rem;
      align-items: center;
      transition: 0.5s ease-in-out;
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
    .selected {
      background-color: #009688;
    }
  }

  .current-user {
    background-color: #00BCD4;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    border-bottom-left-radius: 0.3rem;
    .avatar {
      img {
        height: 4rem;
        max-inline-size: 100%;
      }
    }
    .username {
      h2 {
        color: white;
      }
    }
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      gap: 0.5rem;
      .username {
        h2 {
          font-size: 1rem;
        }
      }
    }
  }
`;
export default Contacts;