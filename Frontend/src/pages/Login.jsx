import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { CiUser } from 'react-icons/ci';
import { RiLockPasswordLine } from 'react-icons/ri';
import { parseJwt } from '../model/JwtDecode';
import { toast } from 'react-toastify';
import { MdContacts } from "react-icons/md";

function Login() {
  const [isStudent, setIsStudent] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleLoggedInUser = async () => {
    // e.preventDefault();

    if (localStorage.getItem("token")) {
      const token = localStorage.getItem("token");
      const parse = parseJwt(token);
      if (parse.role == "Student") {
        navigate("/student");
      }
      else if (parse.role == "Faculty") {
        navigate("/faculty");
      }
      else {
        navigate("/");
      }
    }

  }
  // handleLoggedInUser();

  const handleLogin = async (e) => {
    e.preventDefault();
    handleLoggedInUser();
    // console.log(import.meta.env.VITE_DB_HOST);
    try {
      const response = await axios.post('http://' + import.meta.env.VITE_DB_HOST + '/api/login', {
        username,
        password,
      });
      // console.log(response);
      if (response.status === 200) {
        const { token, role } = response.data;
        // console.log(response);
        localStorage.setItem('token', token);
        if (role === 'Student') {

          toast.success("Login Successfully !")
          navigate('/student');
        } else if (role === 'Faculty') {
          toast.success("Login Successfully !")
          navigate('/faculty');
        } else {
          toast.error("Invalid User")
        }
      } else {
        toast.error("Login Failed !")
      }
    } catch (error) {

      toast.error("Invalid User")
    }
  };

  return (
    <>
      <div onLoad={handleLoggedInUser} className=" overflow-hidden flex h-screen flex-row items-center justify-center">
        <div className="shadow-lg flex flex-row overflow-hidden h-full lg:w-1/2">
          <div className="relative hidden lg:block">
            <img src='./images/login_back.png' alt="" className="" />
            <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center bg-primary bg-opacity-100 opacity-80">
              {/* <div className="text-center flex items-center flex-col w-full  justify-center">
                <h1 className="text-7xl text-white font-bold">Logo Here</h1>
                </div> */}
              <center>
                {/* <img src="./images/PlaceStarWhite.png" width={400} alt="" /> */}

                <p className="text-6xl/relaxed left-0 ml-10 text-white font-bold">Welcome <br /> To</p>

                <p className="text-7xl/relaxed left-0 ml-10 text-white font-bold">DEPSTAR Quiz Portal</p>
              </center>
            </div>
          </div>
        </div>

        {/* form */}
        <div className="overflow-y-scroll  bg-white text-secondary h-full lg:w-1/2 w-10/12">
          <div className="flex-row items-center hidden lg:flex md:flex justify-between">
            <img src='./images/image_charusat.png' alt="charusat" className="h-20 m-5" />
            <img src='./images/image_depstar.png' alt="depstar" className="h-20 m-5" />
          </div>
          <div className='flex w-full justify-center items-center'>
            <img src="./images/PlaceStar.png" width={300} alt="" />
          </div>


          <div className='sm:px-20 px-0 mt-4'>
            <h1 className="font-bold text-3xl md:text-4xl mb-6 py-1 my-1 border-b-2">
              Login as a {isStudent ? "Student" : "Faculty"}
            </h1>

            <div className="flex flex-row mb-5">
              <h2
                className={isStudent ? "text-xl font-semibold border-b-4 border-b-primary cursor-pointer" : "text-xl font-semibold cursor-pointer"}
                onClick={() => setIsStudent(true)}
              >
                Student
              </h2>
              <h2
                className={!isStudent ? "text-xl font-semibold ml-5 border-b-4 border-b-primary cursor-pointer" : "text-xl font-semibold ml-5 cursor-pointer"}
                onClick={() => setIsStudent(false)}
              >
                Faculty
              </h2>
            </div>
            <br />
            <form onSubmit={handleLogin} className="flex flex-col w-full">
              <div className="flex flex-col mb-4 relative">
                <label htmlFor="email" className="mb-2 ml-2 flex flex-row place-items-center">
                  <CiUser className='mr-2 size-6' />Username
                </label>
                <input
                  type="text"
                  id="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="username"
                  className="px-4 py-4 border-2 border-slate-300 rounded-full max-w-full focus:border-primary focus:outline-none"
                  required
                />
              </div>
              <br />
              <div className="flex flex-col relative">
                <label htmlFor="Password" className="mb-2 ml-2 flex flex-row place-items-center">
                  <RiLockPasswordLine className='mr-2 size-6' />Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="your password"
                  className="px-4 py-4 border-2 border-slate-300 rounded-full max-w-full focus:border-primary focus:outline-none"
                  required
                />
              </div>

              <div className='flex justify-between items-center gap-3 flex-row-reverse  flex-wrap-reverse'>
                <div className='flex justify-between items-center flex-wrap'>
                  <p>Create a New Account <Link to={"/register-student"} className='text-primary'> Register Now</Link> </p>
                </div>
                <button type="submit" className="self-center w-fit my-6 bg-primary text-light font-medium text-lg px-9 py-3 rounded-full lg:self-end shadow-xl">
                  Login
                </button>
              </div>
            </form>
          <Link to={"/developers"} className=' flex  sm:justify-end justify-start sm:mt-0 mt-10 items-center gap-4  text-xl font-semibold bottom-0 p-2' ><MdContacts /> Contact Us</Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
