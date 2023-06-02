import React, { useState } from "react";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Button,
} from "@material-tailwind/react";
import ConfirmationModal from "./ ConfirmationModal";

const UserProfileModel = ({ open, handleOpen, user }) => {
  const [localUser, setLocalUser] = useState(user);
	const [showConfirmation, setShowConfirmation] = useState(false);

	const handleDeleteAccount = (e) => {
		e.preventDefault();
  setShowConfirmation(!showConfirmation);
  const userData = {
    name: localUser.name,
    emailAddress: localUser.emailAddress,
  };

  // return new Promise(async (resolve) => {
  //   const handleConfirm = () => {
  //     // Send a request to delete the user account
  //     console.log('Deleting account:', userData);
  //     setShowConfirmation(false);
  //     resolve(true);
  //   };

  //   const handleCancel = () => {
  //     setShowConfirmation(false);
  //     resolve(false);
  //   };

  //   // Wait for user confirmation
  //   const userChoice = await new Promise((resolve) => {
  //     setTimeout(() => {
  //       resolve(userData.name);
  //     }, 3000);
  //   });

  //   if (userChoice === userData.name) {
  //     handleConfirm();
  //   } else {
  //     handleCancel();
  //   }
  // });
};


	
  return (
    <Dialog open={open} handler={handleOpen}>
      <DialogHeader>settings</DialogHeader>
      <DialogBody divider>
        <section className="max-w-4xl p-6 mx-auto dark:bg-gray-800">
          <h1 className="text-xl font-bold text-gray-900 capitalize dark:text-gray-900">
            Account settings
          </h1>
          <form>
            <div className="grid grid-cols-1 gap-6 mt-4">
              <div>
                <label
                  className="text-gray-900 dark:text-gray-200"
                  htmlFor="username"
                >
                  Full Name
                </label>
                <input
                  id="username"
                  type="text"
									value={localUser.name}
									onChange={(e) => setLocalUser({...localUser, name: e.target.value})}
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                />
              </div>

              <div>
                <label
                  className="text-gray-900 dark:text-gray-200"
                  htmlFor="emailAddress"
                >
                  Email Address
                </label>
                <input
                  id="emailAddress"
                  type="email"
									value={localUser.email}
									onChange={(e) => setLocalUser({...localUser, email: e.target.value})}
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                />
              </div>

              <div>
                <label
                  className="text-gray-900 dark:text-gray-200"
                  htmlFor="passwordConfirmation"
                >
                  update password
                </label>
                <input
                  id="passwordConfirmation"
                  type="password"
									placeholder="***************"
									value={localUser.password || ""}
									onChange={(e) => setLocalUser({...localUser, password: e.target.value})}
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                />
              </div>
              <div>
                <label
                  className="text-gray-900 dark:text-gray-200"
                  htmlFor="passwordConfirmation"
                >
                  bio
                </label>
                <textarea
                  id="textarea"
                  type="textarea"
									value={localUser.bio || ""}
									onChange={(e) => setLocalUser({...localUser, bio: e.target.value})}
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                ></textarea>
              </div>
            </div>
            <Button
              variant="text"
              color="red"
              onClick={handleDeleteAccount}
              className="mr-1 my-2"
            >
              <span>Delete Account</span>
            </Button>
            {showConfirmation && (
              <ConfirmationModal
								open={showConfirmation}
                user={user?.name}
                onClose={handleDeleteAccount}
              />
            )}
          </form>
        </section>
      </DialogBody>
      <DialogFooter>
        <Button
          variant="text"
          color="red"
          onClick={handleOpen}
          className="mr-1"
        >
          <span>Cancel</span>
        </Button>
        <Button variant="gradient" color="green" onClick={handleOpen}>
          <span>Confirm</span>
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default UserProfileModel;
