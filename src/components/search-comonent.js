import { useRef, useState } from "react";
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import DatePicker from 'react-date-picker';
import moment from "moment";

function SearchComponent(props) {
    const [startDate, setStartDate] = useState(new Date());
    const onChangeHandle = (e) => {
        props.setQuery(e.target.value)
    }

    const searchField = useRef();

    const onCalendarChange = (date) =>{
        setStartDate(()=> date)
        props.setQuery(moment(date).format().split("T", 1)[0])
    }

    return (
        <>
            <div className="flex flex-wrap justify-between sm:justify-center items-center pb-10 sm:pb-20">
                <form class="w-full sm:w-2/5 mb-3 sm:m-0">   
                    <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                    <div class="relative">
                        <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                            <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                            </svg>
                        </div>
                        <input ref={searchField} onChange={onChangeHandle} type="search" id="default-search" class="outline-none block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Articles, News..."/>
                        <button type="submit" class="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
                    </div>
                </form>
                
                <div>
                    <DatePicker className="datepicker" format={"y-MM-dd"}  onChange={(date) => onCalendarChange(date)} value={startDate} />
                </div>

                <div>
                    <select className="ml-2 border rounded-md border-[#d1d5db] px-4 py-[14px]" onChange={(e)=>props.setQuery(e.target.value)}>
                        <option>guardian</option>
                        <option>newsapi</option>
                        <option>cnn</option>
                    </select>
                </div>

                <button className="bg-black text-white px-2 py-1 rounded-md text-sm sm:ml-2 sm:mx-0 mx-auto my-2" onClick={()=>{
                    searchField.current.value='';
                    props.setQuery('')}
                }>Clear</button>
            </div>
        </>
      );
}

export default SearchComponent;
