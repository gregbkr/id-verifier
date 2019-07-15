const functions = require('firebase-functions');
var Pipedrive = require('pipedrive');
const axios = require('axios');

const admin = require('firebase-admin')
admin.initializeApp(functions.config().firebase)

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

exports.crmPersonKyc = functions.https.onCall(async (data, context) => {
    
    company_domain = 'lkdtech'
    person_id = '368'
    api_token = '9307a46a3cfbe4b230a91e6e89c681b49fb7067b'
    
    field_id = '9094' // => (DEMO) KYC verified?
    field_key = '63d6f93be047cf2dbb9d8fba94ca09ee89311353'
    field_value = 'True'
    
    // UPDATE PERSON FIED DATA
    data = { [field_key] : field_value }
    updateUrl = 'https://' + company_domain + '.pipedrive.com/v1/persons/'+ person_id + '?api_token=' + api_token
    
    axios.put(updateUrl, data)
      .then(function (response) {
        console.log(response);
        return true
      })
      .catch(function (error) {
        console.log(error);
      });
    

})