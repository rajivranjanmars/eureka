
interface Item {
    data_task: string;
    href2: string;
}

interface SearchedTasksProps {
    filteredItems: Item[];
}

const SearchedTasks = ({ filteredItems }) => {
    return (
        <div className="grid grid-cols-3 gap-3 mt-5 mb-3 px-3 h-[88vh] overflow-y-auto">
            {filteredItems.map((item, index) => {
                return (
                    <div
                        key={index}
                        className="bg-gray-700 bg-opacity-40 p-3 rounded-lg shadow-md flex flex-col justify-center items-start py-3 hover:cursor-pointer max-w-52 max-h-32"
                        onClick={() => chrome.tabs.create({ url: item.href2 })}
                    >
                        <h1 className="text-lg font-bold text-gray-200">{item.data_task}</h1>
                    </div>
                );
            })}
        </div>
    );
};

export default SearchedTasks;