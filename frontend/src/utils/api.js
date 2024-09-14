const baseUrl = "http://localhost:3001";
import { defaultClothingItems } from './constants';

const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Error: ${res.status}`);
};

const request = (url, options) => {
  return fetch(url, options)
    .then(checkResponse)
    .catch(err => {
      if (err instanceof TypeError && err.message === "Failed to fetch") {
        console.error(`Network error: Unable to connect to ${url}`);
        throw new Error("Unable to connect to the server. Please check your internet connection or try again later.");
      }
      throw err;
    });
};

function getItems() {
  console.log('Fetching items from:', `${baseUrl}/items`);
  return request(`${baseUrl}/items`)
    .then(data => {
      console.log('Received data:', data);
      return data.data && data.data.length > 0 ? data : { data: defaultClothingItems };
    })
    .catch(err => {
      console.error("Error in getItems:", err);
      return { data: defaultClothingItems };
    });
}

function addItem(item) {
  return request(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(item),
  }).catch(err => {
    console.error("Error adding item:", err);
    throw err;
  });
}

function deleteItem(itemId) {
  return request(`${baseUrl}/items/${itemId}`, {
    method: "DELETE",
  });
}

export function addCardLike(itemId, token) {
  return request(`${baseUrl}/items/${itemId}/likes`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  });
}

export function removeCardLike(itemId, token) {
  return request(`${baseUrl}/items/${itemId}/likes`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  });
}

export { getItems, addItem, deleteItem };
