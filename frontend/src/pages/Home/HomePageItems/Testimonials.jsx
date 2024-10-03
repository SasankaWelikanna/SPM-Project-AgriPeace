import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import { MdNavigateNext, MdNavigateBefore } from "react-icons/md";
import { Navigation, Autoplay } from "swiper"; // Import the required Swiper modules

const AgricultureTestimonials = () => {
  return (
    <div className="bg-gradient-to-r from-secondary via-green-200 dark:from-green-950 dark:via-green-900 dark:to-green-800 to-white py-10">
      <h2 className="max-w-xl text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl px-10 dark:text-white mb-4">
        Read trusted reviews from our customers
      </h2>
      <div className="relative px-4 sm:px-10">
        <Swiper
          spaceBetween={20} // Space between slides for mobile
          slidesPerView={1} // Show 1 slide at once for mobile
          navigation={{
            nextEl: ".swiper-button-next", // Button for next slide
            prevEl: ".swiper-button-prev", // Button for previous slide
          }}
          autoplay={{ delay: 5000 }} // Automatically change slides every 5 seconds
          loop={true} // Enable infinite loop
          modules={[Navigation, Autoplay]} // Add Navigation and Autoplay modules here
          className="testimonials-swiper"
          breakpoints={{
            // Mobile view
            320: {
              slidesPerView: 1, // Show 1 slide at once
              spaceBetween: 20, // Space between slides for mobile
            },
            // Tablet view
            640: {
              slidesPerView: 1.5, // Show 1.5 slides for tablets
              spaceBetween: 20, // Space between slides for tablets
            },
            // Larger screens (Laptop and Desktop remain the same)
            1024: {
              slidesPerView: 1, // Show 1 slide at a time
              spaceBetween: 30, // Space between slides for larger screens
            },
          }}
        >
          <SwiperSlide>
            <div className="flex flex-col sm:flex-row space-y-6 sm:space-y-0 sm:space-x-6">
              <blockquote className="flex-1 bg-white dark:bg-slate-700 rounded-lg p-6 shadow-sm">
                <div>
                  <p className="text-2xl font-bold text-green-600">
                    "AgriPeace has transformed my farming practices!"
                  </p>
                  <p className="mt-4 leading-relaxed text-gray-700 dark:text-white">
                    "Before using AgriPeace, I struggled to manage my crop
                    rotation and fertilizer distribution. The tools they provide
                    have helped me make better decisions, increasing my yields
                    and optimizing costs. It's been a game-changer for me."
                  </p>
                </div>
                <footer className="mt-4 text-sm font-medium text-gray-700 dark:text-white">
                  &mdash; Sunil Fernando, Small-Scale Farmer
                </footer>
              </blockquote>

              <blockquote className="flex-1 bg-white dark:bg-slate-700 rounded-lg p-6 shadow-sm">
                <div>
                  <p className="text-2xl font-bold text-green-600">
                    "A must-have for modern farmers!"
                  </p>
                  <p className="mt-4 leading-relaxed text-gray-700 dark:text-white">
                    "AgriPeace's Fertilizer Distribution Tracker has saved me
                    countless hours of manual calculations. Now I can focus on
                    improving my crop health and sustainability. The insights I
                    get are invaluable."
                  </p>
                </div>
                <footer className="mt-4 text-sm font-medium text-gray-700 dark:text-white">
                  &mdash; Priya De Silva, Organic Farm Owner
                </footer>
              </blockquote>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="flex flex-col sm:flex-row space-y-6 sm:space-y-0 sm:space-x-6">
              <blockquote className="flex-1 bg-white dark:bg-slate-700 rounded-lg p-6 shadow-sm">
                <div>
                  <p className="text-2xl font-bold text-green-600">
                    "AgriPeace made our farm more sustainable!"
                  </p>
                  <p className="mt-4 leading-relaxed text-gray-700 dark:text-white">
                    "The plant disease recognition feature helped us avoid major
                    losses this season. With AgriPeace, we’re not just managing
                    crops, but we’re improving sustainability for the future."
                  </p>
                </div>
                <footer className="mt-4 text-sm font-medium text-gray-700 dark:text-white">
                  &mdash; Rajitha Kumarasinghe, Commercial Farm Manager
                </footer>
              </blockquote>

              <blockquote className="flex-1 bg-white dark:bg-slate-700 rounded-lg p-6 shadow-sm">
                <div>
                  <p className="text-2xl font-bold text-green-600">
                    "The best tool for precision farming!"
                  </p>
                  <p className="mt-4 leading-relaxed text-gray-700 dark:text-white">
                    "With AgriPeace, we've optimized water and fertilizer usage
                    by analyzing soil conditions. This has not only saved costs
                    but also reduced environmental impact. Highly recommend it
                    to any farmer looking to scale up their business."
                  </p>
                </div>
                <footer className="mt-4 text-sm font-medium text-gray-700 dark:text-white">
                  &mdash; Anil Perera, Commercial Crop Farmer
                </footer>
              </blockquote>
            </div>
          </SwiperSlide>

          {/* Navigation Buttons */}
          <div className="swiper-button-next absolute top-1/2 right-6 transform -translate-y-1/2 text-2xl text-green-600 cursor-pointer">
            <MdNavigateNext />
          </div>
          <div className="swiper-button-prev absolute top-1/2 left-6 transform -translate-y-1/2 text-2xl text-green-600 cursor-pointer">
            <MdNavigateBefore />
          </div>
        </Swiper>
      </div>
    </div>
  );
};

export default AgricultureTestimonials;
