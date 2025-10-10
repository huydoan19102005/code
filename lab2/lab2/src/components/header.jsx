import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './home.css';

export default function Header() {
    return (

        <div style={{ backgroundColor: '#333333'}}>
            {/* Header */}

            <div style={{ backgroundColor: '#333333', padding: '15px 0' }}>
                <div className="container d-flex align-items-center justify-content-between">
                    <div className="d-flex align-items-center gap-4">

                        <div className="logo-text" style={{ 
                            fontSize: '28px', 
                            fontWeight: 'bold', 
                            color: '#fff', 
                            textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
                            letterSpacing: '1px'
                        }}>Pizza House</div>
                        
                        <a href="#" className="text-white text-decoration-none" style={{ fontSize: '16px' }}>Home</a>
                <a href="#" className="text-white text-decoration-none" style={{ fontSize: '16px' }}>About Us</a>
                        <a href="#" className="text-white text-decoration-none" style={{ fontSize: '16px' }}>Contact</a>
                    </div>



                    <form className="d-flex" role="search" onSubmit={(e) => e.preventDefault()}>
                        <div className="d-flex" style={{ width: 250 }}>
                            <input 
                                className="form-control form-control-sm" 
                                type="search" 
                                placeholder="Search" 
                                aria-label="Search" 
                                style={{ 
                                    borderTopRightRadius: '0',
                                    borderBottomRightRadius: '0',
                                    borderRight: 'none'
                                }} 
                            />

                            <button 
                                type="submit" 
                                className="btn btn-danger"
                                style={{ 
                                    borderTopLeftRadius: '0',
                                    borderBottomLeftRadius: '0',
                                    padding: '6px 12px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}
                            >

                                <i className="bi bi-search text-white"></i>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}