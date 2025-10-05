import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const POSTS_URL = 'https://jsonplaceholder.typicode.com/posts'

// fetch all posts
export const fetchPosts = createAsyncThunk(
  'posts/fetchPosts',
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch(POSTS_URL)
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const data = await res.json()
      // attach imgSrc
      return data.map(p => ({ ...p, imgSrc: `https://picsum.photos/500/300?random=${p.id}` }))
    } catch (err) {
      return rejectWithValue(err.message)
    }
  }
)

// fetch single post by id (used when user opens detail url directly)
export const fetchPostById = createAsyncThunk(
  'posts/fetchPostById',
  async (id, { rejectWithValue }) => {
    try {
      const res = await fetch(`${POSTS_URL}/${id}`)
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const post = await res.json()
      return { ...post, imgSrc: `https://picsum.photos/500/300?random=${post.id}` }
    } catch (err) {
      return rejectWithValue(err.message)
    }
  }
)

const postsSlice = createSlice({
  name: 'posts',
  initialState: {
    items: [],      // array of posts
    loading: false, // overall loading
    error: null,    // error message
    singleLoading: false, // used for single post fetch
    singleError: null,
  },
  reducers: {
    // optional: local add / remove actions could go here
  },
  extraReducers: builder => {
    builder
      // fetchPosts
      .addCase(fetchPosts.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false
        state.items = action.payload
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload || 'Failed to fetch posts'
      })

      // fetchPostById
      .addCase(fetchPostById.pending, state => {
        state.singleLoading = true
        state.singleError = null
      })
      .addCase(fetchPostById.fulfilled, (state, action) => {
        state.singleLoading = false
        // upsert the post in items
        const idx = state.items.findIndex(p => p.id === action.payload.id)
        if (idx >= 0) state.items[idx] = action.payload
        else state.items.push(action.payload)
      })
      .addCase(fetchPostById.rejected, (state, action) => {
        state.singleLoading = false
        state.singleError = action.payload || 'Failed to fetch the post'
      })
  },
})

export default postsSlice.reducer
