import "react-responsive-carousel/lib/styles/carousel.min.css";

import img1 from "../../assets/home/001.jpg";
import img2 from "../../assets/home/002.jpg";
import img3 from "../../assets/home/003.jpg";

import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const Banner = () => {
  return (
    <>
      <Carousel
        autoPlay={true}
        infiniteLoop={true}
        swipeable={true}
      >
        <div>
          <img src={img1} />
          <div className="absolute h-full flex rounded-xl  md:p-0  py-16 items-center  left-0 top-0 ">
            <div className="text-white md:space-y-7 md:w-2/3 w-full pl-12">
              <h2 className="md:text-5xl text-xl md:mt-0  font-bold">
                {" "}
                <br className="md:flex hidden" />
                <span className="text-pink-500">
                  <span className="text-white">Join the</span> Book Catalog
                  Application !
                </span>
                <br />
                Online Book House
              </h2>

              <h6 className="font-bold md:text-sm text-xs text-gray-300">
                Experience the ultimate book house !! Join us for an enriching
                your mind & Knowledge,
              </h6>
            </div>
          </div>
        </div>
        <div>
          <img src={img2} />
          <div className="absolute h-full flex rounded-xl md:p-0  py-16 items-center  left-0 top-0  bg-gradient-to-r from-[#000000] to-[rgba(21,21,21,0)]">
            <div className="text-white md:space-y-7 md:w-2/3 w-full pl-12">
              <h2 className="md:text-5xl text-xl md:mt-0  font-bold">
                {" "}
                <br className="md:flex hidden" />
                <span className="text-green-500">
                  <span className="text-white">Join the</span> Book Catalog
                  Application !
                </span>{" "}
                <br />
                Online Book House
              </h2>

              <h6 className="font-bold md:text-sm text-xs text-gray-300">
                Experience the ultimate book house !! Join us for an enriching
                your mind & Knowledge,
              </h6>
            </div>
          </div>
        </div>
        <div>
          <img src={img3} />
          <div className="absolute h-full flex rounded-xl md:p-0  py-16 items-center  left-0 top-0  bg-gradient-to-r from-[#000000] to-[rgba(21,21,21,0)]">
            <div className="text-white md:space-y-7 md:w-2/3 w-full pl-12">
              <h2 className="md:text-5xl text-xl md:mt-0  font-bold">
                {" "}
                <br className="md:flex hidden" />
                <span className="text-yellow-400">
                  <span className="text-white">Join the</span> Book Catalog
                  Application !
                </span>{" "}
                <br />
                Online Book House
              </h2>

              <h6 className="font-bold md:text-sm text-xs text-gray-300">
                Experience the ultimate book house !! Join us for an enriching
                your mind & Knowledge,
              </h6>
            </div>
          </div>
        </div>
      </Carousel>

  
    </>
  );
};

export default Banner;
