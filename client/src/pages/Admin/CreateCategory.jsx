import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import CategoryForm from "../../components/Form/CategoryForm";
import Modal from "../../components/Modal/Modal";
import AdminLayout from "../../components/Layout/AdminLayout";
import { BiEditAlt } from "react-icons/bi";
import { AiOutlineDelete } from "react-icons/ai";

const CreateCategory = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updatedName, setUpdatedName] = useState("");
  //handle Form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/v1/category/create-category", {
        name,
      });
      if (data?.success) {
        toast.success(`${name} is created`);
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      // toast.error("somthing went wrong in input form");
    }
  };

  //get all cat
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category");
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something wwent wrong in getting catgeory");
    }
  };
  //update category
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `/api/v1/category/update-category/${selected._id}`,
        { name: updatedName }
      );
      if (data?.success) {
        toast.success(`${updatedName} is updated`);
        setSelected(null);
        setUpdatedName("");
        setVisible(false);
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  //delete category
  const handleDelete = async (pId) => {
    try {
      const { data } = await axios.delete(
        `/api/v1/category/delete-category/${pId}`
      );
      if (data.success) {
        toast.success(`category is deleted`);

        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Somtihing went wrong");
    }
  };
  useEffect(() => {
    getAllCategory();
  }, []);
  return (
    <AdminLayout title={"Dashboard - Create Category"}>
      <div className="container mx-auto">
        <div>
          <p className="text-3xl font-[600]">Manage Category</p>
        </div>
        <div className="w-50">
          <CategoryForm
            handleSubmit={handleSubmit}
            value={name}
            setValue={setName}
          />
        </div>
        <div className="overflow-x-auto">
          <table className="bg-white w-96">
            <thead>
              <tr>
                <th className="border px-4 py-2">#</th>
                <th className="border px-4 py-2">Category</th>
                <th className="border px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories?.map((c, index) => (
                <tr className="text-center">
                  <td key={c._id} className="border px-4 py-2">
                    {index + 1}
                  </td>
                  <td key={c._id} className="border px-4 py-2">
                    {c.name}
                  </td>
                  <td className="border px-4 py-2">
                    <button
                      onClick={() => {
                        setVisible(true);
                        setUpdatedName(c.name);
                        setSelected(c);
                      }}
                      className="text-xl text-[blue]"
                    >
                      <BiEditAlt />
                    </button>
                    <button
                      onClick={() => {
                        handleDelete(c._id);
                      }}
                      className="text-xl text-[red]"
                    >
                      <AiOutlineDelete />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {visible && (
          <Modal setVisible={setVisible} visible={visible}>
            <CategoryForm
              value={updatedName}
              setValue={setUpdatedName}
              handleSubmit={handleUpdate}
            />
          </Modal>
        )}
      </div>
    </AdminLayout>
  );
};

export default CreateCategory;
