import React, { useState, useEffect } from "react";
import InternshipCard from "../Cards/InternshipCard";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import axios from "axios";
import { collection, addDoc, getFirestore, getDocs } from "firebase/firestore";
import fb from "../utils/firebase";
import MultiSelect from "react-multiple-select-dropdown-lite";
import "react-multiple-select-dropdown-lite/dist/index.css";

const SideNav = () => {
  const db = getFirestore(fb);
  const [multipleSelectValuesOption, setMultipleSelectValuesOption] =
    useState("");
  const [
    multipleSelectValuesOptionLocation,
    setMultipleSelectValuesOptionLocation,
  ] = useState("");
  // console.log(multipleSelectValuesOption)
  const [sidenav, setSidenav] = useState(1);
  const [internships, setInternships] = useState([]);
  useEffect(() => {
    getInternships();
  }, []);
  const getInternships = async () => {
    await axios
      .get("http://localhost:4000/browseAll")
      .then(function (response) {
        // handle success
        setInternships(response?.data?.data);
        console.log(response?.data?.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  };
  const getInternshipsInternshala = async () => {
    await axios
      .get("http://localhost:4000/internshala/software%20engineer")
      .then(function (response) {
        // handle success
        setInternships(response?.data?.data);
        console.log(response?.data?.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  };
  const getInternshipsLinkedin = async () => {
    await axios
      .get("http://localhost:4000/linkedin/software%20engineer")
      .then(function (response) {
        // handle success
        setInternships(response?.data?.data);
        console.log(response?.data?.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  };
  const getInternshipsNaukri = async () => {
    await axios
      .get("http://localhost:4000/naukri/software%20engineer")
      .then(function (response) {
        // handle success
        setInternships(response?.data?.data);
        console.log(response?.data?.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  };
  const getInternshipsIndeed = async () => {
    await axios
      .get("http://localhost:4000/indeed/software%20engineer")
      .then(function (response) {
        // handle success
        setInternships(response?.data?.data);
        console.log(response?.data?.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  };

  const handleOnchange = (val) => setMultipleSelectValuesOption(val);
  const handleOnchangeLocation = (val) =>
    setMultipleSelectValuesOptionLocation(val);

  const multiSelectTag = [
    {
      label: "Software Engineer",
      value: "Software Engineer",
    },
    {
      label: "Backend Development Intern",
      value: "Backend Development Intern",
    },
    {
      label: "Frontend Development Intern",
      value: "Frontend Development Intern",
    },
    {
      label: "Mobile Development Intern",
      value: "Mobile Development Intern",
    },
  ];
  const multiSelectTagLocation = [
    {
      label: "Work From Home",
      value: "Work From Home",
    },
    {
      label: "India",
      value: "India",
    },
    {
      label: "Mumbai",
      value: "Mumbai",
    },
    {
      label: "Banglore",
      value: "Banglore",
    },
    {
      label: "Hydrebad",
      value: "Hydrebad",
    },
  ];

  const getSavedInternships = async () => {
    let user = JSON.parse(localStorage.getItem("user"));
    if (user.email) {
      const querySnapshot = await getDocs(collection(db, user.email));
      let arr = [];
      querySnapshot.forEach((doc) => {
        arr.push({ ...doc.data(), docID: doc.id });
      });
      console.log(arr);
      setInternships(arr);
    } else {
      alert("Please Login to view saved internships");
    }
  };

  const saveInternship = async (internship) => {
    let user = JSON.parse(localStorage.getItem("user"));
    if (user.email) {
      await addDoc(collection(db, user.email), {
        ...internship,
      });
    }
  };

  return (
    <div className="pt-14  md:pl-20 md:pr-20 pr-3 pl-3">
      <div>
        <div className="text-2xl md:text-3xl  font-medium">
          Search For Internships
        </div>
      </div>
      <div className="flex flex-row gap-5 pt-6 pb-2 flex-wrap ">
        <div
          className=" hover:bg-navOrange text-base p-2 rounded-md font-medium cursor-pointer"
          onClick={() => {
            setSidenav(1);
            getInternships();
          }}
          style={{ backgroundColor: sidenav === 1 ? "#F6A92E" : "white" }}
        >
          Browse All
        </div>
        <div
          className=" hover:bg-navOrange text-base p-2 rounded-md font-medium cursor-pointer"
          onClick={() => {
            setSidenav(2);
            getInternshipsInternshala();
          }}
          style={{ backgroundColor: sidenav === 2 ? "#F6A92E" : "white" }}
        >
          Internshala
        </div>
        <div
          className=" hover:bg-navOrange text-base p-2 rounded-md font-medium cursor-pointer"
          onClick={() => {
            setSidenav(3);
            getInternshipsLinkedin();
          }}
          style={{ backgroundColor: sidenav === 3 ? "#F6A92E" : "white" }}
        >
          Linked In
        </div>
        <div
          className=" hover:bg-navOrange text-base p-2 rounded-md font-medium cursor-pointer"
          onClick={() => {
            setSidenav(4);
            getInternshipsIndeed();
          }}
          style={{ backgroundColor: sidenav === 4 ? "#F6A92E" : "white" }}
        >
          Indeed
        </div>
        <div
          className=" hover:bg-navOrange text-base p-2 rounded-md font-medium cursor-pointer"
          onClick={() => {
            setSidenav(5);
            getInternshipsNaukri();
          }}
          style={{ backgroundColor: sidenav === 5 ? "#F6A92E" : "white" }}
        >
          Naukri
        </div>
        <div
          className=" hover:bg-navOrange text-base p-2 rounded-md font-medium cursor-pointer"
          onClick={() => {
            setSidenav(6);
            getSavedInternships();
          }}
          style={{ backgroundColor: sidenav === 6 ? "#F6A92E" : "white" }}
        >
          Saved Internships
        </div>
      </div>
      <hr></hr>
      <div className="flex p-3 gap-2 flex-col sm:flex-row">
        <div
          className="basis-1/4 flex items-center  flex-col p-3 gap-2"
          style={{
            transition: "box-shadow .25s, -webkit-box-shadow .25s",
            boxShadow:
              " 0 2px 2px 0 rgba(0,0,0,0.14),0 3px 1px -2px rgba(0,0,0,0.12),0 1px 5px 0 rgba(0,0,0,0.2)",
          }}
        >
          <div className="font-bold">
            {/* <FilterAltOutlinedIcon /> */}
            Filter
          </div>
          <div className="flex flex-col mt-9">
            <div className=" flex items-center justify-start font-semibold">
              Category
            </div>
            <MultiSelect
              style={{ border: "none" }}
              className="multi-select"
              onChange={handleOnchange}
              options={multiSelectTag}
            />
            {/* <input
              className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
              placeholder="Search for anything..."
            /> */}
          </div>
          <div className="flex flex-col mt-4">
            <div className=" flex items-center justify-start font-semibold">
              Location
            </div>
            <MultiSelect
              style={{ border: "none" }}
              className="multi-select"
              onChange={handleOnchange}
              options={multiSelectTagLocation}
            />
            {/* <input
              className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
              placeholder="Search for anything..."
            /> */}
          </div>
        </div>
        <div className="basis-3/4 max-h-96  flex flex-col gap-6 scrollbar-thin scrollbar-thumb-navOrange pr-3 scrollbar-track-orange-100 overflow-y-scroll">
          {internships.map((i) => {
            return (
              <InternshipCard
                currValue={sidenav}
                docID={i?.docID}
                site={i?.site}
                title={i?.title}
                salary={i?.stipend}
                location={i?.location}
                company={i?.companyName}
                link={i?.link}
                description={i?.description}
                getSavedInternships={getSavedInternships}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SideNav;
