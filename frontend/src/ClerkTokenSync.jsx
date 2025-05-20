import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useAuth, useUser } from "@clerk/clerk-react";
import { setToken } from "./features/AppContextSlice.js";

export const ClerkTokenSync = () => {
  const dispatch = useDispatch();
  const { getToken } = useAuth();
  const { user } = useUser();

  useEffect(() => {
    const syncToken = async () => {
      console.log("Token Refreshed")
      try {
        const token = await getToken(); // By default, gets session token
        dispatch(setToken({token, user}));
      } catch (err) {
        console.error("Error fetching Clerk token:", err);
      }
    };

    syncToken();

    const interval = setInterval(() => {
      syncToken();
    }, 40 * 1000); // every 40 Seconds

    return () => clearInterval(interval);
  }, [getToken, dispatch]);

  return null;
};
