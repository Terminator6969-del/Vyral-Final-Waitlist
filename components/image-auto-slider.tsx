import React from 'react';

export const Component = () => {
  // Videos from Cloudflare R2
  const images = [
    "https://pub-bd60cb77333a4df49184f57ef9bb5a5f.r2.dev/1125.mp4",
    "https://pub-bd60cb77333a4df49184f57ef9bb5a5f.r2.dev/1125(1).mp4",
    "https://pub-bd60cb77333a4df49184f57ef9bb5a5f.r2.dev/1125(2).mp4",
    "https://pub-bd60cb77333a4df49184f57ef9bb5a5f.r2.dev/1125(3).mp4",
    "https://pub-bd60cb77333a4df49184f57ef9bb5a5f.r2.dev/1125(4).mp4",
    "https://pub-bd60cb77333a4df49184f57ef9bb5a5f.r2.dev/1125(5).mp4"
  ];

  // Duplicate images for seamless loop
  const duplicatedImages = [...images, ...images];

  return (
    <>
      <style>{`
        html, body {
          margin: 0;
          padding: 0;
          overflow-x: hidden;
          font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }

        @keyframes scroll-right {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .infinite-scroll {
          animation: scroll-right 20s linear infinite;
        }

        .scroll-container {
          mask: linear-gradient(
            90deg,
            transparent 0%,
            black 10%,
            black 90%,
            transparent 100%
          );
          -webkit-mask: linear-gradient(
            90deg,
            transparent 0%,
            black 10%,
            black 90%,
            transparent 100%
          );
        }

        .image-item {
          transition: transform 0.3s ease, filter 0.3s ease;
        }

        .image-item:hover {
          transform: scale(1.05);
          filter: brightness(1.1);
        }
      `}</style>

      <div className="w-full min-h-[400px] bg-transparent relative overflow-hidden flex items-center justify-center">

        {/* Scrolling images container */}
        <div className="relative z-10 w-full flex items-center justify-center py-8">
          <div className="scroll-container w-full">
            <div className="infinite-scroll flex gap-6 w-max px-6">
              {duplicatedImages.map((image, index) => (
                <div
                  key={index}
                  className="image-item flex-shrink-0 w-48 h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 rounded-xl overflow-hidden shadow-2xl"
                >
                  <video
                    src={image}
                    className="w-full h-full object-cover"
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="metadata"
                    disablePictureInPicture
                    disableRemotePlayback
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
