const express = require("express");
const app = express();
const port = 2000;
const pets = require("./petList");
const bodyParser = require("body-parser");

app.get("/", (req, res) => {
  res.send(
    `<h1>Adopt a Pet</h1>
    <p>Browse through the links below to find your new furry friend<p>
    <ul>
        <li><a href='/animals/dogs'>Dogs</a></li>
        <li><a href='/animals/cats'>Cats</a></li>
        <li><a href='/animals/rabbits'>Rabbits</a></li>
    </ul>`
  );
});

app.get("/animals/:pet_type", (req, res) => {
  const petType = req.params.pet_type;
  let myPets = pets[petType];

  res.send(`
        <h1>List of: ${petType}</h1>
        <ul>
        ${myPets
          .map(
            (pet) =>
              `<li><a href='/animals/${petType}/${myPets.indexOf(pet)}'>${
                pet.name
              }</a></li>`
          )
          .join("")}
        </ul>
    `);
});

app.get("/animals/:pet_type/:pet_id", (req, res) => {
  const petType = req.params.pet_type;
  const petId = parseInt(req.params.pet_id);
  let findPet = pets[petType][petId];
  res.send(`
          <h1>Name: ${findPet.name}</h1>
          <img src='${findPet.url}' alt="pet"/>
          <ul>
          <li>Age: ${findPet.age}</li>
          <li>Breed: ${findPet.breed}</li>
          <li>Description: ${findPet.description}</li>
          </ul>
      `);
});

app.get("/petstore", (req, res) => {
  res.json(pets);
});

app.get("/petstore/:type/:id", (req, res) => {
  const petType = req.params.type;
  const petId = parseInt(req.params.id);
  let myPets = pets[petType][petId];

  res.json(myPets);
});

app.delete("/petstore/:type/:id", (req, res) => {
  const petType = req.params.type;
  const petId = parseInt(req.params.id);

  const deletedPet = pets[petType].splice(petId, 1);

  res.status(201).json(deletedPet);
});

app.post("/petstore/", (req, res) => {
  const newPet = {};
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
