import axios from "axios"

export const getCase1Config = (clientId) => ({
  stages: [
    {
      type: 'documentCapture',
      documentType: 'passport',
    },
    {
      type: 'faceCapture',
    },
  ],
  onComplete: async (data) => {
    console.log('onComplete capture ', data)
    const response = await axios.post(
        `${process.env.REACT_APP_API_ENDPOINT}/api/checks`,
        {
          documentId: data.documentCapture.documentId,
          livePhotoId: data.faceCapture.livePhotoId,
          clientId,
        }
      )
      return response.data
  },
})
