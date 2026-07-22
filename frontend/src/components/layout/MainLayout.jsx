import Navbar from "../home/Navbar";

function MainLayout({ children }) {
  return (
    <>
      <Navbar />

      <main>{children}</main>
    </>
  );
}

export default MainLayout;