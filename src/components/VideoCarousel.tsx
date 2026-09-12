import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { type Video, VideoTags } from '../types';
import '../styles/video-carousel.css';

const videos: Video[] = [
  {
    title: 'GodotCon 2025: Introducing 3D Tiles for Godot',
    thumbnail: "https://img.youtube.com/vi/oC_8CfYWP7c/0.jpg",
    url: "https://youtu.be/oC_8CfYWP7c?si=4fQUxb5zW3aLnXP7",
    tags: [VideoTags.Talk],
  },
  {
    title: 'Hazel Game Code Review',
    thumbnail: "https://i.ytimg.com/vi/WOnMkazhP5I/hq720.jpg?sqp=-oaymwEnCNAFEJQDSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLCszaYQl_cHD-ckEb00fML9U7riQg",
    url: "https://youtu.be/WOnMkazhP5I?si=9J-e32vS5rdULpbR",
    tags: [VideoTags.DemoShowcase],
  },
];

const AUTOPLAY_INTERVAL = 6000;

const VideoCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userPaused, setUserPaused] = useState(false);

  const next = useCallback(() => {
    setCurrentIndex(i => (i + 1) % videos.length);
  }, []);

  const prev = useCallback(() => {
    setCurrentIndex(i => (i === 0 ? videos.length - 1 : i - 1));
  }, []);

  const handlePrev = () => {
    setUserPaused(true);
    prev();
  };

  const handleNext = () => {
    setUserPaused(true);
    next();
  };

  const goTo = (index: number) => {
    setUserPaused(true);
    setCurrentIndex(index);
  };

  useEffect(() => {
    if (userPaused) return;
    const timer = setInterval(next, AUTOPLAY_INTERVAL);
    return () => clearInterval(timer);
  }, [userPaused, next]);

  return (
    <div className="video-carousel-container">
      <div className="carousel-wrapper">
        <h2 className="section-title">Featured Videos</h2>
        <div className="carousel-track-outer">
          <button className="carousel-button prev" onClick={handlePrev} aria-label="Previous">
            <ChevronLeft size={22} />
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
                          <span key={tagIndex} className="tag">{tag}</span>
                        ))}
                      </div>
                    </div>
                  </a>
                </div>
              ))}
            </div>
          </div>
          <button className="carousel-button next" onClick={handleNext} aria-label="Next">
            <ChevronRight size={22} />
          </button>
        </div>
        <div className="carousel-dots">
          {videos.map((_, i) => (
            <button
              key={i}
              className={`carousel-dot${i === currentIndex ? ' active' : ''}`}
              onClick={() => goTo(i)}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default VideoCarousel;
