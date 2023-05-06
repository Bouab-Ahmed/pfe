import React from "react";
import PostCard from "./PostCard";

const Posts = () => {
  const blogPosts = [
    {
      id: 1,
      author: "Jane Doe",
      profilePic: "https://i.pravatar.cc/300",
      title: "5 Easy Tips for Healthy Eating",
      content:
        "Eating healthy doesn't have to be complicated or boring. Here are 5 easy tips for healthy eating:\n\n1. Start with whole foods.\n2. Eat a variety of colorful fruits and vegetables.\n3. Choose lean proteins like chicken, fish, and tofu.\n4. Limit your intake of processed foods and sugar.\n5. Stay hydrated with water and unsweetened beverages.",
      tags: ["health", "nutrition"],
      date: "2022-05-01",
      image: "https://i.pravatar.cc/500",
      timeToRead: 4,
    },
    {
      id: 2,
      author: "John Smith",
      profilePic: "https://i.pravatar.cc/300",
      title: "How to Stay Productive While Working from Home",
      content:
        "Working from home has become more common than ever before, but it can be challenging to stay productive when there are so many distractions. Here are a few tips to help you stay on track:\n\n1. Set up a dedicated workspace.\n2. Create a schedule and stick to it.\n3. Take breaks to recharge.\n4. Eliminate distractions like social media and TV.\n5. Use productivity tools like timers and to-do lists.",
      tags: ["work", "productivity"],
      date: "2022-04-25",
      image: "https://i.pravatar.cc/600",
      timeToRead: 6,
    },
    {
      id: 3,
      author: "Lisa Chen",
      profilePic: "https://i.pravatar.cc/300",
      title: "10 Fun Activities to Do with Kids",
      content:
        "Spending quality time with your kids doesn't have to be expensive or complicated. Here are 10 fun activities to do with kids:\n\n1. Have a picnic in the park.\n2. Play board games or card games.\n3. Go for a bike ride or hike.\n4. Make homemade pizza or cookies.\n5. Build a fort or a puzzle together.\n6. Have a movie night with popcorn.\n7. Do a craft or DIY project.\n8. Play a sport or do a workout together.\n9. Have a dance party or karaoke.\n10. Take a day trip or explore a new place.",
      tags: ["parenting", "family"],
      date: "2022-04-20",
      image: "https://i.pravatar.cc/500",
      timeToRead: 8,
    },
    {
      id: 4,
      author: "Mike Johnson",
      profilePic: "https://i.pravatar.cc/300",
      title: "5 Reasons Why Traveling is Good for You",
      content:
        "Traveling is not just a fun activity, it can also have many benefits for your health and wellbeing. Here are 5 reasons why traveling is good for you:\n\n1. It reduces stress and improves mental health.\n2. It boosts creativity and inspiration.\n3. It broadens your perspective and understanding of other cultures.\n4. It strengthens relationships and creates new ones.\n5. It provides opportunities for adventure and personal growth.",
      tags: ["travel", "wellness"],
      date: "2022-04-15",
      image: "https://i.pravatar.cc/400",
      timeToRead: 5,
    },
    {
      id: 5,
      author: "Samantha Lee",
      profilePic: "https://i.pravatar.cc/300",
      title: "The Importance of Mindfulness in Daily Life",
      content:
        "Mindfulness is the practice of being present and aware of the present moment. It can help reduce stress, increase focus, and improve overall wellbeing. Here are some simple ways to practice mindfulness in your daily life:\n\n1. Focus on your breathing and bodily sensations.\n2. Take a mindful walk and observe your surroundings.\n3. Practice gratitude and appreciation.\n4. Be present in conversations and listen actively.\n5. Take regular breaks to rest and recharge.",
      tags: ["mindfulness", "wellness"],
      date: "2022-04-10",
      image: "https://i.pravatar.cc/500",
      timeToRead: 7,
    },
    {
      id: 6,
      author: "Tom Williams",
      profilePic: "https://i.pravatar.cc/300",
      title: "How to Build a Successful Online Business",
      content:
        "Building a successful online business requires hard work and dedication, but it can be a rewarding and fulfilling experience. Here are some tips to help you get started:\n\n1. Identify a niche or problem to solve.\n2. Develop a clear business plan and strategy.\n3. Build a website or online presence.\n4. Offer value and provide excellent customer service.\n5. Continuously learn and adapt to changes in the industry.",
      tags: ["business", "entrepreneurship"],
      date: "2022-04-05",
      image: "https://i.pravatar.cc/600",
      timeToRead: 6,
    },
    {
      id: 7,
      author: "Emily Kim",
      profilePic: "https://i.pravatar.cc/300",
      title: "5 Tips for a Sustainable Lifestyle",
      content:
        "Living a sustainable lifestyle can help reduce your carbon footprint and promote a healthier planet. Here are 5 simple tips to help you live more sustainably:\n\n1. Reduce, reuse, and recycle.\n2. Choose eco-friendly products and packaging.\n3. Conserve water and energy.\n4. Support local and sustainable businesses.\n5. Use public transportation, bike, or walk instead of driving.",
      tags: ["sustainability", "environment"],
      date: "2022-04-01",
      image: "https://i.pravatar.cc/500",
      timeToRead: 4,
    },
  ];
  return (
    <div className="flex flex-col">
      {blogPosts.map((post) => (
        <PostCard key={post.id} {...post} />
      ))}
    </div>
  );
};

export default Posts;
