import React from "react";
import { useSearch } from "../../context/search";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
const SearchInput = () => {
  const [values, setValues] = useSearch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(
        `/api/v1/product/search/${values.keyword}`
      );
      setValues({ ...values, results: data });
      navigate("/search");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <form
        className="relative border  p-2 lg:block hidden"
        role="search"
        onSubmit={handleSubmit}
      >
        <input
          type="search"
          className="text-slate-400 outline-0 w-96 "
          placeholder="Search here"
          aria-label="Search"
          value={values.keyword}
          onChange={(e) => setValues({ ...values, keyword: e.target.value })}
        />
        <button
          className="absolute top-0 right-0 p-2 bg-secondary"
          type="submit"
        >
          <AiOutlineSearch className="text-black text-xl" />
        </button>
      </form>
    </div>
  );
};

export default SearchInput;
