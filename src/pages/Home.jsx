import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchPosts } from '../features/posts/postsSlice'
import PostCard from '../components/PostCard'
import Spinner from '../components/Spinner'

export default function Home() {
  const dispatch = useDispatch()
  const { items, loading, error } = useSelector(state => state.posts)

  useEffect(() => {
    // fetch only if we don't already have data
    if (items.length === 0) dispatch(fetchPosts())
  }, [dispatch])

  return (
    <div>
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">Latest Posts</h1>

      {loading && <Spinner text="Loading posts..." />}

      {error && (
        <div className="p-4 bg-red-50 text-red-700 rounded mb-4">
          Error loading posts: {error}
        </div>
      )}

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {items.map(post => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  )
}
