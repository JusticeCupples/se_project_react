const baseUrl = "http://localhost:3001";

const getToken = () => {
  return localStorage.getItem("jwt");
};

const checkResponse = (res) => {
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
  const token = localStorage.getItem("jwt");
  return fetch(`${baseUrl}/items`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  })
    .then((res) => checkResponse(res))
    .then((data) => {
      console.log("Items fetched from server:", data.data);
      return { data: Array.isArray(data.data) ? data.data : [] };
    })
    .catch((err) => {
      console.error("Error fetching items:", err);
      return { data: [] };
    });
};

export const addItem = (item) => {
  return request(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${localStorage.getItem("jwt")}`,
    },
    body: JSON.stringify(item),
  }).catch(err => {
    console.error("Error adding item:", err);
    throw err;
  });
};

export const deleteItem = (itemId) => {
  return request(`${baseUrl}/items/${itemId}`, {
    method: "DELETE",
    headers: {
      authorization: `Bearer ${localStorage.getItem("jwt")}`,
    },
  });
};

export const addCardLike = (itemId) => {
  return request(`${baseUrl}/items/${itemId}/likes`, {
    method: "PUT",
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${getToken()}`,
    },
  }).catch(err => {
    console.error("Error in addCardLike:", err);
    throw err.response ? err.response.data : err;
  });
};

export const removeCardLike = (itemId) => {
  return request(`${baseUrl}/items/${itemId}/likes`, {
    method: "DELETE",
    headers: {
      authorization: `Bearer ${getToken()}`,
    },
  }).catch(err => {
    console.error("Error in removeCardLike:", err);
    throw err.response ? err.response.data : err;
  });
};

const getCurrentUserId = () => {
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  return currentUser ? currentUser._id : null;
};
