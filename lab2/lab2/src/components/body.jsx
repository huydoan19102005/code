import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './home.css';

import pizza1 from './pizza2.jpg';
import pizza2 from './pizza1.jpg';
import pizza3 from './pizza3.jpg';
import pizza4 from './pizza4.jpg';
import pizza5 from './pizza5.jpg';

export default function Body() {
    return (
        <div style={{ backgroundColor: '#333333' }}>

            {/* Header Body */}
            <div className="hero-section" style={{
                backgroundImage: `url(${pizza1})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                height: '500px',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(0,0,0,0.4)'
                }}></div>

                <div className="text-center text-white" style={{ position: 'relative', zIndex: 2 }}>
                    <h1 style={{ fontSize: '48px', fontWeight: 'bold', marginBottom: '20px' }}>Neapolitan Pizza</h1>
                    <p style={{ fontSize: '18px', maxWidth: '600px', margin: '0 auto' }}>
                        If you are looking for a traditional Italian pizza, the Neapolitan is the best option!
                    </p>
                </div>


                <div style={{
                    position: 'absolute',
                    left: '20px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: 'white',
                    fontSize: '24px',
                    cursor: 'pointer'
                }}>
                    <i className="bi bi-chevron-left"></i>
                </div>
            </div>

            {/* Menu Body */}
            <div className="container py-5">
                <h2 className="text-white mb-5" style={{ fontSize: '36px', fontWeight: 'bold' }}>Our Menu</h2>
                <div className="row">
                    
                    <div className="col-md-4 mb-4">
                        <div className="card" style={{ backgroundColor: 'white', borderRadius: '10px', overflow: 'hidden' }}>
                            <img 
                                src={pizza3} 
                                className="card-img-top" 
                                alt="Mushroom Pizza"
                                style={{ height: '200px', objectFit: 'cover' }}
                            />
                            <div className="card-body">
                                <h5 className="card-title">Mushroom Pizza</h5>
                                <div className="d-flex align-items-center gap-2">
                                    <span style={{ color: '#333', fontWeight: 'bold' }}>$25.00</span>
                                </div>
                                <button className="btn btn-dark w-100 mt-3">Buy</button>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 mb-4">
                        <div className="card" style={{ backgroundColor: 'white', borderRadius: '10px', overflow: 'hidden' }}>
                            <div style={{ position: 'relative' }}>
                                <img 
                                    src={pizza4} 
                                    className="card-img-top" 
                                    alt="Hawaiian Pizza"
                                    style={{ height: '200px', objectFit: 'cover' }}
                                />
                                <span style={{
                                    position: 'absolute',
                                    top: '10px',
                                    left: '10px',
                                    backgroundColor: '#ffc107',
                                    color: 'black',
                                    padding: '5px 10px',
                                    borderRadius: '5px',
                                    fontSize: '12px',
                                    fontWeight: 'bold'
                                }}>NEW</span>
                            </div>
                            <div className="card-body">
                                <h5 className="card-title">Hawaiian Pizza</h5>
                                <div className="d-flex align-items-center gap-2">
                                    <span style={{ color: '#333', fontWeight: 'bold' }}>$30.00</span>
                                </div>
                                <button className="btn btn-dark w-100 mt-3">Buy</button>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 mb-4">
                        <div className="card" style={{ backgroundColor: 'white', borderRadius: '10px', overflow: 'hidden' }}>
                            <div style={{ position: 'relative' }}>
                                <img 
                                    src={pizza5} 
                                    className="card-img-top" 
                                    alt="Pesto Pizza"
                                    style={{ height: '200px', objectFit: 'cover' }}
                                />
                                <span style={{
                                    position: 'absolute',
                                    top: '10px',
                                    left: '10px',
                                    backgroundColor: '#ffc107',
                                    color: 'black',
                                    padding: '5px 10px',
                                    borderRadius: '5px',
                                    fontSize: '12px',
                                    fontWeight: 'bold'
                                }}>SALE</span>
                            </div>
                            <div className="card-body">
                                <h5 className="card-title">Pesto Pizza</h5>
                                <div className="d-flex align-items-center gap-2">
                                    <span style={{ textDecoration: 'line-through', color: '#666' }}>$50.00</span>
                                    <span style={{ color: '#ff6b35', fontWeight: 'bold' }}>$30.00</span>
                                </div>
                                <button className="btn btn-dark w-100 mt-3">Buy</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Order Body */}
            <div className="container py-5">
                <h2 className="text-white text-center mb-5" style={{ fontSize: '36px', fontWeight: 'bold' }}>Book Your Table</h2>
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div style={{ backgroundColor: 'white', padding: '40px', borderRadius: '10px' }}>
                            <div className="row mb-3">
                                <div className="col-md-4">
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        placeholder="Your Name *"
                                        style={{ padding: '12px' }}
                                    />
                                </div>
                                <div className="col-md-4">
                                    <input 
                                        type="email" 
                                        className="form-control" 
                                        placeholder="Your Email *"
                                        style={{ padding: '12px' }}
                                    />
                                </div>
                                <div className="col-md-4">
                                    <select className="form-control" style={{ padding: '12px' }}>
                                        <option>Select a Service</option>
                                        <option>Dine In</option>
                                        <option>Take Away</option>
                                        <option>Delivery</option>
                                    </select>
                                </div>
                            </div>
                            <div className="mb-4">
                                <textarea 
                                    className="form-control" 
                                    rows="4" 
                                    placeholder="Please write your comment"
                                    style={{ padding: '12px' }}
                                ></textarea>
                            </div>
                            <div className="text-center">
                                <button 
                                    className="btn" 
                                    style={{ 
                                        backgroundColor: '#ffd045ff', 
                                        color: 'black', 
                                        padding: '12px 40px',
                                        fontSize: '16px',
                                        fontWeight: 'bold',
                                        borderRadius: '5px'
                                    }}
                                >
                                    Send Message
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}