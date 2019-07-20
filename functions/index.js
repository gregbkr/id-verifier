const functions = require('firebase-functions');
var Pipedrive = require('pipedrive');
const axios = require('axios');

const admin = require('firebase-admin')
admin.initializeApp(functions.config().firebase)

exports.crmPersonKyc = functions.https.onCall(async (data, context) => {
  console.log('1-------------------')
  console.log(data.personId)
  // console.log(data.phone)
  console.log('2-------------------')

  companyDomain = 'lkdtech'
  // personId = '368'
  personId = data.personId
  apiToken = '9307a46a3cfbe4b230a91e6e89c681b49fb7067b'
  
  fieldId = '9094' // => (DEMO) KYC verified?
  fieldKey = '63d6f93be047cf2dbb9d8fba94ca09ee89311353'
  fieldValue = data.kycStatusWanted
  
  // Update person data field knowing personId
  data = { [fieldKey] : fieldValue }
  updateUrl = 'https://' + companyDomain + '.pipedrive.com/v1/persons/'+ personId + '?api_token=' + apiToken
  
  axios.put(updateUrl, data)
    .then(function (response) {
      console.log(response);
      return true
    })
    .catch(function (error) {
      console.log(error);
      return error
    });
  

})

exports.crmPersonAdd = functions.https.onCall(async (data, context) => {
    var profile = {
        'phone': data.phone,
        'name': data.phone,
        'org_id': '727' // ID-demo
    }
    
    var pipedrive = new Pipedrive.Client('9307a46a3cfbe4b230a91e6e89c681b49fb7067b', { strictMode: true })

    const createEntity = name => payload => new Promise((resolve, reject) => {
        pipedrive[name].add(payload, (error, id) => error ? reject(error) : resolve(id));
    });
    const createPerson = createEntity('Persons');
    
    const person = await createPerson(profile);
    console.log('Person created in CRM => id:' + person.id + ', Name:' + person.name);
    // console.log(person)
    return person;
})

exports.idVerification = functions.https.onCall(async (data, context) => {
  var kycResponses = [
    { id:0, status:'success', message:'Id has been verified with success!' },
    { id:1, status:'failed', message:'Bad quality or blurry picture' },
    { id:2, status:'failed', message:'Document not valid, can not find mandatory information' },
    { id:3, status:'failed', message:'Listed as a fake id on our server' }
  ]
  console.log('1 ----------------')
  console.log(data.phone)
  console.log(data.fileName)
  console.log('2 ----------------')
  

  // No free KYC validator for now, so we just check the first letter of the filename
  // "0.GregPassport.jpeg" will pass verification
  // "0-1-2-3.GregPassport.jpeg" will fail verification

  var id = data.fileName.charAt(0)
  // If first chars is not 1,2,3,4 we default answer to 2
  if ( !(id >= 0 && id <= 3) ) {
    id = 2
  }
  console.log('Stating ID verification for person: ' + data.phone + '| file name: ' + data.fileName + '| id:' + id);
  console.log('Result of ID verification - Status: ' + kycResponses[id].status + '| message:' + kycResponses[id].message);

  return kycResponses[id];
})