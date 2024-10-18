import React, { useState } from "react";
import Modal from 'react-modal';
import BannerForm from "./components/Banner";  
import AlertPost from "./components/AlertPost";
import "./styles.css";

import { data as initialPosts } from "./components/data";

Modal.setAppElement('#root'); // Bind modal to your app's root

const Marketplace = () => {
  const [dummyPosts, setDummyPosts] = useState(initialPosts); // Adjusted for dummy posts
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

  // Handle the submission of a new post
  const handleNewPost = (newPost) => {
    // Prepend the new post to the dummyPosts array
    setDummyPosts([newPost, ...dummyPosts]);
    // Optionally, reset the modal state
    closeModal();
  };

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
          <BannerForm onSubmit={handleNewPost} />
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
