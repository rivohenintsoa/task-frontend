import { useState } from "react";
import { debounce } from "../../utils/debounce";
import { useTasks } from "../../hooks/useTasks";

export default function SearchInput() {
  const { fetchTasks } = useTasks();
  const [value, setValue] = useState("");

  const debouncedSearch = debounce((val: string) => {
    fetchTasks({ search: val });
  }, 500);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    debouncedSearch(e.target.value);
  };

  return (
    <input
      type="text"
      placeholder="Rechercher..."
      value={value}
      onChange={handleChange}
      className="w-full p-2 border rounded"
    />
  );
}