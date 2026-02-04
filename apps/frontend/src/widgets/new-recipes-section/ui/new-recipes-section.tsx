import { type FC, useRef } from "react";
import { Swiper as SwiperType } from "swiper";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import { useFilteredRecipes } from "@/features/select-filters";

import { CATEGORIES_DATA } from "@/entities/category";
import { RecipeCard, useRecipeClick } from "@/entities/recipe";

import { useIsAboveLaptopDevice } from "@/shared/lib/use-media-query.ts";
import { UiTypography } from "@/shared/ui/ui-typography";

import { NextButton, PrevButton } from "./slider-navigation";

import styles from "./new-recipes.module.scss";

const NewRecipesSection: FC = () => {
  const isAboveLaptopDevice = useIsAboveLaptopDevice();
  const { data: response } = useFilteredRecipes({
    sortBy: "createdAt",
    limit: 10,
    transformResponse: true,
  });
  const swiperRef = useRef<SwiperType | null>(null);
  const handleRecipeClick = useRecipeClick();

  return (
    <section className={styles.section}>
      <UiTypography variant="xl-5" fontWeight="medium">
        Новые рецепты
      </UiTypography>

      <div className={styles.container}>
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
              1536: {
                slidesPerView: 4,
                spaceBetween: 24,
              },
              1280: {
                slidesPerView: 3.1,
                spaceBetween: 24,
              },
              1024: {
                slidesPerView: 2.6,
                spaceBetween: 24,
              },
              768: {
                slidesPerView: 4.3,
                spaceBetween: 12,
              },
              640: {
                slidesPerView: 2.6,
                spaceBetween: 12,
              },
              460: {
                slidesPerView: 3.1,
                spaceBetween: 12,
              },
              320: {
                slidesPerView: 2.2,
                spaceBetween: 12,
              },
            }}
          >
            {response?.data?.map((recipe) => (
              <SwiperSlide key={recipe._id} className={styles.slide}>
                <RecipeCard
                  {...recipe}
                  className={styles.card}
                  direction="column"
                  hideDescription={isAboveLaptopDevice}
                  onClick={() => handleRecipeClick(recipe, CATEGORIES_DATA)}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default NewRecipesSection;
