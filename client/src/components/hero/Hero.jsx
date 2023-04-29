import React from "react";
import hero from "../../assets/hero-pic.webp";
import { useNavigate } from "react-router-dom";
import conmpany1 from "../../assets/companies/1.webp";
import conmpany2 from "../../assets/companies/2.webp";
import conmpany3 from "../../assets/companies/3.webp";
import conmpany4 from "../../assets/companies/4.webp";
import conmpany5 from "../../assets/companies/5.webp";

const companies = [conmpany1, conmpany2, conmpany3, conmpany4, conmpany5];

const Hero = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="bg-[#F1FAF7] py-28">
        <div className="flex flex-col md:flex-row items-center gap-5 container1 mx-auto">
          <div className="flex flex-col items-start flex-1">
            <h1 className="text-6xl font-bold text-textColor font-DINRoundPro leading-[70px] w-3/4">
              Condensed content for knowledge seekers online.
            </h1>
            <div className="my-4">
              <p className="text-2xl text-textColorLight tracking-wide my-4">
                Welcome to Knowledge Hub, where you can access condensed
                versions of books, academic papers, and other written content,
                and contribute your own summaries, articles, or theses.
              </p>
            </div>
            <div className="flex gap-4">
              <button
                className="bg-primary text-white font-bold py-2 px-8 rounded-sm"
                onClick={() => {
                  navigate("/auth/register?role=writer");
                }}
              >
                start writing
              </button>
              <button
                className="bg-primary text-white font-bold py-2 px-8 rounded-sm"
                onClick={() => {
                  navigate("/auth/register?role=reader");
                }}
              >
                start reading
              </button>
            </div>
          </div>
          <div className="w-[40%]">
            <img src={hero} alt="hero" className="w-full h-full rounded-lg" />
          </div>
        </div>
      </div>
      <div className="container1 mx-auto">
        <div className="flex justify-between items-center min-w-full gap-10 my-20 text-xl">
          <h3 className="min-w-[10%]">Featured In</h3>
          <div className="flex justify-evenly items-center">
            {companies.map((company, index) => (
              <img
                src={company}
                alt="company"
                key={index}
                className="w-[15%] h-[15%]"
              />
            ))}
          </div>
        </div>
        <div className="flex items-center justify-between mb-10">
          <div className="flex flex-col items-center justify-start gap-4">
            <span className="text-8xl font-black">4.8</span>
            <div className="flex items-center">
              {[...Array(5)].map((_, index) => (
                <svg
                  aria-hidden="true"
                  className="w-5 h-5 text-yellow-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                  key={index}
                >
                  <title>star</title>
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
              ))}
            </div>
            <span>2,394 Ratings</span>
            <span>Google Reviews</span>
          </div>
          <div className="flex flex-col items-center justify-start gap-4">
            <span className="text-8xl font-black">A+</span>
            <div className="flex items-center">
              {[...Array(5)].map((_, index) => (
                <svg
                  aria-hidden="true"
                  className="w-5 h-5 text-yellow-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                  key={index}
                >
                  <title>star</title>
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
              ))}
            </div>
            <span>2,394 Ratings</span>
            <span>Google Reviews</span>
          </div>
          <div className="w-[50%]">
            <h2 className="text-4xl font-bold">
              Trusted by numerous Literary enthusiasts.
            </h2>
            <h6 className="my-4 text-primary text-xl">Jessica Simon</h6>
            <p className="text-base text-textColorLight font-bold">
              I absolutely love this website, it has made my life so much easier
              by providing concise summaries of books and academic papers that I
              otherwise would not have had time to read.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
