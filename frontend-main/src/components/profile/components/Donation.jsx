import Card from "components/card";
import React from "react";
import TimelineComponent from "./Timeline";

const Donation = () => {
  return (
    <Card extra={"w-full h-full p-3"}>
      {/* Header */}
      <div className="mt-2 mb-8 w-full">
        <h4 className="px-2 text-xl font-bold text-navy-700 dark:text-white">
          Your Donation
        </h4>
        <p className="mt-2 px-2 text-base text-gray-600">
        Your support today can make a lasting impact. Every contribution, big or small, brings us one step closer to animal rescue. 
        Together, we can change lives, create hope, and make a difference.
        </p>
      </div>
      {/* Cards */}
      <div className="grid grid-cols-2 gap-4 px-2">
        <TimelineComponent />
      </div>
    </Card>
  );
};

export default Donation;
