import InputField from "components/fields/InputField";
import Checkbox from "components/checkbox";
import { useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { postRequestOptions, baseUrl } from "../../cookie.tsx";

export default function SignIn() {
  const [requestStatus, setRequestStatus] = useState(false);
  const [authStatus, setAuthStatus] = useState("");
  const query = new URLSearchParams(useLocation().search);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  async function handleSubmit(event) {
    event.preventDefault();
    setRequestStatus(true);
    let formData = { email: email, password: password };
    try {
      let auth = await axios.post(baseUrl + "login", formData, postRequestOptions);
      console.log({auth})
      if (auth.status == 200) {
        window.location.href = "/admin/default";
      } else {
        setAuthStatus(auth.data.message);
        setRequestStatus(false);
      }
    } catch (error) {
      console.error("Login error:", error);
      setAuthStatus("An error occurred during login.");
      setRequestStatus(false);
    }
  }

  return (
    <div className="mt-16 mb-16 flex h-full w-full items-center justify-center px-2 md:mx-0 md:px-0 lg:mb-10 lg:items-center lg:justify-start">
      <div className="mt-[10vh] w-full max-w-full flex-col items-center md:pl-4 lg:pl-0 xl:max-w-[420px]" >
        <h4 className="mb-2.5 text-4xl font-bold text-navy-700 dark:text-white">
          Sign In
        </h4>
        <p className="mb-9 ml-1 text-base text-gray-600">
          Enter your email and password to sign in!
        </p>
        <form onSubmit={handleSubmit}>
          <div className="mb-6 flex items-center gap-3">
            <div className="h-px w-full bg-gray-200 dark:bg-navy-700" />
            <p className="text-base text-gray-600 dark:text-white"> or </p>
            <div className="h-px w-full bg-gray-200 dark:bg-navy-700" />
          </div>
          <InputField
            variant="auth"
            extra="mb-3"
            label="Email*"
            placeholder="mail@simmmple.com"
            id="email"
            type="text"
            value={email}
            onChange={handleEmailChange}
          />
          <InputField
            variant="auth"
            extra="mb-3"
            label="Password*"
            placeholder="Min. 8 characters"
            id="password"
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
          <div className="mb-4 flex items-center justify-between px-2">
            {/* Add any additional elements here if needed */}
          </div>
          <button
            type="submit"
            className="linear mt-2 w-full rounded-xl bg-brand-500 py-[12px] text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200"
          >
            Sign In
          </button>
        </form>
        {authStatus && <p className="mt-2 text-red-500">{authStatus}</p>}
      </div>
    </div>
  );
}