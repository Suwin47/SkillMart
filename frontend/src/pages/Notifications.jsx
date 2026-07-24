import Navbar from "../components/home/Navbar";
import Footer from "../components/home/Footer";
import NotificationsList from "../components/notifications/NotificationsList";

function Notifications() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-slate-50 py-10">
        <div className="mx-auto max-w-5xl px-6">

          <h1 className="mb-8 text-4xl font-bold">
            Notifications
          </h1>

          <NotificationsList />

        </div>
      </main>

      <Footer />
    </>
  );
}

export default Notifications;