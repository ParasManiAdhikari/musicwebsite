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
    <div className="rounded-lg border-2 border-pink-200 bg-white/80 p-4">
      {/* Seek Slider */}
      <div>
        <input
          type="range"
          min="0"
          max={duration || 0}
          step="0.1"
          value={currentTime}
          onChange={handleSliderChange}
          className="w-full accent-pink-600"
        />
        <div className="mt-2 flex justify-between text-sm font-pixel text-pink-700">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

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