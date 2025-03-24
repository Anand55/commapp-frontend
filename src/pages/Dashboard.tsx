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
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStudents = async () => {
      const token = localStorage.getItem("access_token");
      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const response = await axios.get<Student[]>("http://127.0.0.1:8000/students", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setStudents(response.data);
      } catch (error) {
        alert("Unauthorized");
        navigate("/login");
      }
    };

    fetchStudents();
  }, [navigate]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Students</h2>
      <ul>
        {students.map((student) => (
          <li key={student.id} className="border p-2 my-2">
            {student.name} - {student.class_name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
