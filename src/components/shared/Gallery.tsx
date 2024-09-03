import React, { useState, useEffect, useRef } from "react";
import { Button } from "primereact/button";
import { Galleria, GalleriaProps } from "primereact/galleria";
import Image from "next/image";

type Item = { itemImageSrc: string; alt: string; thumbnailImageSrc?: string };

type Props = {
  galleriaRef: React.MutableRefObject<any>;
  photos: Item[];
};

export default function Gallery({ galleriaRef, photos }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const responsiveOptions = [
    {
      breakpoint: "1500px",
      numVisible: 5,
    },
    {
      breakpoint: "1024px",
      numVisible: 3,
    },
    {
      breakpoint: "768px",
      numVisible: 2,
    },
    {
      breakpoint: "560px",
      numVisible: 1,
    },
  ];

  const itemTemplate = (item: Item) => {
    return (
      <img
        src={item.itemImageSrc}
        alt={item.alt}
        style={{ width: "100%", display: "block" }}
      />
    );
  };

  const thumbnailTemplate = (item: Item) => {
    return (
      <img
        src={item.itemImageSrc}
        alt={item.alt}
        style={{ width: "50px", display: "block" }}
      />
    );
  };

  return (
    <div className="card flex justify-content-center">
      <Galleria
        className="mt-10"
        ref={galleriaRef}
        value={photos}
        responsiveOptions={responsiveOptions}
        numVisible={9}
        style={{ maxWidth: "100%" }}
        circular
        fullScreen
        showItemNavigators
        item={itemTemplate}
        showThumbnails={false}
        activeIndex={activeIndex}
        thumbnail={thumbnailTemplate}
      />

      <div className="w-full">
        <img
          src={photos[activeIndex].itemImageSrc}
          onClick={() => {
            setActiveIndex(0);
            galleriaRef.current.show();
          }}
        />
      </div>
    </div>
  );
}
