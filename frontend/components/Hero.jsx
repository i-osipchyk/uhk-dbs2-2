export default function Hero() {
  return (
    <div className='w-full h-[450px] flex mt-[25px]'>
      <div className='flex flex-col h-full items-center justify-center'>
        <div className='flex flex-col items-start text-[14px]'>
          <h1 className='text-[50px] font-[700] mb-[12.5px]'>
            25% OFF EVERYTHING
          </h1>
          <p>Friends & Family Days</p>
          <p>
            Use code <span className='font-[700]'>FF2023</span> at checkout
          </p>
          <button className='mt-[50px] text-[20px] font-[700] w-[250px] h-[68px] rounded-full bg-mainOrange text-white'>
            SHOP NOW
          </button>
        </div>
      </div>
      <img src='/hero.png' alt='hero' className='h-full' />
    </div>
  )
}
