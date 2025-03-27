import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

interface Student {
  id: number;
  name: string;
  class_name: string;
}

const Dashboard = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStudents = async () => {
      const token = localStorage.getItem("access_token");
      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const response = await axios.get("http://127.0.0.1:8000/students/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setStudents(response.data);
      } catch (err: any) {
        setError("Failed to fetch students. Please login again.");
        navigate("/login");
      }
    };

    fetchStudents();
  }, [navigate]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Student Dashboard</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <ul>
        {students.map((student) => (
          <li key={student.id} className="border p-2 my-2 rounded shadow">
            <strong>{student.name}</strong> — Class: {student.class_name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
