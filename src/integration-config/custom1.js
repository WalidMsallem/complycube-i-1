import axios from 'axios'

export const customConfig1 = (clientId) => ({
  stages: [
    {
      name: 'intro',
      options: {
        heading: 'We need to verify your identity',
        message: [
          'In order to open an account, we need to check a few things.',
          'This will take only a moment',
        ],
        startButtonText: 'Start Verification',
      },
    },
    'userConsentCapture',
    {
      name: 'documentCapture',
      options: {
        crossDeviceOnly: true,
        documentTypes: {
          passport: true,
          driving_license: false,
          national_identity_card: true,
          residence_permit: {
            country: 'GB',
          },
        },
      },
    },
    {
      name: 'faceCapture',
      options: {
        mode: 'video',
      },
    },
    {
      name: 'poaCapture',
      options: {
        documentTypes: {
          bank_statement: true,
          utility_bill: false,
        },
      },
    },
    {
      name: 'completion',
      options: {
        heading: 'Thank you for completing the process',
        message: ['we will get in touch shortly'],
      },
    },
  ],
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
