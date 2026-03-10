import React from "react";
import { useForm } from "react-hook-form";
import "./SearchBar.css";

function SearchBar({ onSearch }) {

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();

  const onSubmit = (data) => {
    console.log(data.city)
    onSearch(data.city)
  };

  return (
    <div className="search-container">

      <form onSubmit={handleSubmit(onSubmit)} className="search-form">

        <input
          type="text"
          placeholder="Enter city name..."
          className="search-input"
          {...register("city", {
            required: "City name is required",
            minLength: {
              value: 2,
              message: "City must be at least 2 characters"
            },
            pattern: {
              value: /^[A-Za-z\s]+$/,
              message: "Only letters allowed"
            }
          })}
        />

        <button type="submit" className="search-btn">
          Search
        </button>

      </form>

      {errors.city && (
        <p className="error-text">{errors.city.message}</p>
      )}

    </div>
  );
}

export default SearchBar;