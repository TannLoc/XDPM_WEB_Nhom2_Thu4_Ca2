const Login = () => {
  return (
    <div className="w-[360px]">
      <form>
        <div className="flex items-center border-b border-primary">
          <i className="inline-block px-2 text-3xl bi bi-person text-primary"></i>
          <input
            name="phoneNumber"
            type="text"
            className="flex-1 p-2 text-lg bg-transparent border-l text-primary focus:outline-none border-primary"
            placeholder="Phone number"
          />
        </div>

        <div className="flex items-center mt-5 border-b border-primary">
          <i className="inline-block px-2 text-3xl bi bi-key text-primary"></i>
          <input
            name="password"
            type="password"
            className="flex-1 p-2 text-lg bg-transparent border-l text-primary focus:outline-none border-primary"
            placeholder="Password"
          />
        </div>

        <div>
          <button
            className="w-full h-12 mt-10 text-xl text-white rounded-lg bg-primary"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login