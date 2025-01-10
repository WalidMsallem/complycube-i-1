import React from 'react'

const ComplyCubeIntegration = ({ token, setShowVerifyButton }) => {
  const startVerification = () => {
    if (token) {
      window.ComplyCube.mount({
        token: token,
        onComplete: function (data) {
          console.log('Capture complete', data)
        },
        onModalClose: function () {
          setShowVerifyButton(false)
          window.ComplyCube.updateSettings({ isModalOpen: false })
        },
      })
    }
  }

  return (
    <>
      <div id="complycube-mount"></div>
      <button onClick={() => startVerification()}>Start verification</button>
    </>
  )
}

export default ComplyCubeIntegration
