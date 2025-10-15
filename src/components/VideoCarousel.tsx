
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Video, VideoTags } from '../types';
import '../styles/video-carousel.css';

const videos: Video[] = [
  {
    title: 'GodotCon 2025: Introducing 3D Tiles for Godot',
    thumbnail: "https://img.youtube.com/vi/oC_8CfYWP7c/0.jpg",
    url: "https://youtu.be/oC_8CfYWP7c?si=4fQUxb5zW3aLnXP7",
    tags: [VideoTags.Talk],
  },
];

const VideoCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? videos.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === videos.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="video-carousel-container">
      <h2 className="section-title">Featured Videos</h2>
      <div className="carousel">
        <button className="carousel-button prev" onClick={handlePrev}>
          <ChevronLeft size={32} />
        </button>
        <div className="carousel-track-container">
          <div
            className="carousel-track"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {videos.map((video, index) => (
              <div className="video-card" key={index}>
                <a href={video.url} target="_blank" rel="noopener noreferrer">
                  <div className="video-thumbnail">
                    <img src={video.thumbnail} alt={video.title} />
                    <div className="play-button"></div>
                  </div>
                  <div className="video-info">
                    <h3 className="video-title">{video.title}</h3>
                    <div className="video-tags">
                      {video.tags.map((tag, tagIndex) => (
                        <span key={tagIndex} className="tag">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </a>
              </div>
            ))}
          </div>
        </div>
        <button className="carousel-button next" onClick={handleNext}>
          <ChevronRight size={32} />
        </button>
      </div>
    </div>
  );
};

export default VideoCarousel;
