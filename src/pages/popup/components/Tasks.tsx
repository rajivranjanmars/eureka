
const Tasks = (filteredItems:any[]) => {
  return (
      <div className="grid grid-cols-3 gap-3 mt-5 mb-3 px-3 h-[88vh] overflow-y-auto">
          {filteredItems.map((item, index) => {
              return (
                  <div
                      key={index}
                      className="bg-gray-700 bg-opacity-40 p-3 rounded-lg shadow-md flex flex-col justify-center items-start py-3 hover:cursor-pointer"
                      onClick={() => chrome.tabs.create({ url: item.href2 })}>
                      <h1 className="text-lg font-bold text-gray-200">{item.data_name}</h1>
                      <p className="text-sm text-gray-300 pb-4">{item.data_task}</p>
                      <p className="text-sm text-gray-300 font-bold">{item.available_starting}</p>
                  </div>
              );
          })}
      </div>
  )
}

export default Tasks