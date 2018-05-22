const URL = 'https://petdibs.herokuapp.com/pets';

const reportStatus = (message) => {
  $('#status-message').html(message);
}

const loadPets = () => {
  const petList = $('#pet-list');
  petList.empty();

  reportStatus('Loading Pets! Please Wait...');

  // promise: then & catch
  axios.get(URL)
    .then((response) => {
      console.log('inside the .then');
      response.data.forEach((pet) => {
        petList.append(`<li>${pet.name}</li>`);
      });
      reportStatus('Pets Loaded!')
    })
    .catch((error) => {
      console.log(error);
      reportStatus(`Error: ${error.message}`);
    })

    console.log('This is after .get');
}

const createPet = (event) => {
  // Note that createPet is a handler for a `submit`
  // event, which means we need to call `preventDefault`
  // to avoid a page reload
  event.preventDefault();
  console.log('We submitted a form!');

  let petData = {};
  petData['name'] = $('input[name="name"]').val();
  petData['age'] = $('input[name="age"]').val();
  petData['owner'] = $('input[name="owner"]').val();

  console.log(petData);

  reportStatus('Sending pet data...');

  axios.post(URL, petData)
    .then((response) => {
      console.log(response);
      reportStatus(`Successfully added a pet with the name ${response.data.name} and ID ${response.data.id}`);
    })
    .catch((error) => {
      console.log(error.response);
      reportStatus(`Encountered an error: ${error.message}`);
    });

  // TODO: implement clearForm();
};

$(document).ready(() => {
  $('#load').click(loadPets);
  // $('#load').on('click', loadPets);

  $('#pet-form').submit(createPet);
  // $('#pet-form').on('submit', createPet);
})
