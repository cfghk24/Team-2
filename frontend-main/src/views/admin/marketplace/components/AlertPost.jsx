import React from "react";

const AlertPost = ({ photo, header, story, status, statusType, onUpvote, upvotes }) => {
  // Determine the color of the status type button based on the statusType prop
  const statusTypeStyles = {
    Urgent: "bg-red-500 text-white",
    General: "bg-yellow-500 text-black",
  };

  return (
    <div className="relative flex flex-row items-start justify-between rounded-[20px] bg-white shadow-lg p-8 max-w-[900px] h-64">
      {/* Right side: User Uploaded Photo */}
      <div className="w-1/3 mr-5"> {/* Adjust margin to move it more to the left */}
        {photo ? (
          <img
            src={photo}
            alt="Uploaded Post"
            className="w-full h-40 object-cover rounded-lg"  // Increased image height
          />
        ) : (
          <div className="w-full h-40 bg-gray-200 rounded-lg flex items-center justify-center">
            <span className="text-gray-500">No photo uploaded</span>
          </div>
        )}
      </div>

      {/* Left side: Header and Story */}
      <div className="flex flex-col w-2/3">
        {/* Post Header */}
        <h4 className="text-2xl font-bold text-navy-700 mb-3">{header}</h4>

        {/* Post Story */}
        <p className="text-base text-gray-700 mb-4">{story}</p>

        {/* Upvote Button (Bottom Left) */}
        <div className="flex items-center">
          <button
            onClick={onUpvote}
            className="text-sm px-4 py-2 bg-green-500 text-white rounded-lg"
          >
            Upvote {upvotes}
          </button>
        </div>
      </div>

      {/* Status Buttons (Top Right) */}
      <div className="absolute top-3 right-3 flex gap-2">
        {/* Active Status Button */}
        <button className="text-sm px-4 py-2 bg-blue-500 text-white rounded-lg">
          {status}
        </button>

        {/* Urgent/General Button */}
        <button className={`text-sm px-4 py-2 rounded-lg ${statusTypeStyles[statusType]}`}>
          {statusType}
        </button>
      </div>
    </div>
  );
};

export default AlertPost;
