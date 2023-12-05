import { Link } from "react-router-dom";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps): React.ReactElement => (
  <div className="pt-24 h-screen w-full">
    <div className="w-full h-20 flex bg-bg justify-between items-center px-4 border-b border-white fixed top-0 left-0 right-0">
      <div>
        <h2 className="text-3xl font-bold">Digital Bank</h2>
      </div>
      <div>
        <ul className=" flex">
          <li className="mr-2 text-primary-500 font-semibold hover:text-primary-800">
            <Link to="/">Usuario</Link>
          </li>
          <li className="ml-2 text-primary-500 font-semibold hover:text-primary-800">
            <Link to="/consulta">Consulta</Link>
          </li>
        </ul>
      </div>
    </div>
    <div className="h-full w-full px-4">{children}</div>
  </div>
);

export default Layout;
