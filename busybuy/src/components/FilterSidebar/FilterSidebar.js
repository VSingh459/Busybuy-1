import React from "react";
import styles from "./FilterSidebar.module.css";
import { useValue } from "../../context/productContext.js";

const FilterSidebar = () => {

  const { setSelectedCategories, setPriceRange, priceRange } = useValue();
  
  // ✅ Handle Price Slider Change
  const handlePriceChange = (event) => {
      setPriceRange(Number(event.target.value));  // Updates price in HomePage.js
  };

  // ✅ Handle Category Checkbox Change
  const handleCategoryChange = (event) => {
      const category = event.target.value;
      setSelectedCategories(prev => 
          event.target.checked 
              ? [...prev, category]  // ✅ Adds category to selected categories
              : prev.filter(c => c !== category) // ✅ Removes if unchecked
      );
  };

  return (
    <aside className={styles.filterContainer}>
      <h2>Filter</h2>

      {/* Price Filter */}
      <label htmlFor="price">Price: {priceRange}</label>
      <input
        type="range"
        id="price"
        min="1"
        max="100000"
        value={priceRange}
        className={styles.priceRange}
        step="10"
        onChange={handlePriceChange}  // ✅ Calls setPriceRange()
      />

      {/* Category Filter */}
      <h2>Category</h2>
      <div className={styles.categoryContainer}>
        {["men's clothing", "women's clothing", "jewelery", "electronics"].map(category => (
          <div className={styles.inputContainer} key={category}>
            <input
              type="checkbox"
              value={category}
              onChange={handleCategoryChange}  // ✅ Calls setCategories()
            />
            <label>{category}</label>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default FilterSidebar;
