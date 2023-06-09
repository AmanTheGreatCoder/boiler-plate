import CustomAlert from 'components/CustomAlert';

export default class APIManager {
  constructor() {}

  checkInternet() {
    if (!window.navigator.onLine) {
      CustomAlert({ message: 'Please connect to internet', color: 'error' });
      return false;
    }
    return true;
  }

  checkResponse(data, response) {
    if (!response) {
      window.location.href = '/maintenance';
    }
    if (response.status === 401) {
      window.location.href = '/login';
    }
    if (data?.message) {
      if (!response.ok) {
        CustomAlert({
          message: data.message,
          color: 'error'
        });
      } else if (response.ok) {
        CustomAlert({
          message: data.message,
          color: 'success'
        });
      }
    }
    return {
      data: data,
      error: !response.ok
    };
  }

  async requestForm(endpoint, method, body) {
    if (this.checkInternet()) {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}${endpoint}`, {
        method: method,
        headers: {
          accept: '*/*',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        body: body
      });
      const data = await response.json();
      return this.checkResponse(data, response);
    }
    return;
  }

  async request(endpoint, method, body) {
    if (this.checkInternet()) {
      let response, data;
      try {
        response = await fetch(`${process.env.REACT_APP_BASE_URL}${endpoint}`, {
          method: method,
          headers: {
            'Content-Type': 'application/json',
            accept: '*/*',
            Authorization: `Bearer ${localStorage.getItem('token')}`
          },
          body: JSON.stringify(body)
        });
        data = await response.json();
      } catch (e) {}
      return this.checkResponse(data, response);
    }
    return;
  }

  async get(endpoint) {
    return await this.request(endpoint, 'GET');
  }

  async post(endpoint, body) {
    return await this.request(endpoint, 'POST', body);
  }

  async postForm(endpoint, body) {
    return await this.requestForm(endpoint, 'POST', body);
  }

  async put(endpoint, body) {
    return await this.request(endpoint, 'PUT', body);
  }

  async patch(endpoint, body) {
    return await this.request(endpoint, 'PATCH', body);
  }

  async delete(endpoint, body) {
    return await this.request(endpoint, 'DELETE', body);
  }
}
