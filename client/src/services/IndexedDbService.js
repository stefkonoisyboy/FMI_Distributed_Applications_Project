const DB_NAME = "db";
const DB_VERSION = 1;
const USER_ID = 1;
let db = null;

export const openDb = () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = function (event) {
      reject("Error opening db:", event.target.errorCode);
    };

    request.onsuccess = function (event) {
      db = event.target.result;
      resolve("Successfully opened db");
    };

    request.onupgradeneeded = function (event) {
      const db = event.target.result;
      if (!db.objectStoreNames.contains("contacts")) {
        db.createObjectStore("contacts", {
          keyPath: "id",
          autoIncrement: true,
        });
      }

      if (!db.objectStoreNames.contains("authTokens")) {
        db.createObjectStore("authTokens", {
          keyPath: "id",
          autoIncrement: true,
        });
      }
    };
  });
};

export const addContactDb = (data) => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onsuccess = () => {
      db = request.result;
      const transaction = db.transaction(["contacts"], "readwrite");
      const objectStore = transaction.objectStore("contacts");
      const contactsRequest = objectStore.add(data);

      contactsRequest.onsuccess = function (event) {
        resolve("Contact added successfully");
      };

      contactsRequest.onerror = function (event) {
        reject("Error adding contact");
      };
    };

    request.onerror = () => {
      const error = request.error?.message;
      if (error) {
        resolve(error);
      } else {
        resolve("Unknown error");
      }
    };
  });
};

export const getContactsDb = () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onsuccess = () => {
      db = request.result;
      const transaction = db.transaction(["contacts"], "readonly");
      const objectStore = transaction.objectStore("contacts");
      const contactsRequest = objectStore.getAll();

      contactsRequest.onsuccess = function (event) {
        const contacts = event.target.result;
        resolve(contacts);
      };

      contactsRequest.onerror = function (event) {
        reject("Error getting contacts");
      };
    };

    request.onerror = () => {
      const error = request.error?.message;
      if (error) {
        resolve(error);
      } else {
        resolve("Unknown error");
      }
    };
  });
};

export const deleteContactDb = (key) => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onsuccess = () => {
      db = request.result;
      const transaction = db.transaction(["contacts"], "readwrite");
      const objectStore = transaction.objectStore("contacts");
      const contactsRequest = objectStore.delete(key);

      contactsRequest.onsuccess = function (event) {
        resolve("Successfully deleted contact");
      };

      contactsRequest.onerror = function (event) {
        reject("Error deleting contact");
      };
    };

    request.onerror = () => {
      const error = request.error?.message;
      if (error) {
        resolve(error);
      } else {
        resolve("Unknown error");
      }
    };
  });
};

export const storeAuthToken = (authToken) => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onsuccess = () => {
      db = request.result;
      const transaction = db.transaction(["authTokens"], "readwrite");
      const objectStore = transaction.objectStore("authTokens");
      const authTokeRequest = objectStore.put({ id: USER_ID, authToken });

      authTokeRequest.onsuccess = () => {
        resolve("Successfully stored authToken.");
      };

      authTokeRequest.onerror = () => {
        reject("Error storing authToken");
      };
    };

    request.onerror = () => {
      const error = request.error?.message;
      if (error) {
        resolve(error);
      } else {
        resolve("Unknown error");
      }
    };
  });
};

export const getAuthToken = () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onsuccess = () => {
      db = request.result;
      const transaction = db.transaction(["authTokens"], "readonly");
      const objectStore = transaction.objectStore("authTokens");
      const authTokeRequest = objectStore.get(USER_ID);

      authTokeRequest.onsuccess = function (event) {
        const authToken = event.target.result;
        resolve(authToken);
      };

      authTokeRequest.onerror = function (event) {
        reject("Error accessing authToken");
      };
    };

    request.onerror = () => {
      const error = request.error?.message;
      if (error) {
        resolve(error);
      } else {
        resolve("Unknown error");
      }
    };
  });
};

export const removeAuthToken = () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onsuccess = () => {
      db = request.result;
      const transaction = db.transaction(["authTokens"], "readwrite");
      const objectStore = transaction.objectStore("authTokens");
      const authTokenRequest = objectStore.delete(USER_ID);
      authTokenRequest.onsuccess = function (event) {
        resolve("Auth token removed successfully");
      };

      authTokenRequest.onerror = function (event) {
        reject("Error removing auth token");
      };
    };

    request.onerror = () => {
      const error = request.error?.message;
      if (error) {
        resolve(error);
      } else {
        resolve("Unknown error");
      }
    };
  });
};
