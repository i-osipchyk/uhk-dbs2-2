export default function UserAdminToggler({
  selected,
  handleClick,
  borderColor,
}) {
  return (
    <div
      className={`w-10 h-5 flex rounded-full border box-content cursor-pointer ${
        selected === 'admin' && 'justify-end'
      } border-${borderColor}`}
      onClick={handleClick}
    >
      <div className='w-5 h-5 rounded-full bg-black'></div>
    </div>
  )
}
