import React, { useState } from "react";
import Modal from 'react-modal';
import BannerForm from "./components/Banner";  // Import BannerForm
import img1 from "./img1.jpeg";
import img2 from "./dog1.jpeg";
import AlertPost from "./components/AlertPost";
import "./styles.css";
import {  useEffect, useCallback, useRef } from "react";
import { baseUrl, getRequestOptions } from "../../../cookie.tsx";

Modal.setAppElement('#root'); // Bind modal to your app's root

const Marketplace = () => {
  const dummyPosts = [
    {
      id: 1,
      photo: img1,
      header: "Very ill cat in Kwun Tong",
      story: "I think my neighbour does not take care of their cat and the cat is suffering. It seems to be dying and not eating enough food. HELP!!! The cat has been in this condition for several weeks now, and it seems to be getting worse. I have tried talking to the owner, but they don't seem to care. I'm really worried about the cat's health and well-being. If anyone can help or knows what to do, please reach out. This is an urgent situation and the cat needs immediate attention.",
      status: "Active",
      statusType: "Urgent",
    },
    {
      id: 2,
      photo: img2,
      header: "Dog in Bad Condition",
      story: "There is a dog in my neighborhood that seems to be in bad condition and not taken care of by its owner. It looks malnourished and needs help. The dog is often seen wandering around the streets, looking for food and shelter. It has lost a lot of weight and its fur is matted and dirty. I have tried to give it some food, but it needs more than that. It needs medical attention and a safe place to stay. If anyone can help or knows of any animal rescue organizations, please let me know. This is an urgent situation and the dog needs immediate help.",
      status: "Active",
      statusType: "Urgent",
    },
    {
      id: 3,
      photo: img1,
      header: "Lost Cat in Central",
      story: "A cat has been wandering around Central for a few days. It looks lost and scared. If anyone recognizes this cat or knows the owner, please help. The cat seems to be in good health but is definitely lost and needs to be reunited with its owner.",
      status: "Active",
      statusType: "Gen",
    },
    {
      id: 4,
      photo: img2,
      header: "Injured Dog in Wan Chai",
      story: "There is an injured dog in Wan Chai that needs immediate medical attention. It appears to have been hit by a car and is limping badly. If anyone can help or knows of any nearby veterinary services, please respond quickly. The dog is in a lot of pain and needs urgent care.",
      status: "Active",
      statusType: "Urgent",
    },
    {
      id: 5,
      photo: img1,
      header: "Abandoned Kittens in Mong Kok",
      story: "A litter of kittens has been abandoned in Mong Kok. They are very young and need to be taken care of. If anyone can foster these kittens or knows of any animal rescue organizations, please reach out. They need a safe place to stay and proper care.",
      status: "Active",
      statusType: "Urgent",
    },
    {
      id: 6,
      photo: img2,
      header: "Stray Dog in Sai Ying Pun",
      story: "A stray dog has been seen roaming around Sai Ying Pun. It looks hungry and in need of shelter. If anyone can provide food or a temporary home for this dog, please let us know. The dog is friendly but seems to be lost and in need of help.",
      status: "Active",
      statusType: "Urgent",
    },
    {
      id: 7,
      photo: img1,
      header: "Missing Parrot in Tsim Sha Tsui",
      story: "A parrot has gone missing in Tsim Sha Tsui. It is a colorful bird and very friendly. If anyone has seen this parrot or knows of its whereabouts, please contact the owner. The parrot is a beloved pet and the owner is very worried.",
      status: "Active",
      statusType: "Solved",
    }
  ];
  // let [dummyPosts, setData] = useState([]);
  // let url = baseUrl + `posts`;
  // useEffect(() => {
  //   fetch(url, getRequestOptions)
  //     .then((res) => {
  //       return res.json();
  //     })
  //     .then((data) => {
  //       setData(data.data);
  //     });
  // }, []);
  // console.log({dummyPosts})

  const [upvotes, setUpvotes] = useState([5, 10]); // Adjusted for upvotes
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [filter, setFilter] = useState(""); // New state for filtering posts

  // Handle upvote
  const handleUpvote = (index) => {
    const newUpvotes = [...upvotes];
    newUpvotes[index] += 1;
    setUpvotes(newUpvotes);
  };

  // Modal open and close handlers
  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  // Filtered posts based on the selected filter
  const getFilteredPosts = () => {
    if (filter === "Urgent") {
      return dummyPosts.filter(post => post.status === "Urgent");
    } else if (filter === "Most Upvoted") {
      return dummyPosts.sort((a, b) => upvotes[dummyPosts.indexOf(b)] - upvotes[dummyPosts.indexOf(a)]);
    }
    return dummyPosts; // Return all posts if no filter
  };

  return (
    <div className="mt-3 grid h-full grid-cols-1 gap-5 xl:grid-cols-2 2xl:grid-cols-3">
      <div className="col-span-1 h-fit w-full xl:col-span-1 2xl:col-span-2">
        {/* Create Post Button with Thinner Blue Border */}
        <div className="mb-5 mt-5 flex items-center justify-between px-[26px] border border-blue-500 rounded-lg p-4">
          <h4 className="text-2xl font-bold text-navy-700 dark:text-white">
            Make an Alert Post
          </h4>
          <button 
            className="bg-blue-500 text-white px-4 py-2 rounded-lg"
            onClick={openModal}
          >
            Create Post
          </button>
        </div>

        {/* Modal */}
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel="Create Post"
          className="modal"
          overlayClassName="overlay"
        >
          {/* Close Button */}
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-full"
          >
            X
          </button>

          {/* BannerForm inside Modal */}
          <BannerForm />
        </Modal>

        {/* Recent Alerts Header with Dropdown and Thinner Blue Border */}
        <div className="mb-5 mt-5 flex items-center justify-between px-[26px] border border-blue-500 rounded-lg p-4">
          <h4 className="text-2xl font-bold text-navy-700 dark:text-white">
            View Recent Alerts and Emergencies
          </h4>
          {/* Dropdown for filtering */}
          <select
            className="bg-gray-200 px-4 py-2 rounded-lg"
            onChange={(e) => setFilter(e.target.value)}
            value={filter}
          >
            <option value="">View All</option>
            <option value="Urgent">View Urgent</option>
            <option value="Most Upvoted">View Most Upvoted</option>
          </select>
        </div>

        {/* Render Alert Posts */}
        {getFilteredPosts().map((post, index) => (
          <AlertPost
            key={post.id}
            photo={post.photo}
            header={post.header}
            story={post.story}
            status={post.status}
            statusType={post.statusType}
            onUpvote={() => handleUpvote(index)}
            upvotes={upvotes[index]}
          />
        ))}
      </div>
    </div>
  );
};

export default Marketplace;