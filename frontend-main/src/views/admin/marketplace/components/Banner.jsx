import React, { useState } from "react";
import nft1 from "assets/img/nfts/NftBanner1.png"; // Assuming the background image is the same
import img1 from "../components/img1.jpeg"

const Banner = ({ onSubmit }) => {
  const [header, setHeader] = useState("");
  const [story, setStory] = useState("");
  const [file, setFile] = useState(null);
  const [priority, setPriority] = useState("General");

  const handleFileUpload = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPost = {
      id: Math.random().toString(36).substr(2, 9), // Generate a random ID
      photo: file ? URL.createObjectURL(file) : img1, // Use img1 as default if no file
      header,
      story,
      status: priority === "Urgent" ? "Urgent" : "Active", // Set status based on priority
      statusType: priority,
    };
    onSubmit(newPost); // Pass the new post to the parent
  };

  return (
    <div
      className="flex w-full flex-col rounded-[20px] bg-cover px-[30px] py-[30px] md:px-[64px] md:py-[56px]"
      style={{ backgroundImage: `url(${nft1})` }}
    >
      <div className="w-full">
        <h4 className="mb-[14px] max-w-full text-xl font-bold text-white md:w-[64%] md:text-3xl md:leading-[42px] lg:w-[46%] xl:w-[85%] 2xl:w-[75%] 3xl:w-[52%]">
          Create a New Post
        </h4>
        <p className="mb-[40px] max-w-full text-base font-medium text-[#E3DAFF] md:w-[64%] lg:w-[40%] xl:w-[72%] 2xl:w-[60%] 3xl:w-[45%]">
          Fill in the form below to share your post with the world.
        </p>

        <form onSubmit={handleSubmit} className="w-full">
          <div className="mb-4">
            <label htmlFor="header" className="text-white font-medium">
              Post Title
            </label>
            <input
              type="text"
              id="header"
              value={header}
              onChange={(e) => setHeader(e.target.value)}
              className="w-full mt-2 rounded-lg px-4 py-2 text-black"
              placeholder="Enter the header"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="story" className="text-white font-medium">
              Post Story
            </label>
            <textarea
              id="story"
              value={story}
              onChange={(e) => setStory(e.target.value)}
              className="w-full mt-2 rounded-lg px-4 py-2 text-black"
              placeholder="Enter the post story"
              required
              style={{ minHeight: "120px" }}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="fileUpload" className="text-white font-medium">
              Upload File
            </label>
            <input
              type="file"
              id="fileUpload"
              onChange={handleFileUpload}
              className="w-full mt-2"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="priority" className="text-white font-medium">
              Priority
            </label>
            <select
              id="priority"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="w-full mt-2 rounded-lg px-4 py-2 text-black"
            >
              <option value="Urgent">Urgent</option>
              <option value="General">General</option>
            </select>
          </div>

          <div className="mt-[36px] flex items-center justify-between gap-4 sm:justify-start 2xl:gap-10">
            <button
              type="submit"
              className="text-black linear rounded-xl bg-white px-4 py-2 text-center text-base font-medium transition duration-200 hover:!bg-white/80 active:!bg-white/70"
            >
              Submit Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Banner;
