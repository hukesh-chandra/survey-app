import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Login.css'

export default function Login({ users }) {
  const [username, setUsername] = useState('')
  const navigate = useNavigate()

  const handleLogin = (e) => {
    e.preventDefault()
    const user = users.find(u => u.username === username)

    if (user) {
      if (user.isAdmin) {
        navigate('/admin')
      } else {
        if (user.hasSubmitted) {
          const confirmResubmit = window.confirm(
            'You have already submitted the survey. Do you want to resubmit?'
          )
          if (confirmResubmit) {
            localStorage.setItem('currentUser', JSON.stringify(user))
            navigate('/survey')
          }
        } else {
          localStorage.setItem('currentUser', JSON.stringify(user))
          navigate('/survey')
        }
      }
    } else {
      alert('Invalid username')
    }
  }

  return (
    <div className="login-container">
      <h1>Login</h1>
      <form onSubmit={handleLogin} className="login-form">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="login-input"
        />
        <button type="submit" className="login-button">Login</button>
      </form>
    </div>
  )
}