import './Popup.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import LoadingView from './components/LoadingView';
import SearchedTasks from './components/SearchedTasks';

interface Item {
    data_task: string;
    href2: string;
}

function Popup() {
    const [searchedText, setSearchedText] = useState('');
    const [filteredItems, setFilteredItems] = useState<Item[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [showGoogleSearch, setShowGoogleSearch] = useState(false);
    const [searchingGoogle, setSearchingGoogle] = useState(false);

    function fetchItems() {
        setIsLoading(true);
        setShowGoogleSearch(false);
        setSearchingGoogle(false);
        hideInputAndButton();

        let data = JSON.stringify({ data: searchedText });
        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'https://rajivranjan.ap-south-1.modelbit.com/v1/my_predict_task/latest',
            headers: {
                'Content-Type': 'application/json',
            },
            data: data,
        };

        axios
            .request(config)
            .then(response => {
                const items = response.data?.data ?? [];
                console.log(items);
                setFilteredItems(items);
                if (items.length === 0) {
                    setTimeout(() => {
                        setShowGoogleSearch(true);
                        searchFromGoogle();
                    }, 1000); // Delay of 1 second
                }
                setIsLoading(false);
            })
            .catch(error => {
                console.log(error);
                setIsLoading(false);
            });
    }

    const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            fetchItems();
        }
    };

    const hideInputAndButton = () => {
        const inputField = document.querySelector('input[type="text"]');
        const button = document.querySelector('button');
        if (inputField && button) {
            inputField.style.display = 'none';
            button.style.display = 'none';
        }
    };

    const searchFromGoogle = () => {
        setSearchingGoogle(true);
        // Implement your Google search logic here
        // Once the search results are available, update the filteredItems state

        // For demonstration purposes, let's simulate the search after a 2-second delay
        setTimeout(() => {
            const dummyResults = [
                { data_task: 'Dummy Result 1', href2: 'https://example.com/1' },
                { data_task: 'Dummy Result 2', href2: 'https://example.com/2' },
            ];
            setFilteredItems(dummyResults);
            setSearchingGoogle(false);
        }, 2000);
    };

    return (
        <div className="w-[100vw] h-[100vh] bg-black flex flex-col justify-start items-center">
            <h1 className="text-3xl font-bold text-gray-200 py-4">Eureka💡</h1>
            {!isLoading && (
                <div className="w-full px-3 mt-3 flex flex-row space-x-2">
                    <input
                        type="text"
                        placeholder="Search for product..."
                        autoFocus
                        className="outline-none h-8 w-full rounded bg-gray-600 bg-opacity-35 px-2 text-gray-200 font-semibold py-2"
                        value={searchedText}
                        onChange={(e) => setSearchedText(e.target.value)}
                        onKeyDown={handleInputKeyDown}
                    />
                    <button
                        className="px-2 py-1 rounded bg-blue-900 text-gray-200"
                        onClick={fetchItems}
                    >
                        {' '}
                        Search{' '}
                    </button>
                </div>
            )}
            {isLoading ? (
                <LoadingView />
            ) : showGoogleSearch ? (
                searchingGoogle ? (
                    <LoadingView  />
                ) : (
                    <SearchedTasks filteredItems={filteredItems} />
                )
            ) : (
                <SearchedTasks filteredItems={filteredItems} />
            )}
        </div>
    );
}

export default Popup;