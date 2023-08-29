export default function ShowFilterPanelButton({
  isFilterPanelOpen,
  setIsFilterPanelOpen,
}) {
  return (
    <button
      className={`w-[50px] h-[50px] text-xl flex items-center justify-center ${
        isFilterPanelOpen
          ? 'hover:bg-mainOrange text-black hover:text-white'
          : 'hover:bg-white text-white hover:text-black'
      }`}
      onClick={setIsFilterPanelOpen}
    >
      {isFilterPanelOpen ? '<' : '>'}
    </button>
  )
}
