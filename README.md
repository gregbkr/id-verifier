# ID verifier

## Overview
<<<<<<< HEAD
More info: you can find an overview of that setup on my [blog](https://greg.satoshi.tech/firebase-your-first-app-id-verifier/)

=======
More info: you can find an overview of that setup on my [blog](https://greg.satoshi.tech/firebase-you-first-app-id-verifier/)
>>>>>>> 7b0573f... Edit readme

### Scope
- Simple webpage to validate an ID document and store result in CRM (pipedrive). 
- KYC provider is fake for now.
- User need to provide a phone number, and an ID (passport).
- More info [here](https://docs.google.com/document/d/1GqGicnfc5I1_xcv9oC-Zd31QaSj0HACeJmFjWFtYSCA/edit#heading=h.vd89sio449qk).

### Tech
- Hosting: firebase cloud
- Front: react
- Backend: firebase functions
- Authentification : firebase auth (tel + sms code)
- Storage: firebase storage to store ID
- Database: pipedrive CRM to store user phone + kyc result
- Code + CICD: gitlab.com (github is just a mirror)


### Flow
User -> nodejs REACT @firebase -> login via tel SMS code firebase-auth -> Upload ID to firebase storage -> Use fake firebase function to check ID -> Store result in CRM pipedrive


## Setup
- Create a new project in firebase `id-prod`, location default (US)
- Activate auth (email + password)
- Activate storage

## Run

### Run project locally

I can not (yet) run firebase function + code locally. Instead run npm and always deploy latest function to firebase cloud.

- Run code env:  `npm start`
- Build: `npm run build`
- Deploy to firebase: `firebase deploy --debug`
- Deploy only functions to firebase: `firebase deploy --only functions`

### Use the APP

- Go to [app](https://id-prod.firebaseapp.com)
- For auth, can use your mobile, or the test US phone: `1234567890` + SMS code: `123456`
 
Because we don't have yet a KYC provider, result of KYC is fake and depends on file name of ID document. If file name start by:
- `0`: { id:0, status:true, message:'Id has been verified with success!' },
- `1`: { id:1, status:false, message:'Bad quality or blurry picture' },
- `2`: { id:2, status:false, message:'Document not valid, can not find mandatory information' },
- `3`: { id:3, status:false, message:'Listed as a fake id on our server' }
- Any other first letter will use case `3`

### Deploy via CI-CD
- Just push code in master and it will get deployed!
- Setup tuto [here](https://medium.com/@rambabusaravanan/firebase-hosting-deployment-automation-with-gitlab-ci-f3fad9130d62)

## Next steps
- Find real KYC sandbox?
- Store id document in pipedrive too?
