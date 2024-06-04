import Input from "@/components/atoms/input/Input";
import Select from "@/components/atoms/select/Select";
import TextArea from "@/components/atoms/textarea/TextareaInput";
import { Product } from "@/interface/product";
import useGetCategories from "@/utils/hook/useGetCategories";
import { useUpdateProduct } from "@/utils/hook/useProducts";
import { zodResolver } from "@hookform/resolvers/zod";
import { Modal } from "antd";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface FormModalUpdateProps {
  isModalOpen: boolean;
  handleOk: () => void;
  handleCancel: () => void;
  item?: Product;
}
const FormModalUpdate: React.FC<FormModalUpdateProps> = ({
  isModalOpen,
  handleOk,
  handleCancel,
  item,
}) => {
  const productSchema = z.object({
    title: z.string().nonempty("Title is required"),
    price: z.number().positive("Price must be a positive number"),
    description: z.string().nonempty("Description is required"),
    categoryId: z.number().positive("Category ID must be a positive number"),
  });

  type ProductFormData = z.infer<typeof productSchema>;
  const {
    register,
    setValue,
    handleSubmit,
    getValues,
    formState: { errors, isSubmitting, isValid, isDirty },
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema, {}, { raw: true }),
    defaultValues: {
      title: item?.title || undefined,
      price: item?.price || undefined,
      categoryId: item?.category?.id || undefined,
      description: item?.description || undefined,
    },
  });

  useEffect(() => {
    if (item) {
      setValue("title", item?.title);
      setValue("price", item?.price);
      setValue("categoryId", item?.category?.id);
      setValue("description", item?.description);
    }
  }, [item]);

  const { mutate: updateProduct, error } = useUpdateProduct();
  const { categoryOption } = useGetCategories();

  const onSubmit = async (data: ProductFormData) => {
    try {
      await updateProduct({ id: item?.id, ...data });
      handleOk(); // Close the modal on successful update
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  return (
    <Modal
      title="Update Product"
      open={isModalOpen}
      onOk={handleSubmit(onSubmit)}
      onCancel={handleCancel}
    >
      <div className="">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 gap-3 lg:max-w-screen-lg"
        >
          <Input
            label="Title"
            {...register("title")}
            error={errors.title?.message}
            name="title"
            required
          />
          <div className="grid md:grid-cols-2 sm:grid-cols-1 gap-3">
            <Select
              label="Category"
              options={categoryOption}
              error={errors.categoryId?.message}
              onChange={(v) => setValue("categoryId", Number(v.target.value))}
              name="categoryId"
              required
            />
            <Input
              label="Price"
              // {...register("price")}
              error={errors.price?.message}
              defaultValue={getValues().price}
              type="number"
              onChange={(v) => setValue("price", Number(v.target.value))}
              name="price"
              required
            />
          </div>
          <TextArea
            label="Description"
            {...register("description")}
            error={errors.description?.message}
            name="description"
            required
          />
        </form>
      </div>
    </Modal>
  );
};

export default FormModalUpdate;
