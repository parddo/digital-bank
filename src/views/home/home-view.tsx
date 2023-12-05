import Layout from "../../components/layout";
import FormUser from "../../components/form-user/form-user";

const HomeView = (): React.ReactElement => {
  return (
    <Layout>
      <div className="w-full h-20 flex items-center">
        <h2 className="text-3xl font-semibold text-primary-500">Usuario</h2>
      </div>
      <div className="mx-auto max-w-[500px] rounded-xl border border-primary-500 p-4">
        <div>
          <h2 className="full text-center text-3xl mb-8 mt-4 font-medium">
            Crear usuario
          </h2>
        </div>
        <FormUser action="create" />
      </div>
    </Layout>
  );
};

export default HomeView;
