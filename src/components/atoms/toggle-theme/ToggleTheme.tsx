import { useTheme } from "next-themes";
import { Switch } from "antd";

const ToggleTheme: React.FC = () => {
  const { theme, setTheme } = useTheme();

  return (
    <Switch
      checked={theme === "dark"}
      onChange={(checked) => setTheme(checked ? "dark" : "light")}
      checkedChildren="Dark"
      unCheckedChildren="Light"
    />
  );
};

export default ToggleTheme;
