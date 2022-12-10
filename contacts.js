const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "db/contacts.json");

const writeContacts = async (data) =>
  await fs.writeFile(contactsPath, JSON.stringify(data, null, 2));

const contactsList = async () => {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
};

async function getContactById(contactId) {
  const data = await contactsList();
  const contact = data.filter((elem) => elem.id === contactId.toString());

  return contact || null;
}

async function removeContact(contactId) {
  const data = await contactsList();
  const index = data.findIndex((elem) => elem.id === contactId.toString());
  if (index === -1) {
    return null;
  }
  const [result] = data.splice(index, 1);
  await writeContacts(data);
  return result;
}

async function addContact({ name, email, phone }) {
  const data = await contactsList();
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };
  data.push(newContact);
  await writeContacts(data);
  return newContact;
}
module.exports = {
  contactsList,
  getContactById,
  removeContact,
  addContact,
};
