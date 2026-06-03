export default function Home() {
  return (
    <div className="min-h-screen bg-[#0f0f0f] flex items-center justify-center font-sans">
      <div className="text-center px-8">
        <h1 className="text-5xl font-bold text-[#f5f5f5] mb-4">Hello, World</h1>
        <p className="text-lg text-[#a3a3a3] mb-8">Just a simple static page. Nothing to see here.</p>
        <span className="inline-block bg-[#e8a045] text-[#0f0f0f] font-semibold px-6 py-2 rounded-full text-sm">
          Deployed with Vercel
        </span>
      </div>
    </div>
  );
}
