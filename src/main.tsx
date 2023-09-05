import React from "react";
import ReactDOM from "react-dom/client";
import RNGenerator from "./RNGenerator.tsx";
import SecretSettings from "./SecretSettings.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";

const router = createBrowserRouter([
	{
		path: "/",
		element: <RNGenerator />,
	},
  {
		path: "/secret",
		element: <SecretSettings />,
	},
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
);
