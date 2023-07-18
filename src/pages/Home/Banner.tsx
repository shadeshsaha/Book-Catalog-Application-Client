import "react-responsive-carousel/lib/styles/carousel.min.css";

import img1 from "../../assets/home/001.jpg";
import img2 from "../../assets/home/002.jpg";
import img3 from "../../assets/home/003.jpg";

import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const Banner = () => {
  return (
    <>
      <Carousel autoPlay={true} infiniteLoop={true} swipeable={true}>
        {/* 1st Image */}
        <div>
          <img src={img1} />
          <div className="absolute h-full flex rounded-xl  md:p-0  py-16 items-center  left-0 top-0 ">
            <div className="text-white md:space-y-7 md:w-2/3 w-full pl-12">
              <h2 className="md:text-5xl text-xl md:mt-0  font-bold">
                {" "}
                <br className="md:flex hidden" />
                <span className="text-pink-500">
                  <span className="text-white">Welcome to</span> PageTurner!
                </span>
                <br />
                Discover a world of stories, knowledge, and inspiration. Start
                your reading adventure now.
              </h2>

              <h6 className="font-bold md:text-sm text-xs text-gray-300">
                Discover a world of books at your fingertips. Our book website
                offers a vast collection of genres, from thrilling mysteries to
                heartwarming romances. Find your next captivating read and
                connect with fellow book lovers.
              </h6>
            </div>
          </div>
        </div>

        {/* 2nd Image */}
        <div>
          <img src={img2} />
          <div className="absolute h-full flex rounded-xl md:p-0  py-16 items-center  left-0 top-0  bg-gradient-to-r from-[#000000] to-[rgba(21,21,21,0)]">
            <div className="text-white md:space-y-7 md:w-2/3 w-full pl-12">
              <h2 className="md:text-5xl text-xl md:mt-0  font-bold">
                {" "}
                <br className="md:flex hidden" />
                <span className="text-green-500">
                  <span className="text-white">
                    {" "}
                    Step into a literary haven at{" "}
                  </span>{" "}
                  PageTurner.
                </span>{" "}
                <br />
                We invite you to immerse yourself in captivating books and
                connect with fellow book enthusiasts. Enjoy your stay!
              </h2>

              <h6 className="font-bold md:text-sm text-xs text-gray-300">
                Welcome to our online book community. Dive into a treasure trove
                of literary wonders, where you can explore new releases,
                timeless classics, and hidden gems. Immerse yourself in the joy
                of reading and engage in lively discussions with fellow
                bookworms.
              </h6>
            </div>
          </div>
        </div>

        {/* 3rd Image */}
        <div>
          <img src={img3} />
          <div className="absolute h-full flex rounded-xl md:p-0  py-16 items-center  left-0 top-0  bg-gradient-to-r from-[#000000] to-[rgba(21,21,21,0)]">
            <div className="text-white md:space-y-7 md:w-2/3 w-full pl-12">
              <h2 className="md:text-5xl text-xl md:mt-0  font-bold">
                {" "}
                <br className="md:flex hidden" />
                <span className="text-yellow-400">
                  <span className="text-white"> Welcome to </span> PageTurner,
                </span>{" "}
                <br />
                where books come alive. Explore our curated collection, find
                your next favorite read, and embark on a literary journey like
                no other. Happy reading!
              </h2>

              <h6 className="font-bold md:text-sm text-xs text-gray-300">
                Unleash your imagination through the power of books. Our book
                website brings together a curated selection of thought-provoking
                stories and insightful non-fiction. Join us to embark on
                literary adventures that will inspire, entertain, and enrich
                your life.
              </h6>
            </div>
          </div>
        </div>
      </Carousel>
    </>
  );
};

export default Banner;
