export default class APIManager {
  constructor() {
    this.baseURL = "https://mobile-api2.alpha-dev.streamspace.ai";
  }

  async get(endpoint) {
    const response = await fetch(`${this.baseURL}/${endpoint}`);
    const data = await response.json();
    return data;
  }

  async post(endpoint, body) {
    const response = await fetch(`${this.baseURL}/${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'accept': '*/*'
      },
      body: JSON.stringify(body)
    });
    const data = await response.json();
    return data;
  }

  async put(endpoint, body) {
    const response = await fetch(`${this.baseURL}/${endpoint}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });
    const data = await response.json();
    return data;
  }

  async patch(endpoint, body) {
    const response = await fetch(`${this.baseURL}/${endpoint}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });
    const data = await response.json();
    return data;
  }

  async delete(endpoint) {
    const response = await fetch(`${this.baseURL}/${endpoint}`, {
      method: 'DELETE'
    });
    const data = await response.json();
    return data;
  }
}
