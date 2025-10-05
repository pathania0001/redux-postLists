import React, { useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchPostById } from '../features/posts/postsSlice'
import Spinner from '../components/Spinner'

export default function Detail() {
  const { id } = useParams()
  const dispatch = useDispatch()
  const { items, singleLoading, singleError, loading } = useSelector(s => s.posts)

  // find post in store (maybe fetched via fetchPosts)
  const post = items.find(p => String(p.id) === String(id))

  useEffect(() => {
    // if post not in store, fetch it
    if (!post) dispatch(fetchPostById(id))
  }, [id, post, dispatch])

  // show spinner if either global loading (rare) or singleLoading is true
  if (loading || singleLoading) return <Spinner text="Loading post..." />

  if (singleError) {
    return (
      <div className="max-w-3xl mx-auto">
        <div className="p-4 bg-red-50 text-red-700 rounded mb-4">Failed to load post: {singleError}</div>
        <Link to="/" className="text-indigo-600 hover:underline">Back to home</Link>
      </div>
    )
  }

  if (!post) {
    return (
      <div className="max-w-3xl mx-auto text-center py-12">
        <p className="text-gray-600">Post not found.</p>
        <Link to="/" className="text-indigo-600 hover:underline mt-4 inline-block">Back to home</Link>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      <Link to="/" className="text-indigo-600 hover:underline">← Back</Link>

      <article className="bg-white shadow rounded-lg overflow-hidden mt-4">
        <img src={post.imgSrc} alt={`post-${post.id}`} className="w-full h-64 object-cover" />
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-3">{post.title}</h2>
          <p className="text-gray-700 leading-relaxed mb-4">{post.body}</p>
          <div className="text-sm text-gray-500">Post ID: <span className="font-medium text-gray-700">{post.id}</span> • User ID: <span className="font-medium text-gray-700">{post.userId}</span></div>
        </div>
      </article>
    </div>
  )
}
