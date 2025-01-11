# ComplyCube Web SDK Demonstration

This project demonstrates the integration of the ComplyCube Web SDK to showcase its capabilities for capturing user data, running checks, and listing results. It serves as a practical example of how the SDK can be utilized to streamline onboarding and compliance workflows.


## Features

1- User Data Submission:
Users can input their details (email, first name, and last name) through a form. These details are sent to the backend, which generates a token using the ComplyCube API.

2- Data Capture:
The ComplyCube Web SDK modal is used to capture user documents or biometrics. The token is used to initialize the modal, and data like documentId or livePhotoId is returned on completion.

3- Automated Checks:
After capturing the data, a few predefined checks are run, such as:

- Proof of Address Check: Validates address-related documents like utility bills or bank statements.
- Document Check: Verifies the authenticity of uploaded documents.
- Extensive Screening Check: Performs a detailed compliance screening.

These checks are triggered based on the captured data. However, ComplyCube supports many more check types. For a full list of available checks, please refer to the ComplyCube documentation.



4- Results Listing:
Users can see a list of all the checks run for a specific client, with details like the type of check, its status, and the outcome.



## Flow

1- Submit User Data:
The user provides their email, first name, and last name.
A clientId and a token are generated via the backend.

2- Submit User Data:
The token is used to initialize the ComplyCube modal.
The modal collects user-provided documents and biometric data.
On completion, the captured data (e.g., documentId, livePhotoId) is sent to the backend.

3- Run Checks:
- Based on the captured data, specific checks are run:
- For example:
   proof_of_address_check if the document type matches certain criteria.
   document_check for document validation.
   extensive_screening_check for in-depth screening.
- These checks are sent to the backend, which interacts with ComplyCube's API.

4- List Check Results:
- The results of the checks are fetched from the backend.
- The user can view details such as:
  Check type.
  Status (e.g., pending, complete).
  Outcome (e.g., clear, failed).


## How to Use

 ##### 1- Lunch
- Clone the repository and Install dependencies using: npm install

- Set up the required environment variables in a .env file : REACT_APP_API_ENDPOINT=http://localhost:5000
- Alternatively, you can use our hosted backend: REACT_APP_API_ENDPOINT=https://complycube-be-i-1.onrender.com

 
- Start the application:  npm start npm start


 ##### 2- Use the Application: 
 If you don't want to set up the backend locally, you can play around with the hosted frontend: https://complycube-i-1.vercel.app/

- Submit user details via the provided form.
- Launch the verification modal to capture data.
- View and track the results of the checks in the list.
- You can navigate thought those result and many more the ComplyCube sandbox dashboard

 ##### Note: The hosted backend runs on a free instance that may spin down due to inactivity. This can delay requests by up to 50 seconds or more when restarting. For faster responses, use a locally hosted backend.