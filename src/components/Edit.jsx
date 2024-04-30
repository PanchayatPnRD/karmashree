import { useState, useEffect } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'

const Edit = () => {
  let [searchParams, setSearchParams] = useSearchParams();
  const queryParam = searchParams.get("from");
  let { userId } = useParams();

  console.log(userId, queryParam)
  return (
    <>
      <div className="flex flex-col">
        
        <span>from {queryParam}</span>
      </div>
    </>
  );
}

export default Edit