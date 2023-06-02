import React, { useEffect, useState } from 'react'
import { Fragment } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Typography,
} from "@material-tailwind/react";


const Terms = ({ open, handleOpen, handleAcceptTerms }) => {
	const [delay, setDelay] = useState(true)

	useEffect(() => {
		setTimeout(() => {
		setDelay(()=> false)
	}, 15000)
	}, [])

	return (
    <Fragment>
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader>
          Terms of Use: Guidelines for Posting and Sharing Content on Our
          Platform
        </DialogHeader>
        <DialogBody divider className="h-[40rem]">
          <Typography className="font-semibold ">
            * Our platform allows users to post books, resumes, and articles. By
            submitting content to our site, you grant us a non-exclusive,
            worldwide, royalty-free, transferable, and sublicensable license to
            use, reproduce, distribute, prepare derivative works of, display,
            and perform your content in connection with the platform and our
            business operations. However, you retain all ownership rights to the
            content you submit.
            <br /> * You are solely responsible for the content you post on our
            platform. By submitting content, you represent and warrant that you
            have all necessary rights, licenses, and permissions to publish and
            share the content. You also agree that the content you submit does
            not violate any applicable laws, infringe upon the rights of others,
            or contain any harmful or malicious elements.
            <br /> *Respecting copyright and intellectual property rights is
            essential. You should not post any content that infringes upon the
            copyrights or intellectual property rights of others. If you believe
            that your copyrighted work has been infringed upon, please contact
            us with the relevant details for prompt resolution. <br />
            While using our platform, you agree to abide by the following
            guidelines:
            <ul style={{listStyle:'initial', marginLeft:'30px'}}>
              <li>
                Do not post content that is defamatory, abusive, obscene, or
                offensive.
              </li>
              <li>
                Do not engage in any form of harassment, bullying, or
                discrimination.
              </li>
              <li>
                Do not post content that promotes or incites violence, hatred,
                or illegal activities.
              </li>
              <li>Do not violate the privacy or personal rights of others.</li>
              <li>
                Do not use our platform for any unauthorized or unlawful
                purposes.
              </li>
            </ul>
          </Typography>
        </DialogBody>
        <DialogFooter className="space-x-2">
          <Button variant="outlined" color="red" onClick={handleOpen}>
            close
          </Button>
          <Button
            variant="gradient"
            color="green"
            onClick={() => {
              handleOpen();
              setDelay(() => true);
              handleAcceptTerms();
            }}
            disabled={delay}
          >
            Accept Terms
          </Button>
        </DialogFooter>
      </Dialog>
    </Fragment>
  );
}

export default Terms
