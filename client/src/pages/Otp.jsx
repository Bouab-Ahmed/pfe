import React, { createRef, useEffect, useState } from "react";
import { verifyMail } from "../features/auth/authSlice";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const Otp = () => {
  // eslint-disable-next-line
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );
  const navigate = useNavigate();

  // eslint-disable-next-line
  const dispatch = useDispatch();
  const numerOfInputs = 6;

  const [inputRefsArray] = useState(() =>
    Array.from({ length: numerOfInputs }, () => createRef())
  );
  // eslint-disable-next-line
  const [currentIndex, setCurrentIndex] = useState(0);
  // eslint-disable-next-line
  const [values, setValues] = useState(0);

  const [letters, setLetters] = useState(() =>
    Array.from({ length: numerOfInputs }, () => "")
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess) {
      toast.success("verification successful");
      navigate("/");
    }
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const handleKeyPress = () => {
    setCurrentIndex((prevIndex) => {
      if (prevIndex === numerOfInputs - 1) {
        return prevIndex;
      }
      const nextIndex = prevIndex < numerOfInputs - 1 ? prevIndex + 1 : 0;
      const nextInput = inputRefsArray?.[nextIndex]?.current;
      nextInput.focus();
      nextInput.select();
      return nextIndex;
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const data = { token: letters.join("").toString() };
    dispatch(verifyMail(data));
  };

  useEffect(() => {
    if (inputRefsArray?.[0]?.current) {
      inputRefsArray?.[0]?.current?.focus();
    }

    window.addEventListener("keyup", handleKeyPress, false);
    return () => {
      window.removeEventListener("keyup", handleKeyPress);
    };
    // eslint-disable-next-line
  }, []);

  return (
    <div className="relative flex flex-col justify-center overflow-hidden py-12">
      <div className="relative bg-gray-50 px-6 pt-10 pb-9 shadow-2xl mx-auto w-full max-w-lg rounded-2xl">
        <div className="mx-auto flex w-full max-w-md flex-col space-y-16">
          <div className="flex flex-col items-center justify-center text-center space-y-2">
            <div className="font-semibold text-3xl">
              <p>Email Verification</p>
            </div>
            <div className="flex flex-row text-sm font-medium text-gray-400">
              <p>We have sent a code to your email</p>
            </div>
          </div>

          <div>
            <form action="" method="post" onSubmit={onSubmit}>
              <div className="flex flex-col space-y-16">
                <div className="flex flex-row items-center justify-between mx-auto w-full ">
                  {inputRefsArray.map((ref, index) => {
                    return (
                      <div className="w-16 h-16" key={index}>
                        <input
                          className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-300 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-primary"
                          ref={ref}
                          type="text"
                          id={`box${index}-1`}
                          onChange={(e) => {
                            const { value } = e.target;
                            setLetters((letters) =>
                              letters.map((letter, letterIndex) =>
                                letterIndex === index ? value : letter
                              )
                            );
                          }}
                          onClick={(e) => {
                            setCurrentIndex(index);
                            e.target.select();
                          }}
                          value={letters[index]}
                          max={"1"}
                        />
                      </div>
                    );
                  })}
                </div>

                <div className="flex flex-col space-y-5">
                  <div>
                    <button
                      className="flex flex-row items-center justify-center text-center w-full border rounded-xl outline-none py-5 bg-primary border-none text-white text-sm shadow-sm"
                      type="submit"
                    >
                      Verify Account
                    </button>
                  </div>

                  <div className="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500">
                    <p>Didn't recieve code?</p>{" "}
                    <a
                      className="flex flex-row items-center text-primary"
                      href="http://"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Resend
                    </a>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Otp;
