import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const Home = () => {
  let navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/internships");
    }
  });
  return (
    <div>
      <div
        className=" flex flex-row justify-center items-center px-20"
        id="header"
      >
        <div className="basis-1/2 flex justify-center items-center">
          <div
            className=" flex justify-center items-center flex-col"
            style={{ fontFamily: "IBM Plex Mono, monospace" }}
          >
            <div className="tracking-wide" style={{ fontSize: "45px" }}>
              Welcome
            </div>
            <div style={{ fontSize: "35px" }}>To</div>
            <div style={{ fontSize: "35px" }}>InternDekho</div>
          </div>
        </div>
        <div className="basis-1/2 header-image">
          <img
            src="work.svg"
            className="img-fluid animated"
            alt=""
            style={{ height: "600px", width: "600px" }}
          />
        </div>
      </div>
      {/* logos start */}
      <section class="text-gray-600 body-font">
        <div class="container px-5 py-3 mx-auto">
          <marquee class="flex flex-wrap -m-4">
            <div className="flex flex-row">
              <div class="p-4">
                <div class="h-full text-center">
                  <img
                    alt="testimonial"
                    class=" h-20  object-cover object-center rounded-full inline-block border-2 border-gray-200 bg-gray-100"
                    src="https://dummyimage.com/302x302"
                  />
                </div>
              </div>
              <div class="p-4">
                <div class="h-full text-center">
                  <img
                    alt="testimonial"
                    class=" h-20  object-cover object-center rounded-full inline-block border-2 border-gray-200 bg-gray-100"
                    src="https://dummyimage.com/302x302"
                  />
                </div>
              </div>
              <div class="p-4">
                <div class="h-full text-center">
                  <img
                    alt="testimonial"
                    class=" h-20  object-cover object-center rounded-full inline-block border-2 border-gray-200 bg-gray-100"
                    src="https://dummyimage.com/302x302"
                  />
                </div>
              </div>
              <div class="p-4">
                <div class="h-full text-center">
                  <img
                    alt="testimonial"
                    class=" h-20  object-cover object-center rounded-full inline-block border-2 border-gray-200 bg-gray-100"
                    src="https://dummyimage.com/302x302"
                  />
                </div>
              </div>
            </div>
          </marquee>
        </div>
      </section>
      {/* logos start */}
    </div>
  );
};

export default Home;
