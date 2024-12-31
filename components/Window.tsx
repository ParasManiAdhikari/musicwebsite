export default function Window({ title, children }: { title: string; children: React.ReactNode }) {
    return (
      <div className="overflow-hidden rounded-lg border-2 border-pink-200 bg-white/80 backdrop-blur">
        <div className="border-b-2 border-pink-200 bg-gradient-to-r from-pink-200 to-purple-200 px-4 py-2">
          <h2 className="font-pixel text-sm text-pink-700">{title}</h2>
        </div>
        {children}
      </div>
    )
  }