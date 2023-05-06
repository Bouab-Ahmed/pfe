import { useState, useEffect, useReducer } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Spinner from "../../components/Spinner";
import { registerUser, reset, sendOtp } from "../../features/auth/authSlice";
import { useLocation } from "react-router-dom";
const adminSecretCode = "admin";

function Register() {
  const location = useLocation();
  const role = location.search.split("=")[1];

  // const [cardId, setCardId] = useState("");
  const [adminRole, setAdminRole] = useState(false);
  const [adminCode, setAdminCode] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCon, setPasswordCon] = useState("");
  const [image, setImage] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  const onSubmit = (e) => {
    e.preventDefault();
    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("password", password);
    myForm.set("passwordCon", passwordCon);
    myForm.set("image", image);
    myForm.set("role", adminRole ? "admin" : role ? role : "reader");

    if (password !== passwordCon) {
      toast.error("Passwords do not match");
    } else {
      if (adminRole && adminCode !== adminSecretCode) {
        toast.error("Invalid admin code");
        return;
      }

      dispatch(registerUser(myForm));
    }
  };

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess) {
      dispatch(reset());
      navigate("/auth/verifyEmail");
      toast.success(message);
    }
    // eslint-disable-next-line
  }, [isError, isSuccess]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <main className="min-w-full flex">
      <div className="flex-1 flex items-center justify-center">
        <div className="w-full max-w-md space-y-8 px-4 bg-white text-gray-600 sm:px-0">
          <div className="">
            <div className="mt-5 space-y-2">
              <h3 className="text-gray-800 text-2xl font-bold sm:text-3xl">
                Register
              </h3>
            </div>
            <div className="mt-5 space-y-2">
              <p className="">
                Already have an account?{" "}
                <a href="/auth/register" className="font-medium text-primary">
                  Sign in
                </a>
              </p>
            </div>
          </div>
          <form onSubmit={onSubmit} className="space-y-5 my-4">
            <div>
              <label className="font-medium">Full Name</label>
              <input
                type="text"
                required
                className="w-full mt-2 px-3 py-2 text-gray-900 bg-transparent outline-none border border-gray-400 focus:border-primary shadow-sm rounded-lg"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <label className="font-medium">Email</label>
              <input
                type="email"
                required
                className="w-full mt-2 px-3 py-2 text-gray-900 bg-transparent outline-none border border-gray-400 focus:border-primary shadow-sm rounded-lg"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label className="font-medium">Password</label>
              <input
                type="password"
                required
                className="w-full mt-2 px-3 py-2 text-gray-900 bg-transparent outline-none border border-gray-400 focus:border-primary shadow-sm rounded-lg"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div>
              <label className="font-medium">Confirm Password</label>
              <input
                type="password"
                required
                className="w-full mt-2 px-3 py-2 text-gray-900 bg-transparent outline-none border border-gray-400 focus:border-primary shadow-sm rounded-lg"
                name="password"
                value={passwordCon}
                onChange={(e) => setPasswordCon(e.target.value)}
              />
            </div>

            <div className="flex items-center gap-1">
              <input
                type="checkbox"
                className="px-3 py-2 bg-transparent outline-none border border-gray-400 focus:border-primary shadow-sm rounded-lg"
                name="admin"
                onChange={(e) => setAdminRole(e.target.checked)}
              />
              <label className="font-medium">Are you an admin</label>
            </div>
            {adminRole && (
              <input
                type="text"
                required
                className="w-full mt-2 px-3 py-2 text-gray-900 bg-transparent outline-none border border-gray-400 focus:border-primary shadow-sm rounded-lg"
                name="adminCode"
                onChange={(e) => setAdminCode(e.target.value)}
              />
            )}

            <div>
              <label className="font-medium">upload your id card</label>
              <input
                type="file"
                required
                className="w-full mt-2 px-3 py-2 text-gray-900 bg-transparent outline-none border border-gray-400 focus:border-primary shadow-sm rounded-lg"
                name="image"
                onChange={(e) => setImage(e.target.files[0])}
              />
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 text-white font-medium bg-primary hover:bg-primary active:bg-primary rounded-lg duration-150"
            >
              Register
            </button>
          </form>
        </div>
      </div>
      <div className="relative flex-1 hidden items-center justify-center h-[91vh] bg-blue-gray-900 lg:flex">
        <div className="relative z-10 w-full max-w-md">
          <img src="https://floatui.com/logo-dark.svg" width={150} alt="" />
          <div className=" mt-16 space-y-3">
            <h3 className="text-white text-3xl font-bold">
              Join the world's best comunity for book lovers
            </h3>
            <p className="text-gray-300">
              Discover the world's best comunity of authors and readers
            </p>
            <div className="flex items-center -space-x-2 overflow-hidden">
              <img
                alt=""
                src="https://randomuser.me/api/portraits/women/79.jpg"
                className="w-10 h-10 rounded-full border-2 border-white"
              />
              <img
                alt=""
                src="https://api.uifaces.co/our-content/donated/xZ4wg2Xj.jpg"
                className="w-10 h-10 rounded-full border-2 border-white"
              />
              <img
                alt=""
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=a72ca28288878f8404a795f39642a46f"
                className="w-10 h-10 rounded-full border-2 border-white"
              />
              <img
                alt=""
                src="https://randomuser.me/api/portraits/men/86.jpg"
                className="w-10 h-10 rounded-full border-2 border-white"
              />
              <img
                alt=""
                src="https://images.unsplash.com/photo-1510227272981-87123e259b17?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=3759e09a5b9fbe53088b23c615b6312e"
                className="w-10 h-10 rounded-full border-2 border-white"
              />
              <p className="text-sm text-gray-400 font-medium translate-x-5">
                Join 5.000+ users
              </p>
            </div>
          </div>
        </div>
        <div
          className="absolute inset-0 my-auto h-[500px]"
          style={{
            background:
              "linear-gradient(152.92deg, rgba(245, 113, 61, 0.2) 4.54%, rgba(245, 113, 61, 0.26) 34.2%, rgba(245, 113, 61, 0.1) 77.55%)",
            filter: "blur(118px)",
          }}
        ></div>
      </div>
    </main>
  );
}

export default Register;
