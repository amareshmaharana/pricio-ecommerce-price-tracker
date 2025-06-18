import axios from "axios";
import * as cheerio from "cheerio";
import { extractCurrency, extractDescription, extractPrice } from "../utils";

export const scrapeAmazonProduct = async (url: string) => {
  if (!url) return;

  // brightData proxy configuration
  const username = String(process.env.BRIGHT_DATA_USERNAME);
  const password = String(process.env.BRIGHT_DATA_PASSWORD);

  const port = 33335;
  const session_id = (1000000 * Math.random()) | 0;

  const options = {
    auth: {
      username: `${username}-session-${session_id}`,
      password,
    },
    host: "brd.superproxy.io",
    port,
    rejectUnauthorized: false,
  };

  try {
    // fetching the product page
    const response = await axios.get(url, options);
    const $ = cheerio.load(response.data);

    // extracting the product details

    {
      /* FOR TITLE */
    }
    const title = $("#productTitle").text().trim();
    const currentPrice = extractPrice(
      $(".priceToPay span.a-price-whole"),
      $("a.size.base.a-color-price"),
      $(".a-button-selected .a-color-base")
    );

    // console.log("Title:", title);
    // console.log("Current Price:", currentPrice);
    

    {
      /* FOR ORIGINAL PRICE */
    }
    const originalPrice = extractPrice(
      $("#priceblock_ourprice"),
      $(".a-price.a-text-price span.a-offscreen"),
      $("#listPrice"),
      $("#priceblock_dealprice"),
      $(".a-size-base.a-color-price")
    );

    // console.log(originalPrice);
    

    {
      /* FOR OUT OF STOCK */
    }
    const outOfStock =
      $("#availability span").text().trim().toLowerCase() ===
      "currently unavailable";

    {
      /* FOR IMAGES */
    }
    const images =
      $("#imgBlkFront").attr("data-a-dynamic-image") ||
      $("#landingImage").attr("data-a-dynamic-image") ||
      "{}";

    {
      /* FOR IMAGE URLs */
    }
    const imageUrls = Object.keys(JSON.parse(images));

    {
      /* FOR CURRENCY */
    }
    const currency = extractCurrency($(".a-price-symbol"));

    {
      /* FOR DISCOUNT RATE */
    }
    const discountRate = $(".savingsPercentage").text().replace(/[-%]/g, "");

    {
      /* FOR DESCRIPTION */
    }
    const description = extractDescription($);

    // constructing the data object with scraped information
    const data = {
      url,
      currency: currency || "$",
      image: imageUrls[0],
      title,
      currentPrice: Number(currentPrice) || Number(originalPrice),
      originalPrice: Number(originalPrice) || Number(currentPrice),
      priceHistory: [],
      discountRate: Number(discountRate),
      category: "category",
      reviewsCount: 100,
      stars: 4.5,
      isOutOfStock: outOfStock,
      description: description,
      lowestPrice: Number(currentPrice) || Number(originalPrice),
      highestPrice: Number(originalPrice) || Number(currentPrice),
      average: Number(currentPrice) || Number(originalPrice),
    };

    return data;
  } catch (error: any) {
    throw new Error(`Failed to scrape product: ${error.message}`);
  }
};
