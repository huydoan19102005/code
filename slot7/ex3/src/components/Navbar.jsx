export default function Navbar() {
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light" style={{ backgroundColor: 'transparent' }}>
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">Active</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="#" style={{ color: '#0056b3' }}>Link</a> {/* Active link color */}
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#" style={{ color: '#007bff' }}>Link</a> {/* Regular link color */}
                            </li>
                            <li className="nav-item">
                                <a className="nav-link disabled" aria-disabled="true" style={{ color: '#6c757d' }}>Disabled</a> {/* Disabled link color */}
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
}