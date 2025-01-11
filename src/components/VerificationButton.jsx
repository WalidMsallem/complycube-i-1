import React from 'react'
import axios from 'axios'

const ComplyCubeIntegration = ({ token, clientId, setShowVerifyButton }) => {
  const startVerification = async () => {
    if (token) {
    const complyCubeInstance = await  window.ComplyCube.mount({
        token: token,
        shouldCloseOnOverlayClick: true,
        onComplete: async function (data) {
          console.log('Capture complete', data)
          try {
            const checks = [
              ...([
                'driving_license',
                'tax_document',
                'bank_statement',
                'utility_bill',
              ].includes(data.documentCapture.documentType)
                ? [
                    {
                      documentId: data.documentCapture.documentId,
                      type: 'proof_of_address_check',
                    },
                  ]
                : []),
              {
                type: 'document_check',
                documentId: data.documentCapture.documentId,
              },
              { type: 'extensive_screening_check' },
            ]

            const response = await axios.post(
              `${process.env.REACT_APP_API_ENDPOINT}/api/checks`,
              {
                checks,
                clientId,
              }
            )
            return response.data
          } catch (e) {
            console.error(e || 'Something went wrong')
          }
        },
        onModalClose: function () {
          console.log("Modal manually closed");
          complyCubeInstance.updateSettings({ isModalOpen: false });
          setShowVerifyButton(false);
        },
        onExit: function () {
          console.log("Exit triggered");
          complyCubeInstance.updateSettings({ isModalOpen: false });
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
