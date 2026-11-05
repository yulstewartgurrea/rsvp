export default function SetupMessage({ missing }) {
  return (
    <main className="flex min-h-svh items-center justify-center bg-warm-ivory px-4">
      <div className="w-full max-w-lg rounded-lg bg-white p-8 shadow-sm">
        <h1 className="text-lg font-medium text-taupe">The site isn't connected to Supabase yet</h1>
        <p className="mt-3 text-sm text-taupe">These settings are missing:</p>
        <ul className="mt-2 space-y-1 font-mono text-sm text-taupe-dark">
          {missing.map((name) => (
            <li key={name}>{name}</li>
          ))}
        </ul>
        <p className="mt-5 text-sm leading-relaxed text-taupe">
          <strong className="text-taupe-dark">Running locally:</strong> copy <code>.env.example</code> to{' '}
          <code>.env</code>, fill in the values, then stop and restart <code>npm run dev</code>.
        </p>
        <p className="mt-3 text-sm leading-relaxed text-taupe">
          <strong className="text-taupe-dark">On Vercel:</strong> add them under Project → Settings → Environment Variables,
          then redeploy.
        </p>
      </div>
    </main>
  )
}
