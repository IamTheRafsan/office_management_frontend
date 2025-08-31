import Link from "next/link";

export default function Navbar() {
  return (
    <nav
      style={{
        background: "#fff",
        padding: "10px",
        position: "fixed",
        top: 0,
        width: "100%",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
      }}
    >
      <h1 style={{ display: "inline-block", marginRight: "20px" }}>
        HR Dashboard
      </h1>
      <Link href="/" style={{ marginRight: "10px" }}>
        Home
      </Link>
      <Link href="/employees" style={{ marginRight: "10px" }}>
        Employees
      </Link>
      <Link href="/tasks" style={{ marginRight: "10px" }}>
        Tasks
      </Link>
      <Link href="/attendance" style={{ marginRight: "10px" }}>
        Attendance
      </Link>
      <Link href="/payroll" style={{ marginRight: "10px" }}>
        Payroll
      </Link>
    </nav>
  );
}
