export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white to-blue-50 px-4 py-8">
      <div className="w-full max-w-md bg-white/90 rounded-2xl shadow-xl p-8 flex flex-col items-center">
        <h1 className="text-3xl font-bold mb-6 text-gray-900" style={{ fontFamily: 'Inter, sans-serif' }}>Sign In</h1>
        <form className="w-full flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none text-base bg-white font-medium transition"
            style={{ fontFamily: 'Inter, sans-serif' }}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none text-base bg-white font-medium transition"
            style={{ fontFamily: 'Inter, sans-serif' }}
            required
          />
          <button
            type="submit"
            className="px-4 py-2 text-sm font-bold text-white rounded-lg shadow-md bg-gradient-to-r from-[#4A90E2] to-[#8E2DE2] transition-transform transition-shadow duration-200 hover:scale-105 hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-blue-300"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            Sign In
          </button>
        </form>
        <a
          href="#"
          className="mt-4 text-sm text-blue-600 hover:underline"
          style={{ fontFamily: 'Inter, sans-serif' }}
        >
          Forgot password?
        </a>
        <div className="w-full flex items-center my-6">
          <div className="flex-grow h-px bg-gray-200" />
          <span className="mx-3 text-gray-400 text-sm">or</span>
          <div className="flex-grow h-px bg-gray-200" />
        </div>
        <button
          className="w-full flex items-center justify-center gap-2 py-3 font-semibold text-gray-700 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition duration-200 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-200"
          style={{ fontFamily: 'Inter, sans-serif' }}
        >
          <svg width="20" height="20" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><g clipPath="url(#clip0_17_40)"><path d="M47.5 24.5C47.5 22.6 47.3 20.8 47 19H24V29.1H37.4C36.7 32.2 34.7 34.7 31.8 36.4V42H39.5C44 38.1 47.5 32.1 47.5 24.5Z" fill="#4285F4"/><path d="M24 48C30.6 48 36.1 45.9 39.5 42L31.8 36.4C29.9 37.6 27.6 38.3 24 38.3C17.7 38.3 12.2 34.2 10.3 28.7H2.3V34.4C5.7 41.1 14.1 48 24 48Z" fill="#34A853"/><path d="M10.3 28.7C9.8 27.5 9.5 26.2 9.5 24.8C9.5 23.4 9.8 22.1 10.3 20.9V15.2H2.3C0.8 18.1 0 21.4 0 24.8C0 28.2 0.8 31.5 2.3 34.4L10.3 28.7Z" fill="#FBBC05"/><path d="M24 9.7C27.9 9.7 30.7 11.3 32.2 12.7L39.6 6.1C36.1 2.7 30.6 0 24 0C14.1 0 5.7 6.9 2.3 15.2L10.3 20.9C12.2 15.4 17.7 9.7 24 9.7Z" fill="#EA4335"/></g><defs><clipPath id="clip0_17_40"><rect width="48" height="48" fill="white"/></clipPath></defs></svg>
          Sign in with Google
        </button>
      </div>
    </div>
  );
} 