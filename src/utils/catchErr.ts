import { toastErr, toastInfo } from "./toast";

const errorMessages: {
  [key: string]: { message: string; type: "error" | "info" };
} = {
  "auth/invalid-email": { message: "Invalid email", type: "error" },
  "auth/weak-password": {
    message: "Password should be at least 6 characters",
    type: "error",
  },
  "auth/user-not-found": { message: "User not found", type: "error" },
  "auth/email-already-in-use": {
    message: "Email already exists",
    type: "error",
  },
  "auth/wrong-password": { message: "Wrong password", type: "error" },
  "auth/requires-recent-login": {
    message: "Logout and login before updating your profile",
    type: "info",
  },
  unavailable: { message: "Firebase client is offline", type: "error" },
  "auth/invalid-login-credentials": {
    message: "Invalid credentials",
    type: "error",
  },
  "auth/operation-not-allowed": {
    message: "Can't change email now!",
    type: "error",
  },
};

const CatchErr = (err: { code?: string } | any) => {
  const { code } = err;

  if (code && errorMessages[code]) {
    const { message, type } = errorMessages[code];
    type === "error" ? toastErr(message) : toastInfo(message);
  } else {
    toastErr("An error occurred!");
    console.log(err, err.code);
  }
};

export default CatchErr;
