import React, { useState, useEffect } from 'react'
import './Content.scss'
import { AiFillDelete } from 'react-icons/ai'
import Message from '../Message/Message.js'
import Loader from '../Loader/Loader.js'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { USER_UPDATE_PROFILE_RESET } from '../../constants/userConstants'
import { getUserDetails, updateUserProfile } from '../../actions/userActions.js'

const Content = () => {
  const [name, setName] = useState('')
  const [bio, setBio] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()

  const userDetails = useSelector((state) => state.userDetails)
  const { loading, error, user } = userDetails

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile)
  const { success } = userUpdateProfile

  const history = useNavigate()

  useEffect(() => {
    if (!userInfo) {
      history('/login')
    } else {
      if (!user || !user.name || success) {
        dispatch({ type: USER_UPDATE_PROFILE_RESET })
        dispatch(getUserDetails())
      } else {
        setName(user.name)
        setBio(user.bio)
      }
    }
  }, [dispatch, history, userInfo, user, success])

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(updateUserProfile({ id: user._id, name, bio, password }))
  }

  return (
    <div className='profile__content'>
      <div className='profile__header'>
        <div className='profile__header--image'></div>
        <div className='profile__header--change'>
          <div className='profile__header--changeContainer noselect'>
            <h1>Change Profile Header</h1>
            <button>
              <AiFillDelete />
            </button>
          </div>
          <p>Only Jpg or PNG and maximum 5 MB</p>
        </div>
      </div>
      {error && <Message error={error}></Message>}
      {loading && <Loader />}
      {success && <Message error={'Profile Updated'}></Message>}

      <form onSubmit={handleSubmit} className='profile__form'>
        <h1>Public Profile</h1>
        <div className='profile__form--row'>
          <div className='profile__form--col'>
            <h2>User Name</h2>
            <input
              spellCheck='false'
              value={name}
              onChange={(e) => {
                setName(e.target.value)
              }}
            />
          </div>
          <div className='profile__form--col'>
            <h2>Password</h2>
            <input
              type='password'
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
              }}
              spellCheck='false'
            />
          </div>
        </div>
        <div className='profile__form--rowAll'>
          <h2>Bio</h2>
          <textarea
            value={bio}
            onChange={(e) => {
              setBio(e.target.value)
            }}
            spellCheck='false'
          />
        </div>
        <div className='profile__button'>
          <button type='submit' className='noselect'>
            Save Changes
          </button>
        </div>
      </form>
    </div>
  )
}

export default Content
