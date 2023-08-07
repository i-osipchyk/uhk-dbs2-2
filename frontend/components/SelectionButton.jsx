export default function SelectionButton({ img, alt, text }) {
  return (
    <div className='flex flex-col gap-[25px] items-center'>
      <button className='w-[300px] h-[300px]'>
        <img src={img} alt={alt} className='w-full h-full object-cover' />
      </button>
      <span className='text-[25px] font-[700]'>{text}</span>
    </div>
  )
}
