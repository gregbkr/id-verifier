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

