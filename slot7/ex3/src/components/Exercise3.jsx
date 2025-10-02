import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './Exercise3.css';

function App() {
    return (
        <div>
            {/* Main Grid Layout */}
            <div className="container my-4" >
                <div className="row gy-0 text-center">
                    <div className="col-6 bg-secondary text-dark py-2 border border-dark border-1">First col</div>
                    <div className="col-6 bg-secondary text-dark py-2 border border-dark border-1">Second col</div>
                </div>
                <div className="row gy-0 text-center">
                    <div className="col-4 bg-secondary text-dark py-2 border border-dark border-1">col</div>
                    <div className="col-4 bg-secondary text-dark py-2 border border-dark border-1">col</div>
                    <div className="col-4 bg-secondary text-dark py-2 border border-dark border-1">col</div>
                </div>
                <div className="row gy-0 text-center">
                    <div className="col-3 bg-secondary text-dark py-2 border border-dark border-1">col</div>
                    <div className="col-3 bg-secondary text-dark py-2 border border-dark border-1">col</div>
                    <div className="col-3 bg-secondary text-dark py-2 border border-dark border-1">col</div>
                    <div className="col-3 bg-secondary text-dark py-2 border border-dark border-1">col</div>
                </div>
            </div>

            {/* Footer */}
            <footer
                className="text-black text-center py-3"
                style={{
                    backgroundColor: '#D2C5C5',
                }}
            >
                <p style={{ fontWeight: 'bold', fontSize: '30px' }}>Created by ABC!</p>
            </footer>
        </div>
    );
}

export default App;