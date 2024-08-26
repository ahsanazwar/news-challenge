import { useEffect, useState } from "react";
import Layout from "components/layout";
import NewsCard from "components/news-card";
import { useDispatch, useSelector } from "react-redux";
import { apiFetch } from "./redux/newsSlice";
import SearchComponent from "components/search-comonent";

function App() {
  const dispatch = useDispatch();
    const state = useSelector((state) => state.newsGet);
    const [newsData,setNews] = useState(state?.data);
    const [query,setQuery] = useState("");
    const keys = ['newsTitle','description','publishDate','source']
    useEffect(()=>{
        dispatch(apiFetch())
        // console.log(newsData);
    },[]);

    useEffect(()=>{
      setNews(state?.data)
  },[state?.data]);

    const onFilter = (getValue) => {
      console.log(getValue);
      setQuery(getValue)
    }
  return (
    <>
      <Layout>
        {/* <button onClick={onFilter}>Click</button> */}
        <SearchComponent items={state?.data} setQuery={onFilter}/>
        <div className="flex flex-wrap justify-center gap-x-5">

          {
              newsData?.filter((item)=> {
                  return keys?.some((key)=>item[key].toLowerCase().includes(query))
                }).map((item,index)=>{
                return (
                  <NewsCard 
                    key={item?.id}
                    url={item?.webUrl}
                    title={item?.newsTitle}
                    image={item?.img}
                    description={item?.description}
                    author={item?.author}
                    date={item?.publishDate}
                    source={item?.source}
                  />
                )
              })
          }
          
        </div>
      </Layout>  
    </>
  );
}

export default App;
