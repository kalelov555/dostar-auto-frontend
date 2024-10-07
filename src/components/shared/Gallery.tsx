import React, { useState } from "react";
import ImageGallery from "react-image-gallery";

type Props = {
  items: string[];
};

export default function Gallery({ items }: Props) {
  const [fullScrinned, setFullScrinned] = useState(false);
  const images = items?.map((url) => ({
    original: url,
    thumbnail: url,
  }));

  const onClickFullScreen = (cb: () => void, isFullScreen: boolean) => {
    cb();
    if (isFullScreen) setFullScrinned(false);
    else setFullScrinned(false);
  };
  return (
    <ImageGallery
      additionalClass="flex justify-center items-center"
      showPlayButton={false}
      items={images}
      showThumbnails={false}
      renderItem={(item) => {
        return (
          <div
            className={`w-full ${
              fullScrinned ? "h-auto" : "h-[200px] lg:h-[400px]"
            } flex items-center justify-center`}
            style={{ position: "relative", overflow: "hidden" }}
          >
            <img
              src={item.original}
              alt={item.original}
              style={{
                maxWidth: "100%",
                maxHeight: "100%",
                objectFit: "contain", // This ensures the images are not distorted
              }}
            />
          </div>
        );
      }}
      renderFullscreenButton={(onClick, isFullscreen) => (
        <div
          style={{ filter: "drop-shadow(0 2px 2px #1a1a1a)" }}
          onClick={() => onClickFullScreen(onClick as () => void, isFullscreen)}
          className="w-10 h-10 bottom-0 right-0 absolute flex items-center justify-center z-50 shadow-2xl"
        >
          <i
            className={`text-white pi ${
              isFullscreen ? "pi-window-minimize" : "pi-window-maximize"
            }`}
          ></i>
        </div>
      )}
    />
  );
}
