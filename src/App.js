import React, { useEffect, useState } from 'react'
import './App.css';

const App = () => {
  const [products,setProducts]=useState([]);

  const [page,setPage]=useState(1);

  const [totalPages,setTotalPages]=useState(0);

  const fetchProduct=async ()=>{
    const res=await fetch(`https://dummyjson.com/products?limit=10&skip=${page*10-10}`);
    const data=await res.json();
    if(data&&data.products){
      setProducts(data.products);
      setTotalPages(data.total/10);
    }
  }

  useEffect(()=>{
     fetchProduct();
  },[page]);

  const selectPage=(selectedPage)=>{
    if (selectedPage >= 1 && selectedPage <= totalPages && selectedPage !== page) {
      setPage(selectedPage)
    }
  }

  return (
    <>
    {products.length>0&&<div className='product_container'>      
      {products.map((p)=>{
        return (
          <div className='single_product' key={p.id}>
             <p>{p.title}</p>
             <img src={p.images[0]} alt={p.title}/>
          </div>
        )
      })}
    </div>}
    
      
      {products.length>0&& 
        <div className='pagination'>
          <span className={page>1?"":"pagination_disabled"} onClick={()=>selectPage(page-1)}>⬅️</span>
          {
              [...Array(totalPages)].map((_,i)=>{
                return (
                <span className={page===i+1?"pagination_selected":""} onClick={()=>selectPage(i+1)} key={i}>{i+1}</span>
                );
              })
          }
          <span className={page<totalPages?"":"pagination_disabled"} onClick={()=>selectPage(page+1)}>➡️</span>
      </div>}
    </>
  )
}

export default App
