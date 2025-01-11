// ask user for Consent before starting, limit documents types, show custom landing message
export const customConfig1 = () => ({
  stages: [
    {
      name: 'intro custom config',
      options: {
        heading: 'We need to verify your identity',
        message: [
          'In order to open an account, we need to check a few things.',
        ],
        startButtonText: 'Start custom Verification',
      },
    },
    'userConsentCapture',
    {
      name: 'documentCapture',
      options: {
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
    console.log('onComplete capture ', data)
  },
})
