import { ConfigProvider } from "antd";
import { UserProvider } from "context/UserContext.tsx";
import "i18n/i18n";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./styles/_app.scss";

ReactDOM.createRoot(document.getElementById("root")!).render(
  // <React.StrictMode>
  <ConfigProvider
    theme={{
      token: {
        colorPrimaryBorderHover: "#22292f",
        colorPrimary: "#22292f",
        fontFamily: "Saira",
        borderRadius: 2,
      },
      components: {
        Select: {
          controlItemBgActive: "#22292f85",
        },
      },
    }}
  >
    <UserProvider>
      <App />
    </UserProvider>
  </ConfigProvider>
  // </React.StrictMode>
);
