import React from "react";

const NftCard = ({ title, author, price, image, setCredit }) => {
  const handlePurchase = () => {
    setCredit(prevCredit => prevCredit - price);
  };

  return (
    <div className="border rounded-lg p-4">
      <img src={image} alt={title} className="w-full h-40 object-cover mb-4" />
      <h5 className="text-lg font-bold">{title}</h5>
      <p className="text-sm text-gray-600">{author}</p>
      <p className="text-sm text-gray-600">Price: {price}</p>
      <button
        onClick={handlePurchase}
        className="mt-2 w-full bg-blue-500 text-white py-2 rounded"
      >
        Buy Now
      </button>
    </div>
  );
};

export default NftCard;