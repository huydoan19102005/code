import React, { useState } from "react";
import HomeCarousel from "../components/Carousel/HomeCarousel";
import MovieCard from "../components/Movie/MovieCard";
import Filter from "../components/Filter/Filter";
import NavBar from "../components/NavBar/NavBar";

export default function HomePage() {
  const [filteredMovies, setFilteredMovies] = useState([]);

  const handleFilterChange = (movies) => {
    setFilteredMovies(movies);
  };

  return (
    <div>
      <NavBar />
      <HomeCarousel />
      {/* Bạn có thể thêm các section tiếp theo của trang Home ở dưới */}
      <div className="container-fluid mt-5">
        <div className="row">
          <div className="col-12">
            <Filter onFilterChange={handleFilterChange} />
            <div className="text-center mb-4">
              <h2 className="display-6 fw-bold text-primary">Featured Movies Collections</h2>
              <p className="lead text-muted">
              Thêm thông tin về các bộ sưu tập phim nổi bật ở đây.
              </p>
            </div>
            <MovieCard filteredMovies={filteredMovies} />
          </div>
        </div>
      </div>
    </div>
  );
}
