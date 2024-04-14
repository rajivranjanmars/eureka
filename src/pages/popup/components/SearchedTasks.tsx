import React, { useState } from 'react';
import {websites} from '../functions/websites';

interface SubItem {
    data_name: string;
    available_starting: string;
    href2: string;
}

interface Item {
    data_task: string;
    href2: string;
    index: number;
}

interface SearchedTasksProps {
    filteredItems: Item[];
}

const SearchedTasks = ({ filteredItems }) => {
    const [selectedItem, setSelectedItem] = useState<Item | null>(null);

    const handleItemClick = (item: Item) => {
        const matchingWebsite = websites.find(website => website.index === item.index);

        if (matchingWebsite && matchingWebsite.data_name) {
            setSelectedItem(item);
        } else {
            chrome.tabs.create({ url: item.href2 });
        }
    };

    const renderSubItems = (subItems: SubItem[]) => {
        return subItems.map((subItem, index) => (
            <div
                key={index}
                className="bg-gray-700 bg-opacity-40 p-3 rounded-lg shadow-md flex flex-col justify-center items-start py-3 hover:cursor-pointer max-h-24"
                onClick={() => chrome.tabs.create({ url: subItem.href2 })}
            >
                <h1 className="text-lg font-bold text-gray-200">{subItem.data_name}</h1>
                <p className="text-sm text-gray-300 pb-4">{subItem.available_starting}</p>
            </div>
        ));
    };

    return (
        <div className="grid grid-cols-3 gap-3 mt-5 mb-3 px-3 h-[88vh] overflow-y-auto">
            {selectedItem ? (
                renderSubItems(websites.find(website => website.index === selectedItem.index)?.data_name || [])
            ) : (
                filteredItems.map((item, index) => (
                    <div
                        key={index}
                        className="bg-gray-700 bg-opacity-40 p-3 rounded-lg shadow-md flex flex-col justify-center items-start py-3 hover:cursor-pointer max-w-52 max-h-32"
                        onClick={() => handleItemClick(item)}
                    >
                        <h1 className="text-lg font-bold text-gray-200">{item.data_task}</h1>
                    </div>
                ))
            )}
        </div>
    );
};

export default SearchedTasks;