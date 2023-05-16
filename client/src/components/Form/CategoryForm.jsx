import React from "react";

const CategoryForm = ({ handleSubmit, value, setValue }) => {
  return (
    <>
      <form onSubmit={handleSubmit} >
        <div >
          <input
            type="text"
            className="p-3 w-96 border"
            placeholder="Enter new category"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </div>

        <button type="submit" className="bg-secondary border py-1 text-lg px-6 my-5 font-[500]">
          Add
        </button>
      </form>
    </>
  );
};

export default CategoryForm;
