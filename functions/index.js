const functions = require('firebase-functions');
var Pipedrive = require('pipedrive');

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