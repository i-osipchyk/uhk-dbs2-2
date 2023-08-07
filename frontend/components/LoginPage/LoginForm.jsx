export default function LoginForm({
  signUp,
  loginOption,
  formData,
  handleInputChange,
  handleFormSubmit,
}) {
  return (
    <form>
      <div className='w-[400px] h-[460px] shadow-loginPage border-2 border-white overflow-hidden bg-white flex flex-col'>
        <div className='w-full h-full flex flex-col items-center'>
          {signUp ? (
            <div className={`${loginOption === 'user' && 'flex'} my-auto px-5`}>
              <div
                className={`flex flex-col gap-2 items-center ${
                  loginOption === 'user' &&
                  'pr-5 border-r border-loginPageBorder'
                }`}
              >
                {loginOption === 'user' && (
                  <h1 className='mb-3'>Personal Information</h1>
                )}
                <input
                  type='text'
                  className='loginPageInput'
                  placeholder='First Name'
                  name='firstName'
                  value={formData.firstName ? formData.firstName : ''}
                  onChange={handleInputChange()}
                />
                <input
                  type='text'
                  className='loginPageInput'
                  placeholder='Second Name'
                  name='secondName'
                  value={formData.secondName ? formData.secondName : ''}
                  onChange={handleInputChange()}
                />
                <input
                  type='email'
                  className='loginPageInput'
                  placeholder='Email'
                  name='email'
                  value={formData.email ? formData.email : ''}
                  onChange={handleInputChange()}
                />
                <input
                  type='text'
                  className='loginPageInput'
                  placeholder='Phone Number'
                  name='phoneNumber'
                  value={formData.phoneNumber ? formData.phoneNumber : ''}
                  onChange={handleInputChange()}
                />
                <input
                  type='password'
                  className='loginPageInput'
                  placeholder='Password'
                  name='password'
                  value={formData.password ? formData.password : ''}
                  onChange={handleInputChange()}
                />
                <input
                  type='password'
                  className='loginPageInput'
                  placeholder='Repeat Password'
                  name='repeatPassword'
                  value={formData.repeatPassword ? formData.repeatPassword : ''}
                  onChange={handleInputChange()}
                />
                {loginOption === 'admin' && (
                  <input
                    type='text'
                    className='loginPageInput'
                    placeholder='Admin Code'
                    name='adminCode'
                    value={formData.adminCode ? formData.adminCode : ''}
                    onChange={handleInputChange()}
                  />
                )}
              </div>
              {loginOption === 'user' && (
                <div className='flex flex-col gap-2 items-center pl-5'>
                  <h1 className='mb-3'>Address</h1>
                  <input
                    type='text'
                    className='loginPageInput'
                    placeholder='Country'
                    name='country'
                    value={formData.country ? formData.country : ''}
                    onChange={handleInputChange()}
                  />
                  <input
                    type='text'
                    className='loginPageInput'
                    placeholder='City'
                    name='city'
                    value={formData.city ? formData.city : ''}
                    onChange={handleInputChange()}
                  />
                  <input
                    type='text'
                    className='loginPageInput'
                    placeholder='Street'
                    name='street'
                    value={formData.street ? formData.street : ''}
                    onChange={handleInputChange()}
                  />
                  <input
                    type='text'
                    className='loginPageInput'
                    placeholder='House'
                    name='house'
                    value={formData.house ? formData.house : ''}
                    onChange={handleInputChange()}
                  />
                  <input
                    type='text'
                    className='loginPageInput'
                    placeholder='Postal Code'
                    name='postalCode'
                    value={formData.postalCode ? formData.postalCode : ''}
                    onChange={handleInputChange()}
                  />
                </div>
              )}
            </div>
          ) : (
            <div className='flex flex-col gap-2 items-center my-auto'>
              <input
                type='email'
                className='loginPageInput'
                placeholder='Mail'
                name='email'
                value={formData.email ? formData.email : ''}
                onChange={handleInputChange()}
              />
              <input
                type='password'
                className='loginPageInput'
                placeholder='Password'
                name='password'
                value={formData.password ? formData.password : ''}
                onChange={handleInputChange()}
              />
            </div>
          )}
          <button
            className='p-5 border-t text-loginPageButton border-loginPageBorder hover:bg-loginPageButton hover:text-white hover:border-loginPageButton transitionDuration w-[400px]'
            onClick={handleFormSubmit()}
          >
            {signUp ? 'Sign Up' : 'Sign In'}
          </button>
        </div>
      </div>
    </form>
  )
}
