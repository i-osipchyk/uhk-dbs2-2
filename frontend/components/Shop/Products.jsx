import ShowFilterPanelButton from './ShowFilterPanelButton'

export default function Products({ isFilterPanelOpen, setIsFilterPanelOpen }) {
  return (
    <div className='h-full flex-1 overflow-scroll'>
      <div className='w-[50px] h-[50px] absolute'>
        {!isFilterPanelOpen && (
          <ShowFilterPanelButton
            isFilterPanelOpen={isFilterPanelOpen}
            setIsFilterPanelOpen={setIsFilterPanelOpen}
          />
        )}
      </div>
      <div className='w-full h-fit p-[50px] flex items-top justify-center bg-black'>
        <div
          className={`grid ${
            isFilterPanelOpen ? 'grid-cols-3' : 'grid-cols-4'
          } gap-[20px]`}
        >
          <div className='w-[300px] h-[300px] bg-white'></div>
          <div className='w-[300px] h-[300px] bg-white'></div>
          <div className='w-[300px] h-[300px] bg-white'></div>
          <div className='w-[300px] h-[300px] bg-white'></div>
          <div className='w-[300px] h-[300px] bg-white'></div>
          <div className='w-[300px] h-[300px] bg-white'></div>
          <div className='w-[300px] h-[300px] bg-white'></div>
          <div className='w-[300px] h-[300px] bg-white'></div>
          <div className='w-[300px] h-[300px] bg-white'></div>
          <div className='w-[300px] h-[300px] bg-white'></div>
          <div className='w-[300px] h-[300px] bg-white'></div>
          <div className='w-[300px] h-[300px] bg-white'></div>
          <div className='w-[300px] h-[300px] bg-white'></div>
          <div className='w-[300px] h-[300px] bg-white'></div>
          <div className='w-[300px] h-[300px] bg-white'></div>
          <div className='w-[300px] h-[300px] bg-white'></div>
          <div className='w-[300px] h-[300px] bg-white'></div>
          <div className='w-[300px] h-[300px] bg-white'></div>
          <div className='w-[300px] h-[300px] bg-white'></div>
          <div className='w-[300px] h-[300px] bg-white'></div>
        </div>
      </div>
    </div>
  )
}
