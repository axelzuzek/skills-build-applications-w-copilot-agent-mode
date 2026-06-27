function App() {
  return (
    <main className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card shadow-lg border-0 rounded-4">
            <div className="card-body p-5">
              <p className="text-uppercase text-primary fw-semibold mb-3">OctoFit Tracker</p>
              <h1 className="display-5 fw-bold mb-3">Track workouts, teams, and progress in one place.</h1>
              <p className="lead text-muted mb-4">
                This modern multi-tier application is now scaffolded with a React 19 frontend,
                an Express and TypeScript backend, and MongoDB-ready data access.
              </p>
              <div className="d-flex gap-3 flex-wrap">
                <a className="btn btn-primary btn-lg" href="http://localhost:8000/api/health">
                  Check API health
                </a>
                <span className="btn btn-outline-secondary btn-lg disabled">Frontend: 5173</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default App
