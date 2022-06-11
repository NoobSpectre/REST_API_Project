import { v4 as uuidv4 } from 'uuid';

let users = [
  {
    firstName: 'John',
    lastName: 'Doe',
    age: 26,
    id: uuidv4(),
  },
  {
    firstName: 'Susan',
    lastName: 'Monroe',
    age: 26,
    id: uuidv4(),
  },
];

export const getUsers = (req, res) => {
  console.log('users');
  res.send(users);
};

export const createUser = (req, res) => {
  const newUser = req.body;

  //checking if req.body has undefined properties
  if (
    newUser.firstName === undefined ||
    newUser.lastName === undefined ||
    newUser.age === undefined
  )
    return res.send("User with undefined properties can't be posted");

  //checking if req.body has unwanted properties
  const numProp = Object.keys(newUser).length;
  if (numProp >= 4) return res.send("User doesn't have given properties");

  // const userId = uuidv4();
  // const newuserWithId = {...newUser, id: userId};
  // users.push(newuserWithId);

  users.push({ ...newUser, id: uuidv4() });

  res.send(
    `User with the name ${newUser.firstName} ${newUser.lastName} is posted`
  );
};

export const getUniqueUser = (req, res) => {
  const { id } = req.params;

  const foundUser = users.find(user => {
    if (user.id) return user.id === id;
  });

  res.send(foundUser);
};

export const deleteUser = (req, res) => {
  const { id } = req.params;

  users = users.filter(user => {
    if (user.id) return user.id !== id;
  });

  res.send(`User with id: ${id} deleted`);
};

export const updateUser = (req, res) => {
  const { id } = req.params;
  const DataToUpdate = req.body;

  const userToUpdate = users.find(user => {
    if (user.id) return user.id === id;
  });

  //checking for undefined properties
  for (let key of Object.keys(DataToUpdate)) {
    if (!Object.keys(userToUpdate).includes(key))
      return res.send("User doesn't have given properties");
  }

  if (DataToUpdate.firstName) userToUpdate.firstName = DataToUpdate.firstName;
  if (DataToUpdate.lastName) userToUpdate.lastName = DataToUpdate.lastName;
  if (DataToUpdate.age) userToUpdate.age = DataToUpdate.age;

  res.send(`User with the id: ${id} has been updated...`);
};
