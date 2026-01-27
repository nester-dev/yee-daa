import type { RefObject } from "react";
import cn from "clsx";
import SwiperInstance from "swiper";

import ArrowIcon from "@/shared/assets/icons/arrow-left.svg?react";

import styles from "./new-recipes.module.scss";

export interface SwiperButtonProps {
  swiperRef: RefObject<SwiperInstance | null>;
}

const NextButton = ({ swiperRef }: SwiperButtonProps) => {
  return (
    <button
      onClick={() => swiperRef.current?.slideNext()}
      className={cn(styles["nav-button"], styles["nav-button--right"])}
    >
      <ArrowIcon />
    </button>
  );
};

const PrevButton = ({ swiperRef }: SwiperButtonProps) => {
  return (
    <button
      onClick={() => swiperRef.current?.slidePrev()}
      className={cn(styles["nav-button"])}
    >
      <ArrowIcon />
    </button>
  );
};

export { NextButton, PrevButton };
