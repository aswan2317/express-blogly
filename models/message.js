// models/message.js
const db = require('../db');

class Message {
  // Create a new message
  static async create({ from_username, to_username, body }) {
    const result = await db.query(
      `INSERT INTO messages (from_username, to_username, body, sent_at)
       VALUES ($1, $2, $3, current_timestamp)
       RETURNING id, from_username, to_username, body, sent_at`,
      [from_username, to_username, body]
    );

    return result.rows[0];
  }

  // Get message details by ID
  static async get(id) {
    const result = await db.query(
      `SELECT m.id, m.body, m.sent_at, m.read_at,
              f.username AS from_username, f.first_name AS from_first_name, f.last_name AS from_last_name, f.phone AS from_phone,
              t.username AS to_username, t.first_name AS to_first_name, t.last_name AS to_last_name, t.phone AS to_phone
       FROM messages m
       JOIN users f ON m.from_username = f.username
       JOIN users t ON m.to_username = t.username
       WHERE m.id = $1`,
      [id]
    );

    const message = result.rows[0];

    if (!message) {
      throw new Error(`No message with ID: ${id}`);
    }

    return {
      id: message.id,
      body: message.body,
      sent_at: message.sent_at,
      read_at: message.read_at,
      from_user: {
        username: message.from_username,
        first_name: message.from_first_name,
        last_name: message.from_last_name,
        phone: message.from_phone,
      },
      to_user: {
        username: message.to_username,
        first_name: message.to_first_name,
        last_name: message.to_last_name,
        phone: message.to_phone,
      }
    };
  }

  // Mark a message as read
  static async markRead(id) {
    const result = await db.query(
      `UPDATE messages
       SET read_at = current_timestamp
       WHERE id = $1
       RETURNING id, read_at`,
      [id]
    );

    const message = result.rows[0];

    if (!message) {
      throw new Error(`No message with ID: ${id}`);
    }

    return message;
  }
}

module.exports = Message;