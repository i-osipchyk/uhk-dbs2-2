export default function NavigationButton({ text, selected, handleClick }) {
  return (
    <span
      className={`w-[100px] flex items-center justify-center cursor-pointer transition-all duration-150 hover:text-[18px] ${
        selected && 'border-x border-mainOrange text-mainOrange'
      }`}
      onClick={handleClick}
    >
      {text}
    </span>
  )
}
