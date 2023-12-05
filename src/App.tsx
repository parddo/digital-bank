import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ConsultationView, HomeView, NotFound } from "./views";
import { Toaster } from "react-hot-toast";
import { useState } from "react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const App = () => {
  const [client] = useState(new QueryClient());

  return (
    <QueryClientProvider client={client}>
      <BrowserRouter>
        <Routes>
          <Route path="/" Component={HomeView} />
          <Route path="/consulta" Component={ConsultationView} />
          <Route path="*" Component={NotFound} />
        </Routes>
      </BrowserRouter>
      <Toaster />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default App;
