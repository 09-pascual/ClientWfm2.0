export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 to-pink-600">
      <h1 className="text-5xl font-black text-center pt-20 text-white">
        Success! 🎉
      </h1>
      <div className="max-w-md mx-auto mt-10 p-6 bg-white/20 backdrop-blur-md rounded-xl">
        <p className="text-yellow-200 font-medium">
          Tailwind is properly configured!
        </p>
        <button className="mt-4 px-6 py-2 bg-white text-purple-600 font-bold rounded-lg hover:bg-purple-100 transition-all">
          Test Button
        </button>
      </div>
    </div>
  )
}