const baseUrl = "http://localhost:3001";

const getToken = () => {
  return localStorage.getItem("jwt");
};

export const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Error: ${res.status}`);
};

const request = (url, options) => {
  return fetch(url, options)
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return res.text().then(text => {
        throw new Error(`${res.status} ${res.statusText}: ${text}`);
      });
    })
    .catch(err => {
      if (err instanceof TypeError && err.message === "Failed to fetch") {
        console.error(`Network error: Unable to connect to ${url}`);
        throw new Error("Unable to connect to the server. Please check your internet connection or try again later.");
      }
      throw err;
    });
};

export const getItems = () => {
  return fetch(`${baseUrl}/items`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(checkResponse)
    .catch((err) => {
      console.error("Error fetching items:", err);
      return { data: [] };
    });
};

export const addItem = (item) => {
  const token = getToken();
  console.log("Token used for addItem:", token);
  return request(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(item),
  });
};

export const deleteItem = (id) => {
  const token = getToken();
  return request(`${baseUrl}/items/${id}`, {
    method: "DELETE",
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
};

export const addCardLike = (id) => {
  const token = getToken();
  return request(`${baseUrl}/items/${id}/likes`, {
    method: "PUT",
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
};

export const removeCardLike = (id) => {
  const token = getToken();
  return request(`${baseUrl}/items/${id}/likes`, {
    method: "DELETE",
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
};

export const getUserItems = () => {
  const token = localStorage.getItem("jwt");
  return fetch(`${baseUrl}/items/user`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  })
    .then(checkResponse)
    .catch((err) => {
      console.error("Error fetching user items:", err);
      return { data: [] };
    });
};

export const getAllItems = () => {
  return fetch(`${baseUrl}/items`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then(checkResponse);
};
