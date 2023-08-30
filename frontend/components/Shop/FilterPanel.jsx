import { useState } from 'react'
import ShowFilterPanelButton from './ShowFilterPanelButton'
// basketball, lifestyle, running, skateboarding

export default function FilterPanel({
  isFilterPanelOpen,
  setIsFilterPanelOpen,
  setFilters,
  filters
}) {
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
          <span className='w-[150px]'>NAME</span>
          <input
            type='text'
            className='w-[100px] text-lg outline-none border-b border-black'
            value={filters.name ? filters.name : ''}
            onChange={(e) => setFilters('name', e.target.value)}
          />
        </div>
        <div className='flex items-center gap-[20px]'>
          <span className='w-[150px]'>PRICE</span>
          <div className='flex items-center gap-[10px]'>
            <input
              type='number'
              min={0}
              max={9999}
              step={100}
              className='w-[70px] text-lg outline-none border-b border-black'
              value={filters.min_price ? filters.min_price : ''}
              onChange={(e) => setFilters('min_price', Number(e.target.value))}
            />
            <span>-</span>
            <input
              type='number'
              min={0}
              max={9999}
              step={100}
              className='w-[70px] text-lg outline-none border-b border-black'
              value={filters.max_price ? filters.max_price : ''}
              onChange={(e) =>
                setFilters(
                  'max_price',
                  Number(e.target.value) === 0 ? 9999 : Number(e.target.value)
                )
              }
            />
          </div>
        </div>
        <div className='flex items-center gap-[20px]'>
          <span className='w-[150px]'>SEX</span>
          <div className='flex items-center w-[100px]'>
            <button
              className={`flex-1 border border-black ${
                filters.gender === 'male' && 'bg-black text-white'
              } hover:bg-black hover:text-white`}
              onClick={() =>
                setFilters('gender', filters?.gender === 'male' ? '' : 'male')
              }
            >
              M
            </button>
            <button
              className={`flex-1 border-r border-t border-b border-black ${
                filters.gender === 'female' && 'bg-black text-white'
              } hover:bg-black hover:text-white`}
              onClick={() =>
                setFilters(
                  'gender',
                  filters?.gender === 'female' ? '' : 'female'
                )
              }
            >
              F
            </button>
          </div>
        </div>
        <div className='flex items-center gap-[20px]'>
          <span className='w-[150px]'>BRAND</span>
          <input
            type='text'
            className='w-[100px] text-lg outline-none border-b border-black'
            value={filters.brand ? filters.brand : ''}
            onChange={(e) => setFilters('brand', e.target.value)}
          />
        </div>
        <div className='flex flex-wrap items-center gap-[20px]'>
          <span className='w-[150px]'>CATEGORY</span>
          <button className='border-2 border-black px-[10px] rounded-sm hover:bg-black hover:text-white'>
            Basketball
          </button>
          <button className='border-2 border-black px-[10px] rounded-sm hover:bg-black hover:text-white'>
            Lifestyle
          </button>
          <button className='border-2 border-black px-[10px] rounded-sm hover:bg-black hover:text-white'>
            Running
          </button>
          <button className='border-2 border-black px-[10px] rounded-sm hover:bg-black hover:text-white'>
            Skateboarding
          </button>
        </div>
        <div className='flex items-center gap-[20px]'>
          <span className='w-[150px]'>RELEASE YEAR</span>
          <input
            type='text'
            className='w-[100px] text-lg outline-none border-b border-black'
            value={filters.release_year ? filters.release_year : ''}
            onChange={(e) => setFilters('release_year', Number(e.target.value))}
          />
        </div>
      </div>
    </div>
  )
}
