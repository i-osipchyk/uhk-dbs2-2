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
          <span className='w-[70px]'>NAME</span>
          <input
            type='text'
            className='w-[100px] text-lg outline-none border-b border-black'
          />
        </div>
        <div className='flex items-center gap-[20px]'>
          <span className='w-[70px]'>PRICE</span>
          <div className='flex items-center gap-[10px]'>
            <input
              type='number'
              min={0}
              step={100}
              className='w-[100px] text-lg outline-none border-b border-black'
            />
            <span>-</span>
            <input
              type='number'
              min={0}
              step={100}
              className='w-[100px] text-lg outline-none border-b border-black'
            />
          </div>
        </div>
        <div className='flex items-center gap-[20px]'>
          <span className='w-[70px]'>SEX</span>
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
                sex === 'f' && 'bg-black text-white'
              } hover:bg-black hover:text-white`}
              onClick={() => setSex(sex === 'f' ? '' : 'f')}
            >
              F
            </button>
          </div>
        </div>
        <div className='flex items-center gap-[20px]'>
          <span className='w-[70px]'>BRAND</span>
          <input
            type='text'
            className='w-[100px] text-lg outline-none border-b border-black'
          />
        </div>
      </div>
    </div>
  )
}
