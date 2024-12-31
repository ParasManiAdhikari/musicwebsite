'use client'

import { useState, useEffect } from 'react'
import { Play, Pause } from 'lucide-react'

type SongCardProps = {
  title: string
  artist: string
  src: string // URL to the song file
}

export default function SongCard({ title, artist, src }: SongCardProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [audio] = useState(new Audio(src))
  const [visualizerBars, setVisualizerBars] = useState<number[]>(new Array(10).fill(0))

  const togglePlayPause = () => {
    if (isPlaying) {
      audio.pause()
    } else {
      audio.play()
    }
    setIsPlaying(!isPlaying)
  }

  useEffect(() => {
    // Handle visualizer simulation
    const interval = setInterval(() => {
      if (isPlaying) {
        setVisualizerBars(
          Array.from({ length: 10 }, () => Math.floor(Math.random() * 50) + 10)
        )
      }
    }, 200)

    return () => clearInterval(interval)
  }, [isPlaying])

  useEffect(() => {
    audio.addEventListener('ended', () => setIsPlaying(false))
    return () => {
      audio.pause()
      audio.removeEventListener('ended', () => setIsPlaying(false))
    }
  }, [audio])

  return (
    <div className="rounded-lg border-2 border-pink-200 bg-white/80 p-4">
      <div className="flex items-center justify-between">
        {/* Song Info */}
        <div>
          <h3 className="font-pixel text-lg text-green-600">{title}</h3>
          <p className="text-sm text-pink-600">{artist}</p>
        </div>

        {/* Play/Pause Button */}
        <button
          className="rounded-full bg-pink-100 p-2 hover:bg-pink-200"
          onClick={togglePlayPause}
        >
          {isPlaying ? <Pause className="h-6 w-6 text-green-600" /> : <Play className="h-6 w-6 text-green-600" />}
        </button>
      </div>

      {/* Visualizer */}
      <div className="mt-4 flex items-end gap-1">
        {visualizerBars.map((height, i) => (
          <div
            key={i}
            className="w-2 rounded bg-pink-300 transition-all"
            style={{ height: `${height}px` }}
          />
        ))}
      </div>
    </div>
  )
}