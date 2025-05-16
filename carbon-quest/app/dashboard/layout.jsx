import DashboardNavbar from "@/components/DashboardNavbar";

export default function DashboardLayout({ children }) {
  return (
    <>
      <DashboardNavbar />

      <section>{children}</section>
    </>
  );
}
