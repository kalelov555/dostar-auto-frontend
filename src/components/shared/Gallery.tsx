import { GalleryImages } from "@/helpers/gallery";
import React, { useState } from "react";
import ImageGallery from "react-image-gallery";
import { ReactImageGalleryItem } from "react-image-gallery";

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
      additionalClass="flex lg:block jusitify-center items-center"
      showPlayButton={false}
      items={images}
      showThumbnails={false}
      renderItem={(item) => {
        return (
          <div
            className={`w-full ${
              fullScrinned ? "h-unset" : "h-[200px]"
            } flex items-center justify-center`}
          >
            <img src={item.original} alt={item.original} />
          </div>
        );
      }}
      renderFullscreenButton={(onClick, isFullscreen) => (
        <div
          onClick={() => onClickFullScreen(onClick as () => void, isFullscreen)}
          className="w-10 h-10 bottom-0 right-0 absolute flex items-center justify-center z-50 shadow-2xl"
        >
          <i
            style={{ textShadow: "0 0 black" }}
            className={`text-white pi ${
              isFullscreen ? "pi-window-minimize" : "pi-window-maximize"
            }`}
          ></i>
        </div>
      )}
    />
  );
}
