import axios from "axios"

export const standardConfig = (checks, clientId) => ({
  onComplete: async (data) => {
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
})
