import { useRouter } from 'next/router'
import ShowFilterPanelButton from './ShowFilterPanelButton'

export default function Products({
  isFilterPanelOpen,
  setIsFilterPanelOpen,
  products,
}) {
  const { push } = useRouter()

  return (
    <div className='h-full flex-1 overflow-y-auto overflow-x-hidden'>
      <div className='w-[50px] h-[50px] absolute'>
        {!isFilterPanelOpen && (
          <ShowFilterPanelButton
            isFilterPanelOpen={isFilterPanelOpen}
            setIsFilterPanelOpen={setIsFilterPanelOpen}
          />
        )}
      </div>
      <div className='w-full h-full p-[50px] flex items-top justify-center bg-mainOrange'>
        <div
          className={`grid ${
            isFilterPanelOpen ? 'grid-cols-3' : 'grid-cols-4'
          } gap-[20px]`}
        >
          {products.map((product) => (
            <div
              className='w-[300px] h-fit flex flex-col items-center p-[20px] gap-[20px] bg-white cursor-pointer rounded-md'
              onClick={() => push(`/product/${product[0]}`)}
            >
              <div className='w-full h-[300px] flex items-center justify-center bg-black text-white'>
                img
              </div>
              <span className='flex items-center justify-center w-full font-bold text-xl'>
                {product[3]} {product[1]}
              </span>
              <span className='flex items-center justify-center w-full font-semibold text-md'>
                {product[2]}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
