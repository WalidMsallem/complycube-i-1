// try different document type options, try set the branding
export const customConfig3 = () => ({
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
          birth_certificate: true,
          polling_card: true,
          visa: true,
          tax_document: true,
          unknown: true,
          other: true,
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
    },
    {
      name: 'completion',
      options: {
        heading: 'Thank you for completing the process',
        message: ['we will get in touch shortly'],
      },
    },
  ],
  branding: {
    appearance: {
      primaryButtonColor: '#FF0000',
      headingTextColor: 'green',
    },
    logo: {
      lightLogoUrl:
        'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png',
      darkLogoUrl:
        'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png',
    },
  },
  onComplete: async (data) => {
    console.log('onComplete capture ', data)
  },
})
