import React, { useState } from "react";
import Card from "components/card";
import NftCard from "components/card/NftCard";
import NFt1 from "../assets/Nft1.png";
import NFt2 from "../assets/Nft2.png";
import NFt3 from "../assets/Nft3.png";
import avatar1 from "assets/img/avatars/avatar1.png";
import avatar2 from "assets/img/avatars/avatar2.png";
import avatar3 from "assets/img/avatars/avatar3.png";

const Project = () => {
  let [credit, setCredit] = useState(200);

  return (
    <Card extra={"w-full p-4 h-full"}>
      <div className="flex flex-col items-center justify-center">
        <p className="text-2xl font-bold text-navy-700 dark:text-white">
          Credits {credit}
        </p>
      </div>
      <div className="mb-8 w-full">
        <h4 className="text-xl font-bold text-navy-700 dark:text-white">
          E-shops
        </h4>
        <p className="mt-2 text-base text-gray-600">
          Here you can find more details about your projects. Keep your user
          engaged by providing meaningful information.
        </p>
      </div>
      <div className="z-20 grid grid-cols-1 gap-5 md:grid-cols-3">
        <NftCard
          bidders={[avatar1, avatar2, avatar3]}
          title="Dog Wash Shampoo"
          author="180 Wong Chuk Hang Road, Aberdeen, Hong Kong"
          price="247"
          image={NFt1}
          setCredit={setCredit}
        />
        <NftCard
          bidders={[avatar1, avatar2, avatar3]}
          title="Automatic Cat Feeder"
          author="1 Matheson Street, Causeway Bay, Hong Kong"
          price="468"
          image={NFt2}
          setCredit={setCredit}
        />
        <NftCard
          bidders={[avatar1, avatar2, avatar3]}
          title="Portable Water Bottle for Dogs"
          author="Hong Kong Island, and southern shore of Kowloon"
          price="3478"
          image={NFt3}
          setCredit={setCredit}
        />
      </div>
    </Card>
  );
};

export default Project;