# ID verifier

## Overview

### Scope
Simple webpage to validate an ID document and store result in CRM (pipedrive). 
KYC provider is fake for now.
User need to provide a phone number, and an ID (passport)

### Tech
- Hosting: Firebase cloud
- Front: React
- Backend: Firebase functions
- Authentification : Firebase auth (tel + sms code)
- Storage: firebase storage to store ID
- Database: Pipedrive CRM to store user phone + kyc result

### Flow
User -> nodejs REACT @firebase -> login via tel SMS code firebase-auth 
  -> Upload ID to firebase storage -> Use fake firebase function to check ID -> Store result in CRM pipedrive


## Setup

### Setup firebase
- Create a new project in firebase `id`, location default (US)
- Activate auth (email + password)
- Activate storage

## Run project locally:

I can not (yet) run firebase function + code locally. Instead run npm and always deploy latest function to firebase cloud.

Run code env:  `npm start`
Build: `npm run build`
Deploy to firebase: `firebase deploy --debug`
Deploy only functions to firebase: `firebase deploy --only functions`

## Use the APP

Because we don't have yet a KYC provider, result of KYC is fake and depends on file ID document name.
If file name start by:
- "0": { id:0, status:true, message:'Id has been verified with success!' },
- "1": { id:1, status:false, message:'Bad quality or blurry picture' },
- "2": { id:2, status:false, message:'Document not valid, can not find mandatory information' },
- "3": { id:3, status:false, message:'Listed as a fake id on our server' }
- Other name will user case "3"

## Deploy via CI-CD
- Just push code in master and it will get deployed!
- Setup tuto [here](https://medium.com/@rambabusaravanan/firebase-hosting-deployment-automation-with-gitlab-ci-f3fad9130d62)


## Next steps
- CD_CI gitlab
- Better UI
- real KYC sandbox?
