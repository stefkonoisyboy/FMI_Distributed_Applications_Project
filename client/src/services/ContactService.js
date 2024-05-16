import axios from "axios";
import { CONTACT_BY_ID_URL, CONTACT_URL } from "../Constants";
import {
  deleteContactDb,
  getAuthToken,
  getContactsDb,
  removeAuthToken,
} from "./IndexedDbService";

axios.interceptors.request.use(async (config) => {
  try {
    const authToken = await getAuthToken();
    if (authToken) {
      config.headers.Authorization = `Bearer ${authToken.authToken}`;
    }
    return config;
  } catch (error) {
    return {};
  }
});

axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    try {
      const status = error.response ? error.response.status : null;

      if (status === 401) {
        if (
          window.location.pathname !== "/sign-in" &&
          window.location.pathname !== "/sign-up"
        ) {
          window.location.assign("/sign-in");
        }
        await removeAuthToken();
        // Handle unauthorized access
      } else if (status === 404) {
        // Handle not found errors
        const currentUrl = window.location.href;
        const { origin } = new URL(currentUrl);
        window.location.href = `${origin}/not-found`;
      } else {
        // Handle other errors
        console.log("Other errors");
      }

      return Promise.reject(error);
    } catch (error) {
      return {};
    }
  }
);

export const createContact = (data) => axios.post(CONTACT_URL, data);
export const deleteContact = (id) =>
  axios.delete(CONTACT_BY_ID_URL.replace(":contactId", id));
export const getAllContacts = () => axios.get(CONTACT_URL);
export const getContactById = (id) =>
  axios.get(CONTACT_BY_ID_URL.replace(":contactId", id));

export const createOfflineContacts = async () => {
  try {
    const offlineData = await getContactsDb();

    const authToken = await getAuthToken();
    const createRequests = offlineData.map(async (item) => {
      try {
        const { id, firstName, lastName, phone, address, city, image } = item;

        const formData = new FormData();
        formData.append("firstName", firstName);
        formData.append("lastName", lastName);
        formData.append("phone", phone);
        formData.append("address", address);
        formData.append("city", city);
        formData.append("image", image);

        await fetch(CONTACT_URL, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${authToken.authToken}`,
          },
          body: formData,
        });
        await deleteContactDb(id);
      } catch (error) {
        console.error("Error creating data:", error);
      }
    });

    await Promise.all(createRequests);
  } catch (error) {
    console.error("Error sending offline data:", error);
  }
};

export async function registerSync() {
  const swRegistration = await navigator.serviceWorker.ready;
  swRegistration.sync.register("create-contact");
}
