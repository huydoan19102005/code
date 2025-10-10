import React from "react";
import HomeCarousel from "../components/Carousel/HomeCarousel";
import MovieCard from "../components/Movie/MovieCard";

export default function HomePage() {
    return (
        <div>
            <HomeCarousel />
            <div className="container-fluid mt-5">
                <div className="row">
                    <div className="col-12">
                        <div className="text-center mb-4">
                            <h2 className="display-6 fw-bold text-primary">Featured Movies Collections</h2>
                            <p className="lead text-muted">
                                Thêm thông tin về các bộ sưu tập phim nổi bật ở đây.
                            </p>
                        </div>
                        <MovieCard />
                    </div>
                </div>
            </div>
        </div>
    );
}