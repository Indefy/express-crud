import express from 'express';
import { readFile, writeFile } from 'fs/promises';
import { v4 as uuidv4 } from 'uuid';
import logger from './logger.mjs'; 

const router = express.Router();

const usersFilePath = './data/users.json';

// const users = JSON.parse(data);
//reading data
router.get('/', async (req, res) => {
  try {
    const data = await readFile(usersFilePath, 'utf8');
    const users = JSON.parse(data);
    res.json(users);
  } catch (err) {
    logger.error(`Error reading users file: ${err.message}`);
    res.status(500).json({ error: 'Error reading users file' });
  }
})
// GET a single user by ID
router.get('/:id', async (req, res) => {
  const userId = req.params.id;
  try {
    const data = await readFile(usersFilePath, 'utf8');
    const users = JSON.parse(data);
    const user = users.find(user => user.id === userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    logger.error(`Error reading users file: ${err.message}`);
    res.status(500).json({ error: 'Error reading users file' });
  }
});

router.post('/', async (req, res, next) => {
  const { first_name, last_name, email, phone } = req.body;
  if ( !first_name || !last_name || !email || !phone ) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const data = await readFile(usersFilePath, 'utf8');
    const users = JSON.parse(data);
    const newUserId = uuidv4();
    const newUser = {
      id: newUserId,
      ...req.body
    };

    users.push(newUser);
    //+=+=+=++=+=+=++=+=+=++=+=+=++=+=+=++=+=+=++=+=+=+  console for DEBUG +=+=+=++=+=+=++=+=+=++=+=+=++=+=+=++=+=+=++=+=+=+//
    console.log(newUserId)
    //+=+=+=++=+=+=++=+=+=++=+=+=++=+=+=++=+=+=++=+=+=+  console for DEBUG +=+=+=++=+=+=++=+=+=++=+=+=++=+=+=++=+=+=++=+=+=+//
    
    await writeFile(usersFilePath, JSON.stringify(users));
    res.status(201).json(newUser);
  } catch (err) {
    logger.error(`Error writing to users file: ${err.message}`);
    next(err);
  }
});

// Implement other CRUD, DELETE

async function getUser(req, res, next) {
  try {
    user = await users.findById(req.params.id)
    if (user == null) {
      return res.status(404).json({ message: 'Cannot find user' })
    }
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }

  res.user = user
  next()
}

export default router;

    