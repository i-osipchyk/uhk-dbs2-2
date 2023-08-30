export default function Brands({ img, alt, text, onClick }) {
  return (
    <button
      className='w-[180px] h-[80px] flex items-center justify-center bg-[#F2F2F2] text-[18px] font-[700] text-mainOrange'
      onClick={onClick}
    >
      {img ? <img src={img} alt={alt}></img> : text}
    </button>
  )
}
