import React from "react";
import {
	Dialog,
	DialogHeader,
	DialogBody,
	DialogFooter,
	Button,
} from "@material-tailwind/react";

const ConfirmationModal = ({ open, onClose, user }) => {
  return (
    <Dialog open={open} handler={onClose} size="xs">
      <DialogHeader className="text-red-500">Danger Zone</DialogHeader>
      <DialogBody>
        <p>Are you sure you want to delete your account {user}?</p>
      </DialogBody>
      <DialogFooter>
        <Button
          variant="text"
          color="red"
          onClick={onClose}
          className="mr-1"
        >
          <span>Cancel</span>
        </Button>
        <Button variant="gradient" color="green" onClick={onClose}>
          <span>Confirm</span>
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default ConfirmationModal;
