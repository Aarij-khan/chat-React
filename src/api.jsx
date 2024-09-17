import React, { useEffect, useState } from "react";
import Loader from "./loader";


function Api() {
  const [data, setData] = useState([]);
  const [limit, setLimit] = useState(30);
  console.log("🚀 ~ Api ~ limit:", limit)
  const [Loading, setLoading] = useState(false);
  const [total, settotal] = useState(0);
  console.log("🚀 ~ Api ~ total:", total)
  const [skip, setSkip] = useState(0);
  useEffect(() => {
    setLoading(true)
    fetch(`https://dummyjson.com/products?limit=${limit}&skip=${skip}`)
      .then((res) => res.json())
      .then((res) => {
        setData(res.products);
        settotal(res.total);
      });
      setLoading(false)
  }, [limit]);
  function handleScroll() {
      if (window.innerHeight + document.documentElement.scrollTop == document.documentElement.offsetHeight) {
            setLimit((prev)=> prev + 20)
            
         
      }
      
  }
  useEffect(()=>{
    window.addEventListener('scroll',handleScroll)
  },[])


  return (

    <div className="flex flex-wrap gap-10 w-full justify-center items-center my-10">
        <h1>detail page</h1>
        <h1>add to cart</h1>
        <h1>catagories</h1>
      {data.map((e, idx) => {
        return (
          <div key={idx} class="w-[20%] h-[20%] bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <a href="#">
              <img
                class="rounded-t-lg"
                src={e.images[0]}
                alt=""
              />
            </a>
            <div class="p-5">
              <a href="#">
                <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white text-center">
                  {e.title}
                </h5>
              </a>
              <p class="mb-3 ml-4 font-normal text-gray-700 dark:text-gray-400">
                 Rate : {e.price}
              </p>
              <a
                href="#"
                class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                {e.description.slice(0,50)}
                <svg
                  class="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 10"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M1 5h12m0 0L9 1m4 4L9 9"
                  />
                </svg>
              </a>
            </div>
          </div>
        );
      })}
      {Loading? <Loader/>: "load"}
    </div>
  );
}

export default Api;
