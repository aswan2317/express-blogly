const db = require('../db');
const User = require('../models/user');
const Message = require('../models/message');

beforeAll(async () => {
  // Ensure the test database has the required users
  await User.register({
    username: 'testuser1',
    password: 'password',
    first_name: 'Test',
    last_name: 'User1',
    phone: '1234567890'
  });
  
  await User.register({
    username: 'testuser2',
    password: 'password',
    first_name: 'Test',
    last_name: 'User2',
    phone: '0987654321'
  });
});

afterAll(async () => {
  // Clean up the test database
  await db.query(`DELETE FROM messages`);
  await db.query(`DELETE FROM users WHERE username IN ('testuser1', 'testuser2')`);
  await db.end();
});

describe("Test Message class", () => {
  test("can mark read", async () => {
    const message = await Message.create({
      from_username: 'testuser1',
      to_username: 'testuser2',
      body: 'Hello, this is a test message'
    });
    expect(message).toHaveProperty('id');
    expect(message).toHaveProperty('from_username', 'testuser1');
    expect(message).toHaveProperty('to_username', 'testuser2');
    expect(message).toHaveProperty('body', 'Hello, this is a test message');
  });
});