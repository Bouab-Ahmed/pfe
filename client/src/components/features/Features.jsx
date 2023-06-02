import React from "react";
import ListItem from "../listItem/ListItem";
import featurePic from "../../assets/feature.png";
const features = [
  "Access to condensed versions of books, academic papers, and other written content ",
  "Ability to read, share, and rate summaries, articles, and theses ",
  "Option for users to contribute by sharing, their own summaries, articles, or theses",
  "User-friendly interface for easy navigation, and search",
  "Regularly updated content to keep users informed of new releases and current events related to the topics covered.",
];
const benefits = [
  " Saves time: Users can access condensed  versions of books and academic papers, which saves them time and effort in reading lengthy content. ",
  "Convenient: Users can access the site from anywhere and at any time, making it a convenient option for busy readers. ",
  "Variety. The site offers a wide range of contentt including book summaries, articles, and theses, providing users with a diverse range of reading options. ",
  "Collaborative: Users can share their own summaries, articles, and theses, creating a collaborative community of readers and writers. ",
  "Cost-effective: Users can access the content without having to purchase the full book or academic paper, making it a cost-effective option for those on a tight budget.",
];

// 

const Features = () => {
  return (
    <>
      <div className="inline-flex items-center justify-center w-full bg-[#F1FAF7]">
        <hr className="w-full h-px my-8 bg-gray-500 border-0 container1" />
        <span className="absolute px-3 font-medium text-gray-800 -translate-x-1/2 bg-[#F1FAF7] left-1/2">
          features and benefits
        </span>
      </div>
      <div className="bg-[#F1FAF7] pb-10">
        <div className="flex flex-col justify-center items-center md:flex-row md:justify-start md:items-start container1 mx-auto gap-10 ">
          <div className="flex flex-col lg:flex-row gap-3 w-2/3 ">
            <div>
              <div className="flex flex-col items-start justify-center gap-4">
                <h2 className="text-4xl font-bold">Features</h2>
                <div className="flex flex-col items-start justify-start gap-4">
                  {features.map((feature, index) => (
                    <ListItem feature={feature} key={index} />
                  ))}
                </div>
              </div>
            </div>
            <div>
              <div className="flex flex-col items-start justify-center gap-4">
                <h2 className="text-4xl font-bold">Benefits</h2>
                <div className="flex flex-col items-start justify-start gap-4">
                  {benefits.map((benefit, index) => (
                    <ListItem feature={benefit} key={index} />
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-start items-start w-3/4 md:w-[40%] mt-3">
            <img src={featurePic} alt="feature" className="w-full" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Features;
