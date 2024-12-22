import { useEffect, useState } from "react"
import  useShowToast  from "../../hooks/useShowToast"
import apiReq from "../lib/apiReq"
import Post from "../Post"
import UserPostSkeleton from "../skeleton/UserPostSkeleton"
import { useRecoilState } from "recoil"
import postAtom from "../../atoms/postAtom"

const HomePage = () => {

  const showToast = useShowToast();
  const [posts ,setPosts] = useRecoilState(postAtom);
  const [isLoading ,setLoading ] = useState(true);



  useEffect(()=>{
    const getFeed = async()=>{
      setLoading(true);  
      try {
        const res = await apiReq.get('/posts/feed');
  
        if(res.data.error){
          showToast("Error", res.data.error, "error");
          return;
        }
        setPosts(res.data);
        // console.log("your feed" + res.data)
      } catch (error) {
        showToast("Error in feed", error.message, "error");
        console.log("Error: " + error);
      }
      finally{
        setLoading(false);
      } 
    }
    getFeed();
  },[showToast,setPosts])
  return (
    <>
    {
      isLoading && (
        <>
          <UserPostSkeleton/>
            <UserPostSkeleton/>
            <UserPostSkeleton/>
        </>
      )
    }
    {
      !isLoading && posts.length === 0 && <h1>Follow some users to see the feed</h1>
    }
    {
      posts.map((post) =>
          <Post post={post} postedBy={post.postedBy} key={post._id}/>
      )
    }
    </>
  )
}

export default HomePage