import React, { useEffect, useState } from "react";
import axios from "axios";
import PulseLoader from "react-spinners/PulseLoader";
import City from "../../views/auth/states-and-districts.json";
import $ from "jquery";
import MultipleSelect from "components/Inputs/MultiSelect";
export default function CardSettings() {
  const token = localStorage.getItem("jwt");
  const [statename, setStateName] = useState("");
  const [category, setCategory] = useState([]);
  const [loading, setloading] = useState(false);
  const [submitted, isSubmitting] = useState(false);
  const [cityname, setCityName] = useState("");
  const [photo, setPhoto] = useState("");
  const [formData, SetformData] = useState({
    username: "",
    email: "",
    fname: "",
    lname: "",
    address: "",
    postalcode: "",
    about_me: "",
    occupation: "",
    oldPhoto: "",
  });

  const {
    username,
    email,
    fname,
    lname,
    address,
    postalcode,
    about_me,
    occupation,
    oldPhoto,
  } = formData;

  const onChange = (e) =>
    SetformData({ ...formData, [e.target.name]: e.target.value });

  var districts = [];
  if (statename !== "" && statename) {
    const citylist = City.states.find((city) => city.state === statename);
    districts = citylist.districts;
  }

  const handleCategory = (childData) => {
    setCategory(childData);
  };

  useEffect(() => {
    async function fetchData() {
      const config = {
        method: "POST",
        header: {
          "Content-Type": "application/json",
        },
      };
      var object = {
        token: token,
      };
      const finaldata = await axios.post(
        "/api/profile/get-profile-user",
        object,
        config
      );
      if (finaldata.data.is_error) {
        console.log(finaldata.data.message);
      } else {
        SetformData({
          username: finaldata.data.data.username,
          email: finaldata.data.data.email,
          fname: finaldata.data.data.fname,
          lname: finaldata.data.data.lname,
          address: finaldata.data.data.address,
          postalcode: finaldata.data.data.pincode,
          about_me: finaldata.data.data.about_me,
          occupation: finaldata.data.data.occupation,
          oldPhoto: finaldata.data.data.profile_photo,
        });
        setPhoto(finaldata.data.data.profile_photo)
        setStateName(finaldata.data.data.state);
        setCityName(finaldata.data.data.city);
        setCategory(finaldata.data.data.category_data);
        setTimeout(() => {
          setloading(true);
        }, 300);
      }
    }

    fetchData();
    function readURL(input) {
      if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
          $("#imagePreview").css(
            "background-image",
            "url(" + e.target.result + ")"
          );
          $("#imagePreview").hide();
          $("#imagePreview").fadeIn(650);
        };
        reader.readAsDataURL(input.files[0]);
      }
    }
    $("#imageUpload").change(function () {
      readURL(this);
    });
  }, [token]);

  const onSubmit = async (e) => {
    e.preventDefault();
    isSubmitting(true);
    if (photo !== oldPhoto) {
      var url = "https://api.cloudinary.com/v1_1/crossify/image/upload/";
      var path = "User_Profile/" + photo.name;
      var data = new FormData();
      data.append("file", photo);
      data.append("upload_preset", "crossify-project");
      data.append("public_id", path);
      const config = {
        headers: { "X-Requested-With": "XMLHttpRequest" },
      };
      axios
        .post(url, data, config)
        .then(async (res) => {
          var object = {
            username,
            fname,
            lname,
            email,
            address,
            city: cityname,
            state: statename,
            about_me,
            pincode: postalcode,
            occupation,
            token,
            category,
            photo: res.data.url,
          };
          const config = {
            method: "POST",
            header: {
              "Content-Type": "application/json",
            },
          };
          const finaldata = await axios.post(
            "/api/profile/update-user",
            object,
            config
          );
          if (finaldata.data.is_error) {
            console.log(finaldata.data.message);
          } else {
            window.location.reload();
          }
        });
    }
    else {
      var object = {
        username,
        fname,
        lname,
        email,
        address,
        city: cityname,
        state: statename,
        about_me,
        pincode: postalcode,
        occupation,
        token,
        category,
        photo:oldPhoto
      };
      const config = {
        method: "POST",
        header: {
          "Content-Type": "application/json",
        },
      };
      const finaldata = await axios.post(
        "/api/profile/update-user",
        object,
        config
      );
      if (finaldata.data.is_error) {
        console.log(finaldata.data.message);
      } else {
        window.location.reload();
      }
    }
  };
  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-200 border-0">
        <div className="rounded-t bg-white mb-0 px-6 py-6">
          <div className="text-center flex justify-between">
            <h6 className="text-gray-800 text-xl font-bold">My account</h6>
            {submitted ? (
              <PulseLoader color="#48bb78" size={10} />
            ) : (
              <button
                className="bg-green-500 text-white active:bg-blue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                type="button"
                onClick={(e) => onSubmit(e)}
              >
                Save &nbsp; <i className="fas fa-save"></i>
              </button>
            )}
          </div>
        </div>
        <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
          <form>
            <h6 className="text-gray-500 text-sm mt-3 mb-6 font-bold uppercase">
              User Information
            </h6>
            <div className="flex flex-wrap">
              <div className="px-4 mt-6">
                <div class="avatar-upload">
                  <div class="avatar-edit">
                    <input
                      type="file"
                      id="imageUpload"
                      accept=".png, .jpg, .jpeg"
                      onChange={(e) => setPhoto(e.target.files[0])}
                    />
                    <label for="imageUpload">
                      <i class="fas fa-pen ml-2  text-sm"></i>
                    </label>
                  </div>
                  <div className="avatar-preview">
                    <div
                      id="imagePreview"
                      style={{
                        backgroundImage: "url(" + photo + ")",
                      }}
                    ></div>
                  </div>
                </div>
              </div>
              <div className="w-full lg:w-10/12 flex flex-wrap">
                <div className="w-full lg:w-6/12 px-4">
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-gray-700 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      First Name
                    </label>
                    <input
                      type="text"
                      className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                      defaultValue="Lucky"
                      name="fname"
                      value={fname}
                      onChange={(e) => onChange(e)}
                    />
                  </div>
                </div>
                <div className="w-full lg:w-6/12 px-4">
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-gray-700 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Last Name
                    </label>
                    <input
                      type="text"
                      className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                      defaultValue="Jesse"
                      name="lname"
                      value={lname}
                      onChange={(e) => onChange(e)}
                    />
                  </div>
                </div>
                <div className="w-full lg:w-6/12 px-4">
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-gray-700 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Username
                    </label>
                    <input
                      type="text"
                      className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                      defaultValue="lucky.jesse"
                      name="username"
                      value={username}
                      onChange={(e) => onChange(e)}
                    />
                  </div>
                </div>
                <div className="w-full lg:w-6/12 px-4">
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-gray-700 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Email address
                    </label>
                    <input
                      type="email"
                      className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                      defaultValue="jesse@example.com"
                      name="email"
                      value={email}
                      onChange={(e) => onChange(e)}
                      readOnly={true}
                    />
                  </div>
                </div>
              </div>
            </div>

            <hr className="mt-6 border-b-1 border-gray-400" />

            <h6 className="text-gray-500 text-sm mt-3 mb-6 font-bold uppercase">
              Contact Information
            </h6>
            <div className="flex flex-wrap">
              <div className="w-full lg:w-12/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-gray-700 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Address
                  </label>
                  <input
                    type="text"
                    className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                    defaultValue="Bld Mihail Kogalniceanu, nr. 8 Bl 1, Sc 1, Ap 09"
                    name="address"
                    value={address}
                    onChange={(e) => onChange(e)}
                  />
                </div>
              </div>
              <div className="w-full lg:w-4/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-gray-700 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    State
                  </label>
                  <select
                    id="reg-state"
                    name="state"
                    autoComplete="state"
                    className="w-full rounded py-3 px-3 text-gray-700 bg-white shadow focus:outline-none focus:shadow-outline text-sm ease-linear transition-all duration-150"
                    onChange={(e) => setStateName(e.target.value)}
                    value={statename}
                  >
                    {City.states.map((city) => (
                      <option value={city.state} key={city.state}>
                        {city.state}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="w-full lg:w-4/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-gray-700 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    City
                  </label>
                  <select
                    id="reg-city"
                    name="city"
                    autoComplete="city"
                    className="w-full rounded py-3 px-3 text-gray-700 bg-white shadow focus:outline-none focus:shadow-outline text-sm ease-linear transition-all duration-150"
                    onChange={(e) => setCityName(e.target.value)}
                    value={cityname}
                  >
                    {districts.map((element) => (
                      <option value={element} key={element}>
                        {element}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="w-full lg:w-4/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-gray-700 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Postal Code
                  </label>
                  <input
                    type="text"
                    className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                    defaultValue="Postal Code"
                    name="postalcode"
                    value={postalcode}
                    onChange={(e) => onChange(e)}
                  />
                </div>
              </div>
            </div>

            <hr className="mt-6 border-b-1 border-gray-400" />

            <h6 className="text-gray-500 text-sm mt-3 mb-6 font-bold uppercase">
              About Me
            </h6>
            <div className="flex flex-wrap">
              <div className="w-full lg:w-12/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-gray-700 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Occupation
                  </label>
                  <input
                    type="text"
                    className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                    name="occupation"
                    value={occupation}
                    onChange={(e) => onChange(e)}
                  />
                </div>
              </div>
              <div className="w-full lg:w-12/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-gray-700 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Interests
                  </label>
                  {loading ? (
                    <MultipleSelect
                      selectedValues={category}
                      parentCallback={handleCategory}
                    />
                  ) : (
                    ""
                  )}
                </div>
              </div>
              <div className="w-full lg:w-12/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-gray-700 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    About me
                  </label>
                  <textarea
                    type="text"
                    className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                    rows="4"
                    name="about_me"
                    value={about_me}
                    onChange={(e) => onChange(e)}
                  ></textarea>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
