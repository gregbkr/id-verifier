
var Pipedrive = require('pipedrive');
const axios = require('axios');

var i='toto'
alert('Id verification status: ' + i + '/nMessage: i')




// var pipedrive = new Pipedrive.Client('9307a46a3cfbe4b230a91e6e89c681b49fb7067b', { strictMode: true })

// async function PersonAdd() {

//     var profile = {
//         'phone': 'greg',
//         'name': 'greg',
//         'org_id': '727' // ID-demo
//     }

//     const createEntity = name => payload => new Promise((resolve, reject) => {
//         pipedrive[name].add(payload, (error, id) => error ? reject(error) : resolve(id));
//     });
//     const createPerson = createEntity('Persons');

//     const person = await createPerson(profile);
//     console.log('Person created in CRM => id:' + person.id + ', Name:' + person.name);
//     // console.log(person)
// }
// // PersonAdd()




// company_domain = 'lkdtech'
// person_id = '368'
// api_token = '9307a46a3cfbe4b230a91e6e89c681b49fb7067b'

// field_id = '9094'
// field_key = '63d6f93be047cf2dbb9d8fba94ca09ee89311353'
// field_value = 'False'

// data = { [field_key] : field_value }

// // UPDATE PERSON FIED DATA
// updateUrl = 'https://' + company_domain + '.pipedrive.com/v1/persons/'+ person_id + '?api_token=' + api_token

// axios.put(updateUrl, data)
//   .then(function (response) {
//     console.log(response);
//   })
//   .catch(function (error) {
//     console.log(error);
//   });



// GET PERSON FIELD KEY
// url = 'https://' + company_domain + '.pipedrive.com/v1/personFields/'+ field_id  + '?api_token=' + api_token
// console.log(url)

// async function get() {
//     const response = await axios.get(url)
//     // console.log(response)
// }
// get()





// pipedrive.Persons.get(person_id, function(err, person) {
// 	if (err) throw err;
//     console.log(person)

    // person.get('63d6f93be047cf2dbb9d8fba94ca09ee89311353', function(err, field) {
    //     console.log('1 --------------------------------')
    //     if (err) throw err;
    //     console.log('2 --------------------------------')
    //     console.log(field)
    // })

    // person.getPersonFields(function(productsErr, attachedProducts){
    //     if (productsErr) throw productsErr;
    //     console.log(attachedProducts)
    // })

    // person.set('63d6f93be047cf2dbb9d8fba94ca09ee89311353', 'toto')
    //     if (err) throw err;
    //     console.log('hello!')
    

        // person.updateProduct({ id: person.id, Email: 'greg@gmail,com'  }, function(updateErr, updateData) {
        //     if (updateErr) throw updateErr;
        //     console.log('Person was updated', updateData);
        // });    

// })


// https://lkdtech.pipedrive.com/v1/dealFields?start=0&api_token=9307a46a3cfbe4b230a91e6e89c681b49fb7067b


