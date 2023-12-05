import Layout from "../../components/layout";

const NotFound = (): React.ReactElement => (
  <Layout>
    <div className="w-full h-full flex justify-center items-center">
      <div className="text-center">
        <h2 className="text-primary-500 text-7xl font-semibold">404</h2>
        <p className="font-light text-3xl mt-4">Página no encontrada</p>
      </div>
    </div>
  </Layout>
);

export default NotFound;
