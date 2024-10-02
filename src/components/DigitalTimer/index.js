import {Component} from 'react'
import './index.css'

const initialState = {
  isTimerRunning: false,
  timeElapsedInSeconds: 0,
  timerLimitInMinutes: 25,
}

class DigitalTimer extends Component {
  state = initialState

  componentWillUnmount = () => {
    this.clearTimerInterval()
  }

  clearTimerInterval = () => {
    clearInterval(this.intervalId)
  }

  incrementTimeElapsedInSeconds = () => {
    const {timerLimitInMinutes, timeElapsedInSeconds} = this.state
    const isTimerCompleted = timerLimitInMinutes * 60 === timeElapsedInSeconds

    if (isTimerCompleted) {
      this.clearTimerInterval()
      this.setState({isTimerRunning: false})
    } else {
      this.setState(prevState => ({
        timeElapsedInSeconds: prevState.timeElapsedInSeconds + 1,
      }))
    }
  }

  onStartOrPauseTimer = () => {
    const {
      isTimerRunning,
      timeElapsedInSeconds,
      timerLimitInMinutes,
    } = this.state
    const isTimerCompleted = timeElapsedInSeconds === timerLimitInMinutes * 60

    if (isTimerCompleted) {
      this.setState({timeElapsedInSeconds: 0})
    }

    if (isTimerRunning) {
      this.clearTimerInterval()
    } else {
      this.intervalId = setInterval(this.incrementTimeElapsedInSeconds, 1000)
    }
    this.setState(prevState => ({isTimerRunning: !prevState.isTimerRunning}))
  }

  resetTimer = () => {
    this.clearTimerInterval()
    this.setState(initialState)
  }

  renderTimerController = () => {
    const {isTimerRunning} = this.state
    const startOrPauseImageUrl = isTimerRunning
      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'
    const startOrPauseAltText = isTimerRunning ? 'pause icon' : 'play icon'

    return (
      <div className="controls">
        <button type="button" onClick={this.onStartOrPauseTimer}>
          <img
            src={startOrPauseImageUrl}
            alt={startOrPauseAltText}
            className="icon"
          />
          <p>{isTimerRunning ? 'Pause' : 'Start'}</p>
        </button>

        <button type="button" onClick={this.resetTimer}>
          <img
            src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
            alt="reset icon"
            className="icon"
          />
          <p>Reset</p>
        </button>
      </div>
    )
  }

  decreaseTimerLimit = () => {
    const {timerLimitInMinutes} = this.state

    if (timerLimitInMinutes > 1) {
      this.setState(prevState => ({
        timerLimitInMinutes: prevState.timerLimitInMinutes - 1,
      }))
    }
  }

  increaseTimerLimit = () => {
    this.setState(prevState => ({
      timerLimitInMinutes: prevState.timerLimitInMinutes + 1,
    }))
  }

  renderTimerLimitController = () => {
    const {timeElapsedInSeconds, timerLimitInMinutes} = this.state
    //  We can only set time before it starts so completed seconds 0
    const isButtonDisabled = timeElapsedInSeconds > 0
    return (
      <div className="set-timer">
        <p>Set TImer Limit</p>
        <div className="timer-controls">
          <button
            type="button"
            disabled={isButtonDisabled}
            onClick={this.decreaseTimerLimit}
          >
            -
          </button>
          <span className="timer-limit">
            <p>{timerLimitInMinutes}</p>
          </span>
          <button
            type="button"
            disabled={isButtonDisabled}
            onClick={this.increaseTimerLimit}
          >
            +
          </button>
        </div>
      </div>
    )
  }

  getElapsedSecondsInTimeFormat = () => {
    const {timeElapsedInSeconds, timerLimitInMinutes} = this.state
    const totalRemainTime = timerLimitInMinutes * 60 - timeElapsedInSeconds

    const minutes = Math.floor(totalRemainTime / 60)
    const seconds = Math.floor(totalRemainTime % 60)

    const formattedMinutes = minutes > 9 ? minutes : `0${minutes}`
    const formattedSeconds = seconds > 9 ? seconds : `0${seconds}`

    return `${formattedMinutes}:${formattedSeconds} `
  }

  render() {
    const {isTimerRunning} = this.state
    const labelText = isTimerRunning ? 'Running' : 'Paused'
    return (
      <div className="container">
        <h1>Digital Timer</h1>
        <div className="content">
          <div className="left">
            <div className="timer">
              <h1 className="time">{this.getElapsedSecondsInTimeFormat()}</h1>
              <p className="timerStatus">{labelText}</p>
            </div>
          </div>
          <div className="right">
            {this.renderTimerController()}
            {this.renderTimerLimitController()}
          </div>
        </div>
      </div>
    )
  }
}
export default DigitalTimer
