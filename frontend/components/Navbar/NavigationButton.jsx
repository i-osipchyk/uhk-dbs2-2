export default function NavigationButton({ text, selected, handleClick }) {
  return (
    <span
      className={`w-[100px] flex items-center justify-center cursor-pointer transition-all duration-150 hover:text-[18px] ${
        selected && 'border-x border-[#D14836] text-[#D14836]'
      }`}
      onClick={handleClick}
    >
      {text}
    </span>
  )
}
