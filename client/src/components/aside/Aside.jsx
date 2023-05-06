import React, { useState } from "react";

import authorPic from "../../assets/default.jpg";

const Aside = () => {
  const recommended = [
    "Fiction",
    "Non-fiction",
    "Mystery",
    "Thriller",
    "Romance",
    "Science Fiction",
    "Fantasy",
    "Horror",
    "Historical Fiction",
    "Biography",
    "Autobiography",
    "Memoir",
    "Self-help",
    "Business",
    "Politics",
    "History",
    "Travel",
    "Cooking",
    "Art",
    "Poetry",
    "Drama",
    "Religion",
    "Philosophy",
    "Psychology",
    "Sociology",
    "Education",
    "Science",
    "Sports",
    "Children's",
    "Young Adult",
  ];

  let authors = [
    {
      id: 1,
      name: "Candice Wu",
      fellow: "Follow",
    },
    {
      id: 2,
      name: "Candice Wu",
      fellow: "Follow",
    },
    {
      id: 3,
      name: "Candice Wu",
      fellow: "Follow",
    },
    {
      id: 4,
      name: "Candice Wu",
      fellow: "Follow",
    },
    {
      id: 5,
      name: "Candice Wu",
      fellow: "Follow",
    },
    {
      id: 6,
      name: "Candice Wu",
      fellow: "Follow",
    },
    {
      id: 7,
      name: "Candice Wu",
      fellow: "Follow",
    },
    {
      id: 8,
      name: "Candice Wu",
      fellow: "Follow",
    },
    {
      id: 9,
      name: "Candice Wu",
      fellow: "Follow",
    },
    {
      id: 10,
      name: "Candice Wu",
      fellow: "Follow",
    },
    {
      id: 11,
      name: "Candice Wu",
      fellow: "Follow",
    },
    {
      id: 12,
      name: "Candice Wu",
      fellow: "Follow",
    },
    {
      id: 13,
      name: "Candice Wu",
      fellow: "Follow",
    },
    {
      id: 14,
      name: "Candice Wu",
      fellow: "Follow",
    },
  ];

  const [follow, setFollow] = useState(authors);
  const onFollow = (fellow, id) => {
    const newAuthors = authors.map((author) => {
      if (author.id === id) {
        author.fellow = fellow === "Follow" ? "Following" : "Follow";
      }
      return author;
    });
    setFollow(newAuthors);
  };

  return (
    <div className="flex flex-col items-center justify-center sticky top-14 z-10">
      <div className="mx-1 my-2">
        <h2 className="text-2xl font-bold my-2">Recommended Topics</h2>
        <div className="flex flex-wrap gap-2">
          {recommended.slice(0, 10).map((topic, i) => (
            <span
              className="p-2 bg-gray-100 rounded-full text-sm text-[#292929] cursor-pointer"
              key={i}
            >
              {" "}
              {topic}{" "}
            </span>
          ))}
        </div>
        <h3 className="my-1 text-primary">
          <a href="/topics">Discover more</a>
        </h3>
      </div>
      <div className="mx-1 my-2">
        <h2 className="text-2xl font-bold my-2">who to fellow</h2>
        <div className="flex flex-wrap gap-2">
          {follow.slice(0, 5).map((author, i) => (
            <div className="flex flex-row my-1 items-center" key={i}>
              <img
                src={authorPic}
                alt="author"
                className="h-8 w-8 rounded-full self-start"
              />
              <div className="flex flex-col mx-2">
                <span className="text-lg font-bold"> {author.name} </span>
                <p className="text-[#292929] opacity-75 text-sm">
                  Creative Investor. Sharing my inspiring journey in...
                </p>
              </div>
              <button
                className="rounded-full px-8 py-2 border border-black"
                onClick={() => onFollow(author.fellow, author.id)}
              >
                {author.fellow}
              </button>
            </div>
          ))}
          <h3 className="my-1 text-primary">
            <a href="/topics">See more Suggestions</a>
          </h3>
        </div>
      </div>
    </div>
  );
};

export default Aside;
