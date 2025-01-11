import React from 'react'
import { createChecks } from '../services/create-checks'

const ComplyCubeIntegration = ({ token, clientId, setShowVerifyButton }) => {
  const startVerification = () => {
    if (token) {
      window.ComplyCube.mount({
        token: token,
        onComplete: async function (data) {
          console.log('Capture complete', data)
          try {
            const checks = [
              {
                documentId: data.documentId,
                type: 'proof_of_address_check',
              },
              {
                type: 'document_check',
                documentId: 'DOCUMENT_ID',
              },
              {
                livePhotoId: 'LIVE_PHOTO_ID',
                documentId: 'DOCUMENT_ID',
                type: 'identity_check',
              },
              { type: 'extensive_screening_check' },
            ]
            await createChecks(checks, clientId)
          } catch (e) {}
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
