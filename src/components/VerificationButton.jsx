import React from 'react'
import { Button } from '@mui/material'

const ComplyCubeIntegration = ({
  token, 
  setShowVerifyButton,
  label,
  configs,
}) => {
  const startVerification = async () => {
    if (token) {
      const complyCubeInstance = await window.ComplyCube.mount({
        token: token,
        shouldCloseOnOverlayClick: true,
        onModalClose: function () {
          console.log('Modal manually closed')
          complyCubeInstance.updateSettings({ isModalOpen: false })
          setShowVerifyButton(false)
        },
        ...configs,
      })
    }
  }

  return (
    <>
      <div id="complycube-mount"></div>
      <Button
        onClick={() => startVerification()}
        variant="contained"
        color="primary"
        width="50%"
      >
        {label}
      </Button>
    </>
  )
}

export default ComplyCubeIntegration
