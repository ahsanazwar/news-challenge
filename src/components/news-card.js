
function NewsCard(props) {

    return ( 
        <>
            <div className="w-full sm:w-[23%] mb-10">
                <a className="news-card" href={props.url} target="_blank">
                    <div>
                        <img className="mb-3 w-full h-[200px] object-cover" src={props.image?props.image: "images/placeholder.png"}/>
                        <h2 className="mb-3 text-lg font-semibold leading-6 line-clamp-2">{props.title}</h2>
                        <p className="text-sm mb-2 line-clamp-2">{props.description}</p>
                        <div className="flex justify-between text-gray-400">
                            <p className="flex items-center text-xs"><span className="overflow-hidden truncate w-20">-{props.author}</span><div className="seperator"></div><span>{props.date}</span></p>
                            <p>{props.source}</p>
                        </div>
                    </div>
                </a>    
            </div>
        </>
     );
}

export default NewsCard;