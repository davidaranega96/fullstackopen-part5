import PropTypes from 'prop-types'

const Notification = ({ notification }) => {
  const { message, tone } = notification
  const tone_style = `notification ${tone}`
  if (message === '') {
    return null
  }

  return (
    <div className={tone_style}>
      {message}
    </div>
  )
}

Notification.propTypes = {
  notification: PropTypes.object.isRequired
}

export default Notification