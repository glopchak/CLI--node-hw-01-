const fs = require('fs').promises;
const path = require('path');
const shortid = require('shortid');

const contactsPath = path.resolve("./db/contacts.json");

async function parsedContacts(){
    return JSON.parse(await fs.readFile(contactsPath, 'utf8'));
}

async  function listContacts() {
    const contacts = await parsedContacts();
    console.table(contacts);
    return contacts;

  };
  
async  function getContactById(contactId) {
    const contacts = await parsedContacts();
    const contactById = contacts.find(({ id }) => id === contactId);
    if (!contactById) {
        return console.error(`Contact with ID ${contactId} not found!`);
      };

      console.table(contactById)
      return contacts[contactById];

  };
  
async  function removeContact(contactId) {
    const contacts = await parsedContacts();
    const filteredData = contacts.filter(({ id }) => id !== contactId);
    const stringifyData = JSON.stringify(filteredData);
  
    fs.writeFile(contactsPath, stringifyData, "utf8");
    console.table(filteredData)
    return filteredData;
  };
  
async  function addContact(name, email, phone) {
    const contacts = await parsedContacts();

    contacts.push({ id: shortid.generate(), name, email, phone });
    
    fs.writeFile(contactsPath, JSON.stringify(contacts));

    console.table(contacts);
    return contacts;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};