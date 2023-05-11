// import { dispatch } from "store";
// import { openSnackbar } from "store/slices/snackbar";

// export default class APIManager {
//   constructor() {
//     this.baseURL = "https://mobile-api2.alpha-dev.streamspace.ai";
//   }

//   async get(endpoint) {
//     const response = await fetch(`${this.baseURL}/${endpoint}`);
//     const data = await response.json();
//     return data;
//   }

//   async post(endpoint, body) {
//     const response = await fetch(`${this.baseURL}/${endpoint}`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         'accept': '*/*'
//       },
//       body: JSON.stringify(body)
//     });
//     const data = await response.json();
//     if(!response.ok){
//       dispatch(
//         openSnackbar({
//             open: true,
//             message: data.message,
//             variant: 'alert',
//             alert: {
//                 color: 'error'
//             },
//             close: false
//         })
//       );
//     }
//     return {
//       data: data,
//       error: !response.ok
//     };
//   }

//   async put(endpoint, body) {
//     const response = await fetch(`${this.baseURL}/${endpoint}`, {
//       method: 'PUT',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify(body)
//     });
//     const data = await response.json();
//     return data;
//   }

//   async patch(endpoint, body) {
//     const response = await fetch(`${this.baseURL}/${endpoint}`, {
//       method: 'PATCH',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify(body)
//     });
//     const data = await response.json();
//     return data;
//   }

//   async delete(endpoint) {
//     const response = await fetch(`${this.baseURL}/${endpoint}`, {
//       method: 'DELETE'
//     });
//     const data = await response.json();
//     return data;
//   }
// }
import { dispatch } from "store";
import { openSnackbar } from "store/slices/snackbar";

export default class APIManager {
  constructor() {
    this.baseURL = "https://mobile-api2.alpha-dev.streamspace.ai";
  }

  sendResponse(data, response) {
    if (response.status === 401) {
      window.location.href = '/login';
    }
    if (data?.message) {
      if (!response.ok) {
        dispatch(
          openSnackbar({
            open: true,
            message: data.message,
            variant: 'alert',
            alert: {
              color: 'error'
            },
            close: false
          })
        );
      } else if (response.ok) {
        dispatch(
          openSnackbar({
            open: true,
            message: data.message,
            variant: 'alert',
            alert: {
              color: 'success'
            },
            close: false
          })
        );
      }
    }
    return {
      data: data,
      error: !response.ok
    };
  }

  async requestForm(endpoint, method, body) {
    const response = await fetch(`${this.baseURL}/${endpoint}`, {
      method: method,
      headers: {
        'accept': '*/*',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: body,
    })
    const data = await response.json();
    return this.sendResponse(data, response);
  }

  async request(endpoint, method, body) {
    let response, data;
    try{
      response = await fetch(`${this.baseURL}/${endpoint}`, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
          'accept': '*/*',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(body)
      });
      data = await response.json();
    } catch(e){
      console.log(e)
    }
    return this.sendResponse(data, response);
  }

  async get(endpoint) {
    return await this.request(endpoint, 'GET');
  }

  async post(endpoint, body) {
    return await this.request(endpoint, 'POST', body);
  }

  async postForm(endpoint, body) {
    return await this.requestForm(endpoint, 'POST', body)
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

