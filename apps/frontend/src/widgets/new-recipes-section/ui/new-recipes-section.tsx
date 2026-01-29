import { type FC, useRef } from "react";
import { Swiper as SwiperType } from "swiper";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import { RecipeCard, useGetAllRecipesQuery } from "@/entities/recipe";

import { UiTypography } from "@/shared/ui/ui-typography";

import { NextButton, PrevButton } from "./slider-navigation";

import styles from "./new-recipes.module.scss";

const NewRecipesSection: FC = () => {
  const { data: response } = useGetAllRecipesQuery({
    sortBy: "createdAt",
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
          modules={[Autoplay]}
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          loop={true}
          autoplay={{
            delay: 2000,
          }}
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
