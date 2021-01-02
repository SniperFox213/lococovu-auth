import { writable } from "svelte/store";
import axios from "axios";

function store() {
  // Default Profile Object
  let profile = {
    id: null,
  };

  // Let's now "import" some important
  const { subscribe, update } = writable(profile);

  return {
    subscribe,

    // Function, that'll load our user information
    loadProfile: (token) => {
      // Let's now check if it's a
      // token or no.
      if (token.split('').length != 16) {
        return;
      };

      return new Promise((resolve, reject) => {
        // Let's now try to connect to authed
        // servers and try to get some information
        // about this token.
        axios.get(`https://lococovu.me/api/profile/${token}`)
        .then((response) => {
          const data = response.data;

          // Second Token Check
          if (!data.isToken) {
            reject({ error: "!IsToken" });
          };

          // And now let's update our store.
          update((store) => {
            // Update Profile
            store = data;

            setTimeout(() => {
              resolve(store);
            }, 10);
            return store;
          });
        }).catch((error) => {
          reject(error);
        });
      });
    },

    // Function, that'll force our user's profile
    // data to the store.
    forceProfile: (profile) => {
      update(() => {
        return profile;
      });
    }
  }
};

export default store();