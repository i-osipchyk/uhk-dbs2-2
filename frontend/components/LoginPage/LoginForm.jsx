export default function LoginForm({
  signUp,
  loginOption,
  formData,
  handleInputChange,
  handleFormSubmit,
  repeatPassword,
  setRepeatPassword,
  errorMessage,
}) {
  return (
    <form>
      <div className='w-[400px] h-[460px] shadow-loginPage border-2 border-white overflow-hidden bg-white flex flex-col'>
        <div className='w-full h-full flex flex-col items-center'>
          {signUp ? (
            <div
              className={`${loginOption === 'customer' && 'flex'} my-auto px-5`}
            >
              <div
                className={`flex flex-col gap-2 items-center ${
                  loginOption === 'customer' &&
                  'pr-5 border-r border-darkerOrange'
                }`}
              >
                {loginOption === 'customer' && (
                  <h1 className='mb-3'>Personal Information</h1>
                )}
                <input
                  type='text'
                  className='loginPageInput'
                  placeholder='First Name'
                  name='first_name'
                  value={formData.first_name ? formData.first_name : ''}
                  onChange={handleInputChange()}
                />
                <input
                  type='text'
                  className='loginPageInput'
                  placeholder='Last Name'
                  name='last_name'
                  value={formData.last_name ? formData.last_name : ''}
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
                  name='phone_number'
                  value={formData.phone_number ? formData.phone_number : ''}
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
                  value={repeatPassword}
                  onChange={(e) => setRepeatPassword(e.target.value)}
                />
                {loginOption === 'admin' && (
                  <input
                    type='text'
                    className='loginPageInput'
                    placeholder='Reference Code'
                    name='reference_code'
                    value={
                      formData.reference_code ? formData.reference_code : ''
                    }
                    onChange={handleInputChange()}
                  />
                )}
              </div>
              {loginOption === 'customer' && (
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
                    placeholder='House Number'
                    name='house_number'
                    value={formData.house_number ? formData.house_number : ''}
                    onChange={handleInputChange()}
                  />
                  <input
                    type='text'
                    className='loginPageInput'
                    placeholder='Postal Code'
                    name='postal_code'
                    value={formData.postal_code ? formData.postal_code : ''}
                    onChange={handleInputChange()}
                  />
                </div>
              )}
              <p className='text-mainOrange h-[22.5px]'>{errorMessage}</p>
            </div>
          ) : (
            <div className='flex flex-col gap-2 items-center my-auto'>
              <input
                type='email'
                className='loginPageInput'
                placeholder='Email'
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
              <p className='text-mainOrange h-[22.5px]'>{errorMessage}</p>
            </div>
          )}

          <button
            className='p-5 border-t text-mainOrange border-darkerOrange hover:bg-mainOrange hover:text-white hover:border-mainOrange transitionDuration w-[400px]'
            onClick={handleFormSubmit()}
          >
            {signUp ? 'Sign Up' : 'Sign In'}
          </button>
        </div>
      </div>
    </form>
  )
}
