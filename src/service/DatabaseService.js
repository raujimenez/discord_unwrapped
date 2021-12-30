class DatabaseService {
  constructor(dbResourceUrl) {
    this.dbResourceUrl = dbResourceUrl;
    this.connected = false;
  }

  async createConnection() {
    if (!this.connected) {
      this.connected = true;
      console.log(`established connection to ${this.dbResourceUrl}`);
    } else {
      console.log(`already connected to ${this.dbResourceUrl}`);
    }
  }

  async saveMessage(message) {}

  async saveAuditLog(auditLog) {}

  async closeConnection() {
    if (!this.connected) {
      this.connected = false;
      console.log(`closed connection to ${this.dbResourceUrl}`);
    } else {
      console.log(`connection is already closed to ${this.dbResourceUrl}`);
    }
  }
}

module.exports = { DatabaseService };
