export default function LoginMethod({
  loginOption,
  setUserLoginOption,
  setAdminLoginOption,
  signUp,
  setSignUp,
  setSignin,
}) {
  return (
    <div className='w-[400px] flex flex-col shadow-loginPage bg-white border-2 border-white overflow-hidden text-loginPageButton'>
      <div className='flex items-center justify-center h-[70px] w-full'>
        <button
          className={`w-full h-full border-b-2 transitionDuration ${
            loginOption === 'user'
              ? 'bg-loginPageButton text-white border-white'
              : 'border-loginPageButton bg-white'
          } ${loginOption === 'user' && signUp && 'border-loginPageButton'}`}
          onClick={setUserLoginOption}
        >
          User
        </button>
        <button
          className={`w-full h-full border-b-2 transitionDuration ${
            loginOption === 'admin'
              ? 'bg-loginPageButton text-white border-white'
              : 'border-loginPageButton bg-white'
          } ${loginOption === 'admin' && !signUp && 'border-loginPageButton'}`}
          onClick={setAdminLoginOption}
        >
          Admin
        </button>
      </div>
      <div className='flex items-center justify-center h-[70px] w-full'>
        <button
          className={`w-full h-full transitionDuration ${
            !signUp
              ? 'bg-loginPageButton text-white border-white'
              : 'border-loginPageButton bg-white'
          }`}
          onClick={setSignin}
        >
          Sign In
        </button>
        <button
          className={`w-full h-full transitionDuration ${
            signUp
              ? 'bg-loginPageButton text-white border-white'
              : 'border-loginPageButton bg-white'
          }`}
          onClick={setSignUp}
        >
          Sign Up
        </button>
      </div>
    </div>
  )
}
