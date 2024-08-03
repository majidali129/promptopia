import "@/styles/globals.css";
import Nav from "@/components/Nav";
import Provider from "@/components/Provider";
import { Suspense } from "react";

export const metadata = {
  title: "Promptopia",
  description: "Discover & Share AI Prompts"
};

const Rootlayout = ({ children }) => {
  return (
    <html len="en">
      <body>
        <Provider>
          <div className="main">
            <div className="gradient"></div>
          </div>
          <main className="app">
            <Nav />
            <Suspense>{children}</Suspense>
          </main>
        </Provider>
      </body>
    </html>
  );
};

export default Rootlayout;
