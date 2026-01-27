import { type FC, useRef } from "react";
import { Swiper as SwiperType } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import { RecipeCard } from "@/entities/recipe";
import { useGetAllRecipesQuery } from "@/entities/recipe/api/recipe-api.ts";

import { UiTypography } from "@/shared/ui/ui-typography";

import { NextButton, PrevButton } from "./slider-navigation";

import styles from "./new-recipes.module.scss";

const NewRecipesSection: FC = () => {
  const { data: response } = useGetAllRecipesQuery({
    sortBy: "likes",
  });

  const swiperRef = useRef<SwiperType | null>(null);

  return (
    <section className={styles.section}>
      <UiTypography variant="xl-5" fontWeight="medium">
        Новые рецепты
      </UiTypography>

      <div className={styles.slider}>
        <PrevButton swiperRef={swiperRef} />
        <NextButton swiperRef={swiperRef} />
        <Swiper
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          loop={true}
          breakpoints={{
            1440: {
              slidesPerView: 4,
              spaceBetween: 24,
            },
            768: {
              slidesPerView: 3.1,
              spaceBetween: 12,
            },
          }}
        >
          {response?.data?.map((recipe) => (
            <SwiperSlide key={recipe._id} className={styles.slide}>
              <RecipeCard {...recipe} direction="column" />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default NewRecipesSection;
