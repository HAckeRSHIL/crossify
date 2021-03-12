import React, { Component } from "react";
import harshilImg from "assets/img/harshilImg.jpg";
import dhruvilImg from "assets/img/pp3.jpg";
import sagarImg from "assets/img/pp4.jpg";
import bhargavImg from "assets/img/pp5.png";

class Creators extends Component {
  render() {
    return (
      <section className="pt-20 pb-32">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center text-center mb-24">
            <div className="w-full lg:w-6/12 px-4">
              <h2 className="text-4xl text-white font-semibold">
                Here are our heroes
              </h2>
              <p className="text-lg leading-relaxed m-4 text-gray-600">
                Talent wins games, but teamwork and intelligence win
                championships.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap">
            <div className="w-full md:w-6/12 lg:w-3/12 lg:mb-0 mb-12 px-4">
              <div className="px-6">
                <img
                  alt="..."
                  src={harshilImg}
                  className="shadow-lg rounded-full mx-auto max-w-120-px"
                />
                <div className="pt-6 text-center">
                  <h5 className="text-xl font-bold text-offwhite">
                    Harshil Patel
                  </h5>
                  <p className="mt-1 text-sm text-gray-500 uppercase font-semibold">
                    Team Lead & UI/UX Designer
                  </p>
                  <div className="mt-6 text-lg">
                    <button
                      className="bg-linkedin text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                      type="button"
                      onClick={() => {
                        window.open(
                          "https://linkedin.com/in/hackershil",
                          "_blank"
                        );
                        return false;
                      }}
                    >
                      <i className="fab fa-linkedin"></i>
                    </button>
                    <button
                      className="bg-blue-400 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                      type="button"
                      onClick={() => {
                        window.open("https://twitter.com/hackershil", "_blank");
                        return false;
                      }}
                    >
                      <i className="fab fa-twitter"></i>
                    </button>
                    <button
                      className="bg-instagram text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                      type="button"
                      onClick={() => {
                        window.open(
                          "https://instagram.com/hackershil",
                          "_blank"
                        );
                        return false;
                      }}
                    >
                      <i className="fab fa-instagram"></i>
                    </button>
                    <button
                      className="bg-github text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                      type="button"
                      onClick={() => {
                        window.open("https://github.com/hackershil", "_blank");
                        return false;
                      }}
                    >
                      <i class="fab fa-github"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full md:w-6/12 lg:w-3/12 lg:mb-0 mb-12 px-4">
              <div className="px-6">
                <img
                  alt="..."
                  src={dhruvilImg}
                  className="shadow-lg rounded-full mx-auto max-w-120-px"
                />
                <div className="pt-6 text-center">
                  <h5 className="text-xl font-bold text-offwhite">
                    Dhruvil Shah
                  </h5>
                  <p className="mt-1 text-sm text-gray-500 uppercase font-semibold">
                    Backend Dev
                  </p>
                  <div className="mt-6">
                    <button
                      className="bg-red-600 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                      type="button"
                    >
                      <i className="fab fa-google"></i>
                    </button>
                    <button
                      className="bg-blue-600 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                      type="button"
                    >
                      <i className="fab fa-facebook-f"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full md:w-6/12 lg:w-3/12 lg:mb-0 mb-12 px-4">
              <div className="px-6">
                <img
                  alt="..."
                  src={bhargavImg}
                  className="shadow-lg rounded-full mx-auto max-w-120-px"
                />
                <div className="pt-6 text-center">
                  <h5 className="text-xl font-bold text-offwhite">
                    Bhargav Patel
                  </h5>
                  <p className="mt-1 text-sm text-gray-500 uppercase font-semibold">
                    Backend Dev
                  </p>
                  <div className="mt-6">
                    <button
                      className="bg-red-600 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                      type="button"
                    >
                      <i className="fab fa-google"></i>
                    </button>
                    <button
                      className="bg-blue-400 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                      type="button"
                    >
                      <i className="fab fa-twitter"></i>
                    </button>
                    <button
                      className="bg-gray-800 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                      type="button"
                    >
                      <i className="fab fa-instagram"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full md:w-6/12 lg:w-3/12 lg:mb-0 mb-12 px-4">
              <div className="px-6">
                <img
                  alt="..."
                  src={sagarImg}
                  className="shadow-lg rounded-full mx-auto max-w-120-px"
                />
                <div className="pt-6 text-center">
                  <h5 className="text-xl font-bold text-offwhite">
                    Sagar Solanki
                  </h5>
                  <p className="mt-1 text-sm text-gray-500 uppercase font-semibold">
                    UI Designer
                  </p>
                  <div className="mt-6">
                    <button
                      className="bg-pink-500 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                      type="button"
                    >
                      <i className="fab fa-dribbble"></i>
                    </button>
                    <button
                      className="bg-red-600 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                      type="button"
                    >
                      <i className="fab fa-google"></i>
                    </button>
                    <button
                      className="bg-blue-400 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                      type="button"
                    >
                      <i className="fab fa-twitter"></i>
                    </button>
                    <button
                      className="bg-gray-800 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                      type="button"
                    >
                      <i className="fab fa-instagram"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default Creators;