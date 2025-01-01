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
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)

  const togglePlayPause = () => {
    if (isPlaying) {
      audio.pause()
    } else {
      audio.play()
    }
    setIsPlaying(!isPlaying)
  }

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value)
    audio.currentTime = newTime
    setCurrentTime(newTime)
  }

  useEffect(() => {
    audio.addEventListener('timeupdate', () => setCurrentTime(audio.currentTime))
    audio.addEventListener('loadedmetadata', () => setDuration(audio.duration))
    audio.addEventListener('ended', () => setIsPlaying(false))

    return () => {
      audio.pause()
      audio.removeEventListener('timeupdate', () => setCurrentTime(audio.currentTime))
      audio.removeEventListener('loadedmetadata', () => setDuration(audio.duration))
      audio.removeEventListener('ended', () => setIsPlaying(false))
    }
  }, [audio])

  useEffect(() => {
    const interval = setInterval(() => {
      if (isPlaying) {
        setVisualizerBars(
          Array.from({ length: 10 }, () => Math.floor(Math.random() * 50) + 10)
        )
      }
    }, 200)

    return () => clearInterval(interval)
  }, [isPlaying])

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  return (
    <div className="w-96 h-80 rounded-lg border-2 border-pink-200 bg-white/80 dark:bg-gray-800 p-4 flex flex-col">
      {/* Song Info */}
      <div className="flex flex-col items-center mb-4">
        <h3 className="font-pixel text-2xl text-green-600 dark:text-green-400">{title}</h3>
        <p className="text-sm text-pink-600 dark:text-pink-400">{artist}</p>
      </div>

      {/* Seek Slider */}
      <div className="flex flex-col items-center mb-4">
        <input
          type="range"
          min="0"
          max={duration || 0}
          step="0.1"
          value={currentTime}
          onChange={handleSliderChange}
          className="w-full accent-pink-600 dark:accent-gray-500"
        />
        <div className="mt-2 flex justify-between text-sm font-pixel text-pink-700 dark:text-pink-300 w-full px-4">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      {/* Play/Pause Button */}
      <div className="flex justify-center mb-4">
        <button
          className="rounded-full bg-pink-100 dark:bg-gray-700 p-4 hover:bg-pink-200 dark:hover:bg-gray-600 transition-all transform scale-125"
          onClick={togglePlayPause}
        >
          {isPlaying ? <Pause className="h-10 w-10 text-green-600 dark:text-green-400" /> : <Play className="h-10 w-10 text-green-600 dark:text-green-400" />}
        </button>
      </div>

      {/* Visualizer: only show if playing */}
      {isPlaying && (
        <div className="flex items-end justify-center gap-2 mt-4">
          {visualizerBars.map((height, i) => (
            <div
              key={i}
              className="w-2 rounded bg-pink-300 dark:bg-gray-500 transition-all"
              style={{ height: `${height}px` }}
            />
          ))}
        </div>
      )}
    </div>
  )
}