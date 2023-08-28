import { useState } from 'react'
import ShowFilterPanelButton from './ShowFilterPanelButton'

export default function FilterPanel({
  isFilterPanelOpen,
  setIsFilterPanelOpen
}) {
  const [sex, setSex] = useState('')
  return (
    <div className='h-full w-[400px] flex flex-col'>
      <div className='w-full h-[50px] flex items-center pl-[20px] justify-between'>
        <span className='text-2xl font-bold'>FILTERS</span>
        {isFilterPanelOpen && (
          <ShowFilterPanelButton
            isFilterPanelOpen={isFilterPanelOpen}
            setIsFilterPanelOpen={setIsFilterPanelOpen}
          />
        )}
      </div>
      <div className='w-full h-full flex flex-col p-[20px] gap-[20px] text-xl'>
        <div className='flex items-center gap-[20px]'>
          <span>SEX</span>
          <div className='flex items-center w-[100px]'>
            <button
              className={`flex-1 border border-black ${
                sex === 'm' && 'bg-black text-white'
              } hover:bg-black hover:text-white`}
              onClick={() => setSex(sex === 'm' ? '' : 'm')}
            >
              M
            </button>
            <button
              className={`flex-1 border-r border-t border-b border-black ${
                sex === 'w' && 'bg-black text-white'
              } hover:bg-black hover:text-white`}
              onClick={() => setSex(sex === 'w' ? '' : 'w')}
            >
              W
            </button>
          </div>
        </div>
        <div className='flex items-center gap-[20px]'>
          <span>BRAND</span>
          <input
            type='text'
            className='w-[100px] text-lg outline-none border-b border-black'
          />
        </div>
      </div>
    </div>
  )
}
