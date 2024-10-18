import Banner from "./components/Banner";
import NFt2 from "assets/img/nfts/Nft2.png";
import NFt4 from "assets/img/nfts/Nft4.png";
import NFt3 from "assets/img/nfts/Nft3.png";
import NFt5 from "assets/img/nfts/Nft5.png";
import NFt6 from "assets/img/nfts/Nft6.png";
import avatar1 from "assets/img/avatars/avatar1.png";
import avatar2 from "assets/img/avatars/avatar2.png";
import avatar3 from "assets/img/avatars/avatar3.png";
import img1 from "./img1.jpeg";

import tableDataTopCreators from "views/admin/marketplace/variables/tableDataTopCreators.json";
import { tableColumnsTopCreators } from "views/admin/marketplace/variables/tableColumnsTopCreators";
import HistoryCard from "./components/HistoryCard";
import TopCreatorTable from "./components/TableTopCreators";
import NftCard from "components/card/NftCard";
import AlertPost from "./components/AlertPost";
import { useState } from "react";

const Marketplace = () => {
  const dummyPosts = [
    {
      id: 1,
      photo: img1,
      header: "Very ill cat in Kwun Tong",
      story: "I think my neighbour does not take care of their cat and the cat is suffering. It seems to be dying and not eating enough food. HELP!!!",
      status: "Active",
      statusType: "Urgent",  // This will show the red "Urgent" button
    },
    // {
    //   id: 2,
    //   photo: "https://via.placeholder.com/300",
    //   header: "Digital Art Competition",
    //   story: "Join the biggest digital art competition with amazing rewards.",
    //   status: "Closed",
    //   statusType: "General",  // This will show the yellow "General" button
    // },
    {
      id: 2,
      photo: "https://via.placeholder.com/300",
      header: "Dog in Bad Condition",
      story: "There is a dog in my neighborhood that seems to be in bad condition and not taken care of by its owner. It looks malnourished and needs help.",
      status: "Active",
      statusType: "Urgent",  // This will show the red "Urgent" button
    },
  ];

  const [upvotes, setUpvotes] = useState([0, 0, 0]);

  // Handle upvote
  const handleUpvote = (index) => {
    const newUpvotes = [...upvotes];
    newUpvotes[index] += 1;
    setUpvotes(newUpvotes);
  };

  return (
    <div className="mt-3 grid h-full grid-cols-1 gap-5 xl:grid-cols-2 2xl:grid-cols-3">
      <div className="col-span-1 h-fit w-full xl:col-span-1 2xl:col-span-2">
        <div className="mb-5 mt-5 flex items-center justify-between px-[26px]">
            <h4 className="text-2xl font-bold text-navy-700 dark:text-white">
              Make an Alert Post
            </h4>
          </div>
        {/* NFt Banner */}
        <Banner />

        {/* NFt Header */}
        {/* <div className="mb-4 mt-5 flex flex-col justify-between px-4 md:flex-row md:items-center">
          <h4 className="ml-1 text-2xl font-bold text-navy-700 dark:text-white">
            Trending NFTs
          </h4>
          <ul className="mt-4 flex items-center justify-between md:mt-0 md:justify-center md:!gap-5 2xl:!gap-12">
            <li>
              <a
                className="text-base font-medium text-brand-500 hover:text-brand-500 dark:text-white"
                href=" "
              >
                Art
              </a>
            </li>
            <li>
              <a
                className="text-base font-medium text-brand-500 hover:text-brand-500 dark:text-white"
                href=" "
              >
                Music
              </a>
            </li>
            <li>
              <a
                className="text-base font-medium text-brand-500 hover:text-brand-500 dark:text-white"
                href=" "
              >
                Collection
              </a>
            </li>
            <li>
              <a
                className="text-base font-medium text-brand-500 hover:text-brand-500 dark:text-white"
                href=" "
              >
                <a href=" ">Sports</a>
              </a>
            </li>
          </ul>
        </div> */}

        {/* NFTs trending card */}
        {/* <div className="z-20 grid grid-cols-1 gap-5 md:grid-cols-3">
          <NftCard
            bidders={[avatar1, avatar2, avatar3]}
            title="Abstract Colors"
            author="Esthera Jackson"
            price="0.91"
            image={NFt3}
          />
          <NftCard
            bidders={[avatar1, avatar2, avatar3]}
            title="ETH AI Brain"
            author="Nick Wilson"
            price="0.7"
            image={NFt2}
          />
          <NftCard
            bidders={[avatar1, avatar2, avatar3]}
            title="Mesh Gradients"
            author="Will Smith"
            price="2.91"
            image={NFt4}
          />
        </div> */}

        {/* Recenlty Added setion */}
        <div className="mb-5 mt-5 flex items-center justify-between px-[26px]">
          <h4 className="text-2xl font-bold text-navy-700 dark:text-white">
            View Recent Alerts and Emergencies
          </h4>
        </div>

      {dummyPosts.map((post, index) => (
        <AlertPost
          key={post.id}
          photo={post.photo}
          header={post.header}
          story={post.story}
          status={post.status}
          statusType={post.statusType}  // Pass "Urgent" or "General"
          onUpvote={() => handleUpvote(index)}
          upvotes={upvotes[index]}
        />
      ))}
      </div>

      {/* right side section */}

      {/* <div className="col-span-1 h-full w-full rounded-xl 2xl:col-span-1">
        <TopCreatorTable
          extra="mb-5"
          tableData={tableDataTopCreators}
          columnsData={tableColumnsTopCreators}
        />
        <HistoryCard />
      </div> */}
    </div>
  );
};

export default Marketplace;
