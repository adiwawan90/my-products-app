import { useCategories } from "./useCategories";

const useGetCategories = () => {
  const { data, error } = useCategories();

  const categoryOption =
    data?.map((item) => ({
      label: item?.name,
      value: item?.id,
    })) || [];

  return {
    data,
    categoryOption,
  };
};

export default useGetCategories;
