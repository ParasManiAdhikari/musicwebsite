'use client'

import { useState } from 'react'
import { Heart, Music, GamepadIcon, BookOpen, Link2, MessageSquare } from 'lucide-react'
import Link from 'next/link'
import Window from '@/components/Window'

export default function RetroWebsite() {
  const [visitorCount, setVisitorCount] = useState(1337)
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState('')
  const [sortOption, setSortOption] = useState('newest')
  const [selectedCategory, setSelectedCategory] = useState('All')

  const tracks = [
    { title: 'Retro Beats', artist: 'DJ Pixel', category: 'Electronic', length: '3:45', id: 1 },
    { title: 'Synthwave Dreams', artist: 'DJ Neon', category: 'Synthwave', length: '4:00', id: 2 },
    { title: 'Pixelated World', artist: 'DJ Retro', category: 'Chiptune', length: '2:50', id: 3 },
    { title: 'Cosmic Journey', artist: 'DJ Stellar', category: 'Ambient', length: '5:30', id: 4 },
    // Add more tracks as needed
  ]

  // Filter and Sort Tracks
  const filteredTracks = tracks
    .filter(track => {
      if (selectedCategory !== 'All' && track.category !== selectedCategory) return false
      if (!track.title.toLowerCase().includes(searchTerm.toLowerCase())) return false
      return true
    })
    .sort((a, b) => {
      if (sortOption === 'newest') return b.id - a.id
      if (sortOption === 'longest') return parseDuration(b.length) - parseDuration(a.length)
      return 0
    })

  // Pagination logic
  const tracksPerPage = 20
  const totalPages = Math.ceil(filteredTracks.length / tracksPerPage)
  const currentTracks = filteredTracks.slice((currentPage - 1) * tracksPerPage, currentPage * tracksPerPage)

  function parseDuration(duration: string) {
    const [minutes, seconds] = duration.split(':').map(Number)
    return minutes * 60 + seconds
  }

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page)
    }
  }

  return (
    <div className="min-h-screen bg-pink-50" style={{
      backgroundImage: `
        radial-gradient(#ff69b440 1px, transparent 1px),
        radial-gradient(#ff69b440 1px, transparent 1px)
      `,
      backgroundSize: '20px 20px',
      backgroundPosition: '0 0, 10px 10px'
    }}>
      <div className="mx-auto max-w-6xl px-4 py-8">
        {/* Header */}
        <header className="mb-8 text-center">
          <h1 className="mb-4 animate-pulse font-pixel text-4xl font-bold tracking-wide text-green-600">
            ⋆｡°✩ browse lovekinesis.com on high dosages only! ✩°｡⋆
          </h1>
        </header>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-[250px_1fr_250px]">
          {/* Left Sidebar */}
          <div className="space-y-4">
            <Window title="main menu ♡">
              <nav className="space-y-2 p-4">
                {[ 
                  { icon: Heart, text: 'about' },
                  { icon: Music, text: 'music + lyrics' },
                  { icon: GamepadIcon, text: 'games' },
                  { icon: BookOpen, text: 'blog' },
                  { icon: Link2, text: 'links' },
                  { icon: MessageSquare, text: 'guestbook' },
                ].map((item, i) => (
                  <a
                    key={i}
                    href="#"
                    className="flex items-center gap-2 rounded-lg px-3 py-2 text-pink-700 transition-colors hover:bg-pink-100"
                  >
                    <item.icon className="h-4 w-4" />
                    <span className="font-pixel">{item.text}</span>
                  </a>
                ))}
              </nav>
            </Window>

            <Window title="♡ updates ♡">
              <div className="space-y-2 p-4 font-pixel text-pink-700">
                <p>→ new song released! check my music page</p>
                <p>→ updated my gaming collection</p>
                <p>→ added new pixel art to gallery</p>
              </div>
            </Window>

            <Window title="visitor count ♡">
              <div className="p-4 text-center font-pixel text-pink-700">
                {visitorCount.toString().padStart(6, '0')}
              </div>
            </Window>
          </div>

          {/* Main Content */}
          <div className="space-y-6">
            <Window title="♡ for you ♡">
              <div className="space-y-4 p-6">
                {/* Filters and Search */}
                <div className="space-y-4">
                  <input
                    type="text"
                    className="w-full rounded-md px-4 py-2"
                    placeholder="Search tracks..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <div className="flex gap-4">
                    <select
                      className="rounded-md px-4 py-2"
                      value={sortOption}
                      onChange={(e) => setSortOption(e.target.value)}
                    >
                      <option value="newest">Sort by Newest</option>
                      <option value="longest">Sort by Longest</option>
                    </select>
                    <select
                      className="rounded-md px-4 py-2"
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                    >
                      <option value="All">All Categories</option>
                      <option value="Electronic">Electronic</option>
                      <option value="Synthwave">Synthwave</option>
                      <option value="Chiptune">Chiptune</option>
                      <option value="Ambient">Ambient</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {currentTracks.map((track) => (
                    <div key={track.id} className="rounded-lg bg-pink-200/50 p-2">
                      <Link
                        href={`/track`} // Link to the track detail page
                        className="font-pixel text-pink-700 hover:underline"
                      >
                        <div>{track.title} - {track.artist}</div>
                        <div className="text-sm text-pink-600">
                          Category: {track.category} | Length: {track.length}
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
                <p className="text-center font-pixel text-pink-700">
                  hi! i make electronic music and play lots of games ♡
                </p>
              </div>
            </Window>

            {/* Page Number */}
            <div className="mt-8 text-center">
              <div className="inline-flex gap-4">
                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => handlePageChange(i + 1)}
                    className={`h-8 w-8 rounded ${i + 1 === currentPage ? 'bg-green-600 text-white' : 'bg-gray-200'} transition-colors`}
                    title={`Page ${i + 1}`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-4">
            <Window title="currently playing ♡">
              <div className="space-y-2 p-4">
                <div className="rounded-lg bg-pink-100 p-3">
                  <h3 className="font-pixel text-green-600">Fire Emblem</h3>
                  <p className="text-sm text-pink-600">Chapter 7: The Sealed Forest</p>
                </div>
                <div className="rounded-lg bg-pink-100 p-3">
                  <h3 className="font-pixel text-green-600">Xenoblade 3</h3>
                  <p className="text-sm text-pink-600">45 hours played</p>
                </div>
              </div>
            </Window>

            <Window title="status ♡">
              <div className="p-4">
                <p className="font-pixel text-pink-700">new audio just added! <br/> check it out!!</p>
              </div>
            </Window>

            <Window title="random stuff ♡">
              <div className="grid grid-cols-3 gap-2 p-4">
                {[...Array(9)].map((_, i) => (
                  <button
                    key={i}
                    className="aspect-square rounded bg-pink-100 transition-colors hover:bg-pink-200"
                  />
                ))}
              </div>
            </Window>
          </div>
        </div>
      </div>
    </div>
  )
}
