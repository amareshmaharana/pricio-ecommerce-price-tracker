import Image from "next/image"

import SearchBar from "@/components/SearchBar"
import HeroCarousel from "@/components/HeroCarousel"
import { getAllProducts } from "@/lib/actions"
import ProductCard from "@/components/ProductCard"

const Home = async () => {
  const allProducts = await getAllProducts()

  return (
    <>
      <section className="px-6 md:px-20 py-4 2xl:px-44">
        <div className="flex max-xl:flex-col gap-16">
          <div className="flex flex-col justify-center font-spaceGrotesk">
            <p className="small-text">
              Smart shopping starts from here:
              <Image src="/assets/icons/arrow-right.svg" alt="arrow_right" width={16} height={16} />
            </p>

            <h1 className="head-text">
              Unleash the power of 
              Pri<span className="text-primary">Cio</span>
            </h1>
            <p className="mt-6">
              Powerful, self-serve product and growth analytics help u to connect, engage, and retain more.
            </p>
            <SearchBar />
          </div>
          <HeroCarousel />
        </div>
      </section>

      <section className="trending-section">
        <h2 className="section-text font-spaceGrotesk">Trending</h2>

        <div className="flex flex-wrap gap-x-8 gap-y-16">
          {allProducts?.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </section>
    </>
  )
}

export default Home