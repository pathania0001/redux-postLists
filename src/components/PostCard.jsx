import React from 'react'
import { Link } from 'react-router-dom'

export default function PostCard({ post }) {
  // truncation lengths (adjust to match Figma look)
  const titleLimit = 60
  const bodyLimit = 110

  const truncatedTitle = post.title.length > titleLimit ? post.title.slice(0, titleLimit) + '...' : post.title
  const truncatedBody = post.body.length > bodyLimit ? post.body.slice(0, bodyLimit) + '...' : post.body
  const needsReadMore = post.body.length > bodyLimit

  return (
    <article className="bg-white shadow rounded-lg overflow-hidden flex flex-col">
      <img className="w-full h-44 object-cover" src={post.imgSrc} alt={`post-${post.id}`} loading="lazy" />
      <div className="p-4 flex-1 flex flex-col">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">{truncatedTitle}</h3>
        <p className="text-gray-600 flex-1">{truncatedBody}
          {needsReadMore && (
            <> <Link to={`/item/${post.id}`} className="text-indigo-600 font-medium">Read More…</Link></>
          )}
        </p>

        <div className="mt-4 flex items-center justify-between">
          <div className="text-sm text-gray-500">User: <span className="font-medium text-gray-700">{post.userId}</span></div>
          <Link to={`/item/${post.id}`} className="inline-flex items-center px-3 py-1.5 bg-indigo-600 text-white text-sm rounded hover:bg-indigo-700">View</Link>
        </div>
      </div>
    </article>
  )
}
