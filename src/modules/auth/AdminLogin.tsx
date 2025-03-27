const LoginModal = () => {
  return (
    <form>
      <div className="flex items-center border-b-2 border-white">
        <i className="inline-block px-2 text-3xl text-white bi bi-person"></i>
        <input
          name="username"
          type="text"
          className="flex-1 p-2 text-lg text-white bg-transparent border-l-2 border-white focus:outline-none"
          placeholder="Username"
        />
      </div>

      <div className="flex items-center mt-5 border-b-2 border-white">
        <i className="inline-block px-2 text-3xl text-white bi bi-key"></i>
        <input
          name="password"
          type="password"
          className="flex-1 p-2 text-lg text-white bg-transparent border-l-2 border-white focus:outline-none"
          placeholder="Password"
        />
      </div>

      <div>
        <button
          className="w-full h-12 mt-10 text-xl bg-white rounded-full"
        >
          Login
        </button>
      </div>
    </form>
  );
};

export default LoginModal;
