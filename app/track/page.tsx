'use client'

import { useState, ChangeEvent } from 'react'
import SongCard from '@/components/SongCard'

// Define the structure of the track data
interface Track {
  title: string
  artist: string
  category: string
  length: string
  src: string
}

// Define the structure of the comment data
interface Comment {
  id: number
  text: string
  user: string
}

// Define the structure of the reaction count
interface Reaction {
  fire: number
}

const TrackPage = () => {
  const trackId = 1 // Get trackId from the URL

  // Example track data - replace with actual fetching from database or API
  const track: Track = {
    title: 'Retro Beats',
    artist: 'DJ Pixel',
    category: 'Electronic',
    length: '3:45',
    src: 'https://file.garden/Z3U0uKddaRVf0rTn/hot.mp3', // Example audio source (use an actual path or URL)
  }

  if (!trackId) return <div>Loading...</div> // Handle loading state

  // State for comments
  const [comments, setComments] = useState<Comment[]>([
    { id: 1, text: 'Great track! Love the vibe!', user: 'User1' },
    { id: 2, text: 'Super catchy! Can\'t stop listening!', user: 'User2' },
  ])

  const [newComment, setNewComment] = useState<string>('')

  // State for reaction count (just the fire emoji)
  const [reaction, setReaction] = useState<Reaction>({
    fire: 0,
  })

  // Handle submitting a new comment
  const handleCommentSubmit = (): void => {
    if (newComment.trim()) {
      setComments([
        ...comments,
        { id: comments.length + 1, text: newComment, user: 'Guest' },
      ])
      setNewComment('')
    }
  }

  // Handle increasing and decreasing the fire reaction count
  const handleReactionIncrease = (): void => {
    setReaction({ ...reaction, fire: reaction.fire + 1 })
  }

  const handleReactionDecrease = (): void => {
    setReaction({ ...reaction, fire: reaction.fire - 1 })
  }

  return (
    <div className="min-h-screen bg-pink-50 dark:bg-gray-900 flex items-center justify-center">
      <div className="mx-auto max-w-6xl px-4 py-8">

        {/* SongCard Component */}
        <SongCard
          title={track.title}
          artist={track.artist}
          src={track.src}
        />

        {/* Reaction Section - Fire emoji with up/down arrows */}
        <div className="mt-6 text-center">
          <div className="flex justify-center items-center space-x-4">
            <button
              onClick={handleReactionIncrease}
              className="transition-transform transform hover:scale-125 text-4xl text-yellow-500 hover:text-yellow-600"
            >
              ↑
            </button>
            <div className="flex items-center space-x-2">
              <span className="text-5xl text-yellow-500 font-bold">{reaction.fire}</span>
            </div>
            <button
              onClick={handleReactionDecrease}
              className="transition-transform transform hover:scale-125 text-4xl text-yellow-500 hover:text-yellow-600"
            >
              ↓
            </button>
          </div>
        </div>

        {/* Comment Section */}
        <div className="mt-8">
          <h2 className="font-pixel text-2xl text-pink-700 dark:text-pink-300">Comments</h2>
          <div className="space-y-4">
            {comments.map((comment) => (
              <div key={comment.id} className="p-4 bg-pink-100 dark:bg-gray-800 rounded-lg">
                <p className="font-pixel text-green-600 dark:text-green-400 inline">{comment.user}:</p> {/* Username in green */}
                <p className="font-pixel text-pink-700 dark:text-pink-300 inline ml-2">{comment.text}</p>
              </div>
            ))}
          </div>

          {/* Comment Input */}
          <div className="mt-4">
            <textarea
              value={newComment}
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setNewComment(e.target.value)}
              className="w-full p-3 rounded-lg bg-pink-100 dark:bg-gray-800 text-pink-700 dark:text-pink-300 font-pixel"
              placeholder="Leave a comment..."
              rows={3}
            />
            <button
              onClick={handleCommentSubmit}
              className="mt-2 px-4 py-2 bg-green-600 text-white rounded-lg font-pixel"
            >
              Post Comment
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TrackPage
