export default function Home() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <header className="bg-primary text-white py-8 px-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold">Civil Registry</h1>
          <p className="text-orange-100 mt-2">Document Management System</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-6xl mx-auto px-6 py-12 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Welcome Section */}
          <div className="bg-gray-50 p-8 rounded-lg border border-gray-200">
            <h2 className="text-2xl font-bold text-secondary mb-4">Welcome</h2>
            <p className="text-gray-700 mb-4">
              Welcome to the Civil Registry application. This system helps manage and track civil documents efficiently.
            </p>
            <p className="text-gray-700">
              Use the navigation menu to access different features and manage your documents.
            </p>
          </div>

          {/* Quick Stats */}
          <div className="bg-gray-50 p-8 rounded-lg border border-gray-200">
            <h2 className="text-2xl font-bold text-secondary mb-4">Quick Stats</h2>
            <div className="space-y-3">
              <p className="text-gray-700">
                <span className="font-semibold text-primary">Status:</span> System Ready
              </p>
              <p className="text-gray-700">
                <span className="font-semibold text-primary">Version:</span> 0.1.0
              </p>
              <p className="text-gray-700">
                <span className="font-semibold text-primary">Database:</span> Connected
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-secondary text-white py-6 px-6 mt-12">
        <div className="max-w-6xl mx-auto text-center">
          <p>&copy; 2026 Civil Registry. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
