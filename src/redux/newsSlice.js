import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from "uuid";
import * as _ from 'lodash';

export const apiFetch = createAsyncThunk("apiFetch", async ()=>{


    let guardianNews;
    let newsApiresultData;
    let cnnNews;
    let finalData;

    let getter = Promise.all([
      fetch("https://content.guardianapis.com/world?api-key=test"),
      fetch("https://newsapi.org/v2/everything?q=Apple&sortBy=popularity&apiKey=4e18966f1ac644ddadd0b73a7fa3decd"),
      fetch("https://saurav.tech/NewsAPI/everything/cnn.json"),
    ]).then(async([guardianNewsApi,newsApi, cnnNewsApi]) => {
        const guardianNewsApiResult = await guardianNewsApi.json();

        guardianNews = await guardianNewsApiResult?.response?.results?.map((item) =>{ 
          // console.log("Guardian Api" + JSON.stringify(item))
          let guardianData = _.pick(item, ['webPublicationDate','webTitle','webUrl','sectionName'])
          return {
            id: uuidv4(),
            author: guardianData?.sectionName,
            newsTitle: guardianData?.webTitle,
            publishDate: guardianData?.webPublicationDate.split("T", 1)[0],
            description: guardianData?.webTitle,
            img: '',
            webUrl: guardianData?.webUrl,
            source: 'guardian' 
         }
        }
        );

        const newsApiresult = await newsApi.json();

        newsApiresultData = await newsApiresult?.articles?.map((item) =>{ 
          // console.log("News Api" + JSON.stringify(item))
          let newsData = _.pick(item, ['publishedAt','title', 'description','url','urlToImage','author'])
          return {
            id: uuidv4(),
            author: newsData?.author,
            newsTitle: newsData?.title,
            publishDate: newsData?.publishedAt.split("T", 1)[0],
            description: newsData?.description,
            img: newsData?.urlToImage,
            webUrl: newsData.url,
            source: 'newsapi'
         }
        }
        );

        const cnnNewsApiResult = await cnnNewsApi.json();

        cnnNews = await cnnNewsApiResult?.articles?.map((item) =>{ 
          // console.log("Guardian Api" + JSON.stringify(item))
          let cnnData = _.pick(item, ['publishedAt','title','description','url','author','urlToImage'])
          return {
            id: uuidv4(),
            author: cnnData?.author,
            newsTitle: cnnData?.title,
            publishDate: cnnData?.publishedAt.split("T", 1)[0],
            description: cnnData?.description,
            img: cnnData?.urlToImage,
            webUrl: cnnData?.url,
            source: 'cnn' 
         }
        }
        );
        
        finalData = [...cnnNews,...newsApiresultData,...guardianNews]

        return finalData;
    }).catch((err) => {
        console.log(err);
    });
    return getter;
  }
)

const newsSlice = createSlice({
  name: 'newsApi',
  initialState:{
    isLoading: false,
    data: null,
    isError: false,
  },
  extraReducers:(builder)=>{
    builder.addCase(apiFetch.pending, (state,action)=>{
      state.isLoading = true
    });
    builder.addCase(apiFetch.fulfilled, (state,action)=>{
      // console.log("Inside Reducer" + JSON.stringify(state.data))
      state.isLoading = false
      state.data = action.payload
    });
    builder.addCase(apiFetch.rejected, (state,action)=>{
      console.log("Error" + action.payload);
      state.isError = true;
    })
  }
},
)


export default newsSlice.reducer