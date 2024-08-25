import React, { useState, useEffect,useRef } from 'react';
import Typed from 'typed.js';
const App = () => {
    const [articles, setArticles] = useState([]);
    const [visibleArticles, setVisibleArticles] = useState(6); // Initial number of articles to display

    useEffect(() => {
        const url = 'https://newsapi.org/v2/everything?domains=techcrunch.com,thenextweb.com&apiKey=65ee90bc1e8043149bf2fbbf788a7ae9';
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log(data);
                if (data.articles) {
                    // Filter articles that have a thumbnail image and map them to the required size
                    const filteredArticles = data.articles.filter(article => article.urlToImage!==undefined)
                    setArticles(filteredArticles);
                } else {
                    throw new Error('Articles not found in API response');
                }
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    const loadMoreArticles = () => {
        setVisibleArticles(prevVisibleArticles => prevVisibleArticles + 6);
    };
    const typedRef = useRef(null);

  useEffect(() => {
    // Check if the ref is available
    if (typedRef.current) {
      // Initialize Typed.js
      const options = {
        strings: ['Welcome to News Verse'
            ,'Breaking News: Major event shakes the world!',
    'Latest Update: Government announces new policies.',
    'Headlines: New study reveals shocking facts.',
    'Live Coverage: Major sports event underway!',
    'Trending: Viral story captures public’s attention.',
    'Weather Alert: Severe storm warnings issued.',
    'Technology: Innovative gadget hits the market.',
    'Entertainment: Celebrity news and gossip.',
    'Finance: Market trends and economic insights.',
    'Health: Tips and updates on wellness and lifestyle.'],
        typeSpeed: 50,
        backSpeed: 25,
        backDelay: 1000,
        startDelay: 500,
        loop: true,
      };
      const typed = new Typed(typedRef.current, options);
      return () => {
        typed.destroy();
      };
    }
  }, []);
    
    return (
        <div className="bg-black min-h-screen">
            <div className="container mx-auto py-8">
                <h1 className="text-3xl font-bold text-center mb-8 text-white"><span ref={typedRef} /></h1>
                <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                    {articles.slice(0, visibleArticles).map(article => (
                        <div key={article.url} className="bg-blue-100 rounded-lg overflow-hidden shadow-md">
                            <div>
                            <img src={article.urlToImage} alt={article.title} className="w-full h-full object-cover" />
                            </div>
                            <div className="p-4">
                                <h2 className="text-xl font-bold mb-2">{article.title}</h2>
                                <p className="text-gray-600 mb-2 font-bold font-serif">by {article.author}</p>
                                <p className="text-gray-700 mb-4">{article.description}</p>
                                <p className="text-gray-600 font-bold">{new Date(article.publishedAt).toDateString()}</p>
                                <a href={article.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">Read more</a>
                            </div>
                        </div>
                    ))}
                </div>
                {visibleArticles < articles.length && (
                    <div className="flex justify-center mt-8">
                        <button className="bg-white  text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            onClick={loadMoreArticles}>
                            See More
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default App;
