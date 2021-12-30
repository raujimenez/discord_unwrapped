export default class DatabaseService {
  constructor(dbResourceUrl) {
    this.dbResourceUrl = dbResourceUrl;
    this.connected = false;
  }


  async createConnection() {
    if (!this.connected) {
      
      this.connected = true;
    }

  }


  async saveMessage(message) {

  }

  async closeConnection() {
    if (!this.connected) {
      
      this.connected = false;
    }
    
  }
}
