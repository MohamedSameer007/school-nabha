import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
  Link,
} from "react-router-dom";
import {
  Card,
  Row,
  Col,
  Button,
  Nav,
  Navbar as RBNavbar,
  Table,
  Form,
  Badge,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,   // ✅ <-- Make sure this is included
  BarChart,
  Cell,
  Pie,
  PieChart,
  Bar,
  Legend,
} from "recharts";
import { useParams } from "react-router-dom";


/* -------------------- NAVBAR -------------------- */
function Navbar() {
  return (
    <RBNavbar bg="light" expand="lg" className="mb-3 px-3">
      <RBNavbar.Brand as={Link} to="/">
        School Nabha
      </RBNavbar.Brand>
      <Nav className="ms-auto">
        <button className="btn">
          go to →
        </button>
        <Nav.Link as={Link} to="/teacher/login">
          <button className="btn btn-outline-dark">
            Teacher Login
          </button>
        </Nav.Link>
        <Nav.Link as={Link} to="/admin/login">
          <button className="btn btn-outline-dark">
            Admin Login
          </button>
        </Nav.Link>
      </Nav>
    </RBNavbar>
  );
}

function StatsCard({ label, value, icon }) {
  return (
    <Card text="center shadow" className="m-2 p-3" style={{ minWidth: "130px" }}>
      <Card.Body>
        <div style={{ fontSize: "2rem" }}>{icon}</div>
        <div className="h6 mt-2">{label}</div>
        <div className="h4 fw-bold">{value}</div>
      </Card.Body>
    </Card>
  );
}

/* -------------------- LOGIN -------------------- */
function TeacherLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Save teacher email to localStorage
    localStorage.setItem("teacher", JSON.stringify({ email }));
    navigate("/teacher/dashboard");
  };

  const demoAccounts = [
    { label: "Teacher 1", email: "teacher@demo.com", password: "teach123" },
    { label: "Teacher 2", email: "teacher2@demo.com", password: "teacher123" },
  ];

  const useDemo = (account) => {
    localStorage.setItem("teacher", JSON.stringify({ email: account.email }));
    navigate("/teacher/dashboard"); // ➡️ Go straight to dashboard
    window.location.reload();
  };

  return (
    <div className="d-flex flex-column justify-content-center align-items-center p-4">
      {/* ---- Login Box ---- */}
      <div className="container p-4 shadow rounded bg-white my-4" style={{ maxWidth: 400 }}>
        <h2 className="mb-1">Teacher Login</h2>
        <Form onSubmit={handleLogin}>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </Form.Group>
          <Button type="submit" variant="primary" className="w-100">
            Login
          </Button>
        </Form>
      </div>

      {/* ---- Demo Accounts ---- */}
      <div className="shadow py-4 px-5 rounded">
        <h5 className="mb-3">Demo Accounts</h5>
        {demoAccounts.map((acc) => (
          <div
            key={acc.label}
            className="d-flex justify-content-between align-items-center mb-2 border p-2 rounded"
            style={{ minWidth: 200 }}
          >
            <span>{acc.label}</span>
            <Button
              size="sm"
              variant="outline-primary"
              onClick={() => useDemo(acc)}
            >
              Use
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}

/* -------------------- TEACHER DASHBOARD -------------------- */
function TeacherDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("teacher");
    navigate("/teacher/login");
  };

  return (
    <div className="container-fluid mt-3">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="shadow-3">Teacher Dashboard</h2>
        <Button variant="outline-danger" onClick={handleLogout}>
          Sign Out
        </Button>
      </div>

      <Nav variant="tabs" activeKey={activeTab} className="mb-3">
        {["overview", "lessons", "quizzes", "progress"].map((tab) => (
          <Nav.Item key={tab}>
            <Nav.Link
              eventKey={tab}
              onClick={() => setActiveTab(tab)}
              style={{ minWidth: 120 }}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </Nav.Link>
          </Nav.Item>
        ))}
      </Nav>

      {activeTab === "overview" && <OverviewTab setActiveTab={setActiveTab} />}
      {activeTab === "lessons" && <LessonsPage />}
      {activeTab === "quizzes" && <QuizzesPage />}
      {activeTab === "progress" && <ProgressPage />}
    </div>
  );
}

function OverviewTab({ setActiveTab }) {
  const navigate = useNavigate();
  return (
    <>
      <Row className="mt-4 mb-3">
        <Col><StatsCard label="Active Lessons" value="12" icon="📘" /></Col>
        <Col><StatsCard label="Total Students" value="85" icon="🧑‍🎓" /></Col>
        <Col><StatsCard label="Student Completed" value="45" icon="✔️" /></Col>
        <Col><StatsCard label="Student Not Completed" value="40" icon="❌" /></Col>
      </Row>

      <Card className="p-3 mb-2">
        <div>
          <b>Quick Actions</b>
          <br />
          <span className="text-secondary">Common tasks to get you started</span>
        </div>
        <Row className="mt-3">
          <Col xs={12} md={4} className="mb-2">
            <Button
              variant="dark"
              className="w-100 py-3"
              onClick={() => navigate("/teacher/upload-lesson")}
            >
              Upload New Lesson
            </Button>
          </Col>
          <Col xs={12} md={4} className="mb-2">
            <Button
              variant="outline-dark"
              className="w-100 py-3 shadow"
              onClick={() => navigate("/teacher/create-quiz")}
            >
              Create Quiz
            </Button>
          </Col>
          <Col xs={12} md={4} className="mb-2">
            <Button
              variant="outline-dark"
              className="w-100 py-3 shadow"
              onClick={() => setActiveTab("progress")} // <-- switches to Progress tab
            >
              View Progress
            </Button>

          </Col>
        </Row>
      </Card>
    </>
  );
}

/* ---- LESSONS ---- */
function LessonsPage() {
  const navigate = useNavigate();
  const lessons = [
    {
      id: 1,
      title: "Introduction to Algebra",
      desc: "Basic concepts of algebraic expressions and equations",
      date: "2024-01-15",
      views: 45,
      subject: "Mathematics",
      status: "published",
    },
    {
      id: 2,
      title: "Cell Structure and Function",
      desc: "Detailed study of plant and animal cell components",
      date: "2024-01-14",
      views: 32,
      subject: "Biology",
      status: "published",
    },
    {
      id: 3,
      title: "Shakespeare's Hamlet - Act 1",
      desc: "Analysis of characters and themes in Hamlet",
      date: "2024-01-13",
      views: 0,
      subject: "Literature",
      status: "draft",
    },
    {
      id: 4,
      title: "Newton's Laws of Motion",
      desc: "Understanding the three fundamental laws of motion",
      date: "2024-01-16",
      views: 27,
      subject: "Physics",
      status: "published",
    },
    {
      id: 5,
      title: "Introduction to Chemical Bonds",
      desc: "Ionic, covalent, and metallic bonds explained",
      date: "2024-01-17",
      views: 14,
      subject: "Chemistry",
      status: "published",
    },
    {
      id: 6,
      title: "World War II Overview",
      desc: "Major events and consequences of World War II",
      date: "2024-01-18",
      views: 22,
      subject: "History",
      status: "published",
    },
    {
      id: 7,
      title: "Pythagorean Theorem",
      desc: "Understanding the relationship between sides of a right triangle",
      date: "2024-01-19",
      views: 35,
      subject: "Mathematics",
      status: "published",
    },
    {
      id: 8,
      title: "Photosynthesis Process",
      desc: "Detailed explanation of how plants produce energy",
      date: "2024-01-20",
      views: 18,
      subject: "Biology",
      status: "draft",
    },
    {
      id: 9,
      title: "Romeo and Juliet - Act 2",
      desc: "Analysis of love and conflict in Act 2",
      date: "2024-01-21",
      views: 5,
      subject: "Literature",
      status: "published",
    },
    {
      id: 10,
      title: "Electromagnetic Waves",
      desc: "Types, properties, and applications of EM waves",
      date: "2024-01-22",
      views: 12,
      subject: "Physics",
      status: "draft",
    },
    {
      id: 11,
      title: "Acid-Base Reactions",
      desc: "Concepts of acids, bases, and neutralization reactions",
      date: "2024-01-23",
      views: 8,
      subject: "Chemistry",
      status: "published",
    },
    {
      id: 12,
      title: "Indian Independence Movement",
      desc: "Key events and leaders in India's struggle for freedom",
      date: "2024-01-24",
      views: 30,
      subject: "History",
      status: "published",
    }
  ];


  return (
    <div className="mt-4">
      <h3 className="mb-3">Lesson Management</h3>
      {lessons.map((l) => (
        <Card key={l.id} className="p-3 mb-3 mx-3 quiz shadow-1">
          <h5 className="mb-0 d-flex align-items-center">
            <span className="me-2 fs-5">📄</span>
            {l.title}
            <Badge
              bg={l.status === "published" ? "dark" : "secondary"}
              className="ms-3 text-capitalize"
            >
              {l.status}
            </Badge>
          </h5>
          <div className="ms-4 mb-2 text-secondary">{l.desc}</div>
          <div className="ms-4 d-flex align-items-center text-secondary mb-2">
            📅 {l.date} &nbsp;•&nbsp; 👁️ {l.views} views
            <Badge bg="light" text="dark" className="ms-3 p-2">
              {l.subject}
            </Badge>
          </div>
          <div className="ms-4">
            <Button size="sm" variant="outline-secondary" className="me-2" onClick={() => navigate(`/lesson/${l.id}`)}
            >Preview</Button>
            <Button size="sm" variant="outline-primary" className="me-2">Edit</Button>
            {l.status === "published" ? (
              <Button size="sm" variant="outline-warning" className="me-2">
                Unpublish
              </Button>
            ) : (
              <Button size="sm" variant="outline-success" className="me-2">
                Publish
              </Button>
            )}
            <Button size="sm" variant="outline-danger">Delete</Button>
          </div>
        </Card>
      ))}
    </div>
  );
}


function LessonPreviewPage() {

  const lessons = [
    {
      id: 1,
      title: "Introduction to Algebra",
      desc: "Basic concepts of algebraic expressions and equations",
      date: "2024-01-15",
      views: 45,
      subject: "Mathematics",
      status: "published",
    },
    {
      id: 2,
      title: "Cell Structure and Function",
      desc: "Detailed study of plant and animal cell components",
      date: "2024-01-14",
      views: 32,
      subject: "Biology",
      status: "published",
    },
    {
      id: 3,
      title: "Shakespeare's Hamlet - Act 1",
      desc: "Analysis of characters and themes in Hamlet",
      date: "2024-01-13",
      views: 0,
      subject: "Literature",
      status: "draft",
    },
    {
      id: 4,
      title: "Newton's Laws of Motion",
      desc: "Understanding the three fundamental laws of motion",
      date: "2024-01-16",
      views: 27,
      subject: "Physics",
      status: "published",
    },
    {
      id: 5,
      title: "Introduction to Chemical Bonds",
      desc: "Ionic, covalent, and metallic bonds explained",
      date: "2024-01-17",
      views: 14,
      subject: "Chemistry",
      status: "published",
    },
    {
      id: 6,
      title: "World War II Overview",
      desc: "Major events and consequences of World War II",
      date: "2024-01-18",
      views: 22,
      subject: "History",
      status: "published",
    },
    {
      id: 7,
      title: "Pythagorean Theorem",
      desc: "Understanding the relationship between sides of a right triangle",
      date: "2024-01-19",
      views: 35,
      subject: "Mathematics",
      status: "published",
    },
    {
      id: 8,
      title: "Photosynthesis Process",
      desc: "Detailed explanation of how plants produce energy",
      date: "2024-01-20",
      views: 18,
      subject: "Biology",
      status: "draft",
    },
    {
      id: 9,
      title: "Romeo and Juliet - Act 2",
      desc: "Analysis of love and conflict in Act 2",
      date: "2024-01-21",
      views: 5,
      subject: "Literature",
      status: "published",
    },
    {
      id: 10,
      title: "Electromagnetic Waves",
      desc: "Types, properties, and applications of EM waves",
      date: "2024-01-22",
      views: 12,
      subject: "Physics",
      status: "draft",
    },
    {
      id: 11,
      title: "Acid-Base Reactions",
      desc: "Concepts of acids, bases, and neutralization reactions",
      date: "2024-01-23",
      views: 8,
      subject: "Chemistry",
      status: "published",
    },
    {
      id: 12,
      title: "Indian Independence Movement",
      desc: "Key events and leaders in India's struggle for freedom",
      date: "2024-01-24",
      views: 30,
      subject: "History",
      status: "published",
    }
  ];

  const { id } = useParams();       // get lesson id from URL
  const navigate = useNavigate();
  const lesson = lessons.find(l => l.id === Number(id));

  if (!lesson) {
    return <div className="container mt-4">Lesson not found</div>;
  }

  return (
    <div className="container d-flex justify-content-center preview">
      <Card className="p-4 preview-body mb-3" style={{ width: "450px" }}>
        <h3 className="mb-3">{lesson.title}</h3>
        <img src="/video.jpg" />
        <div className="mt-2">
          <Badge bg="secondary" className="text-capitalize me-2" style={{ width: "100px" }}>{lesson.subject}</Badge>
          <Badge bg={lesson.status === "published" ? "dark" : "secondary"} className="text-capitalize">
            {lesson.status}
          </Badge>
        </div>
        <p className="text-secondary mt-3">{lesson.desc}</p>

        <div className="text-secondary mb-3">
          📅 {lesson.date} &nbsp;•&nbsp; 👁️ {lesson.views} views
        </div>

        <Button variant="outline-dark" onClick={() => navigate(-1)}>Back</Button>
      </Card>
    </div>
  );
}

/* ---- QUIZZES ---- */
function QuizzesPage() {
  const navigate = useNavigate();
  const quizzes = [
    {
      id: 1,
      title: "Algebra Fundamentals",
      status: "active",
      desc: "Test your understanding of basic algebraic concepts",
      questions: 10,
      duration: "30 min",
      due: "2024-01-25",
      completed: "18/25",
      tags: ["Math 101", "Math 102"],
    },
    {
      id: 2,
      title: "Cell Biology Quiz",
      status: "draft",
      desc: "Assessment on cell structure and organelles",
      questions: 15,
      duration: "45 min",
      due: "2024-01-30",
      completed: "0/22",
      tags: ["Biology A"],
    },
    {
      id: 3,
      title: "World War II History",
      status: "active",
      desc: "Covers major events and leaders of WWII",
      questions: 12,
      duration: "40 min",
      due: "2024-02-05",
      completed: "30/40",
      tags: ["History 201"],
    },
    {
      id: 4,
      title: "Shakespeare’s Plays",
      status: "archived",
      desc: "Quiz on themes, characters, and works of Shakespeare",
      questions: 20,
      duration: "50 min",
      due: "2023-12-15",
      completed: "45/50",
      tags: ["English Literature"],
    },
    {
      id: 5,
      title: "Introduction to Programming",
      status: "active",
      desc: "Covers basic Python syntax and problem solving",
      questions: 25,
      duration: "60 min",
      due: "2024-02-10",
      completed: "12/30",
      tags: ["Computer Science", "Python"],
    },
    {
      id: 6,
      title: "Geometry Challenge",
      status: "draft",
      desc: "Covers angles, triangles, and circle theorems",
      questions: 18,
      duration: "35 min",
      due: "2024-02-20",
      completed: "0/28",
      tags: ["Math 103"],
    },
    {
      id: 7,
      title: "Environmental Science Basics",
      status: "active",
      desc: "Covers ecosystems, climate, and conservation",
      questions: 14,
      duration: "40 min",
      due: "2024-02-18",
      completed: "20/30",
      tags: ["Science 202"],
    },
    {
      id: 8,
      title: "Grammar and Vocabulary",
      status: "active",
      desc: "Tests grammar rules, synonyms, and antonyms",
      questions: 22,
      duration: "55 min",
      due: "2024-03-01",
      completed: "15/25",
      tags: ["English 101"],
    },
    {
      id: 9,
      title: "Economics Principles",
      status: "draft",
      desc: "Quiz on supply, demand, and basic market concepts",
      questions: 16,
      duration: "50 min",
      due: "2024-03-10",
      completed: "0/18",
      tags: ["Economics A"],
    },
    {
      id: 10,
      title: "Chemistry Reactions",
      status: "active",
      desc: "Assessment on acids, bases, and chemical reactions",
      questions: 20,
      duration: "60 min",
      due: "2024-03-15",
      completed: "8/25",
      tags: ["Chemistry 101"],
    },
  ];


  return (
    <div className="mt-4">
      <h3 className="mb-3">Quiz Management</h3>
      {quizzes.map((q) => (
        <Card key={q.id} className="p-3 mb-3 mx-3 quiz shadow-1">
          <h5 className="mb-0 d-flex align-items-center">
            <span className="me-2 fs-5">📝</span>
            {q.title}
            <Badge
              bg={q.status === "active" ? "success" : "warning"}
              className="ms-3 text-capitalize"
            >
              {q.status}
            </Badge>
          </h5>
          <div className="ms-4 mb-2 text-secondary">{q.desc}</div>
          <div className="ms-4 text-secondary mb-2">
            {q.questions} questions • {q.duration} • Due: {q.due} • Completed: {q.completed}
          </div>
          <div className="ms-4 mb-2">
            {q.tags.map((t) => (
              <Badge key={t} bg="light" text="dark" className="me-2">{t}</Badge>
            ))}
          </div>
          <div className="ms-4">
            <Button size="sm" variant="outline-secondary" className="me-2" onClick={() => navigate(`/quizzes/preview/${q.id}`)}>Preview</Button>
            <Button size="sm" variant="outline-primary" className="me-2">Edit</Button>
            {q.status === "active" ? (
              <Button size="sm" variant="outline-danger">Close</Button>
            ) : (
              <Button size="sm" variant="outline-success">Activate</Button>
            )}
          </div>
        </Card>
      ))}
    </div>
  );
}

function QuizPreviewPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const quizzes = [
    {
      id: 1,
      title: "Algebra Fundamentals",
      status: "active",
      desc: "Test your understanding of basic algebraic concepts",
      questions: 10,
      duration: "30 min",
      due: "2024-01-25",
      completed: "18/25",
      tags: ["Math 101", "Math 102"],
      questionsList: [
        "Simplify: 2x + 3x",
        "Solve for x: x + 5 = 12",
        "Factor: x^2 + 5x + 6",
        "Find x: 2x - 4 = 10",
        "Simplify: 3(a + 4) - 2a",
        "Solve: 3x + 7 = 16",
        "Factor: x^2 - 9",
        "Find y if 2y + 3 = 11",
        "Simplify: 5x - 2x + 4",
        "Solve: 4x/2 = 8"
      ]
    },
    {
      id: 2,
      title: "Cell Biology Quiz",
      status: "draft",
      desc: "Assessment on cell structure and organelles",
      questions: 10,
      duration: "45 min",
      due: "2024-01-30",
      completed: "0/22",
      tags: ["Biology A"],
      questionsList: [
        "What is the function of the nucleus?",
        "Name the organelle responsible for energy production",
        "Define cytoplasm",
        "What structure controls what enters/exits a cell?",
        "Which organelle is responsible for protein synthesis?",
        "Describe the difference between plant and animal cells",
        "What is the function of mitochondria?",
        "Define endoplasmic reticulum",
        "What is the role of ribosomes?",
        "Explain the function of lysosomes"
      ]
    },
    {
      id: 3,
      title: "World War II History",
      status: "active",
      desc: "Covers major events and leaders of WWII",
      questions: 10,
      duration: "40 min",
      due: "2024-02-05",
      completed: "30/40",
      tags: ["History 201"],
      questionsList: [
        "When did World War II begin?",
        "Which countries were part of the Axis powers?",
        "Who was the Prime Minister of the UK during WWII?",
        "Name the US President during most of WWII",
        "What was D-Day?",
        "Explain the significance of Pearl Harbor",
        "Who was Adolf Hitler?",
        "Describe the Holocaust",
        "Which battle is considered a turning point in the Pacific?",
        "When did WWII end?"
      ]
    },
    {
      id: 4,
      title: "Shakespeare’s Plays",
      status: "archived",
      desc: "Quiz on themes, characters, and works of Shakespeare",
      questions: 10,
      duration: "50 min",
      due: "2023-12-15",
      completed: "45/50",
      tags: ["English Literature"],
      questionsList: [
        "Name three tragedies by Shakespeare",
        "Who is the protagonist in Macbeth?",
        "Which play features the characters Rosencrantz and Guildenstern?",
        "Define iambic pentameter",
        "Who wrote 'Romeo and Juliet'?",
        "What is the main theme of 'Othello'?",
        "Identify a famous soliloquy from Hamlet",
        "What role does Puck play in 'A Midsummer Night's Dream'?",
        "Who are the star-crossed lovers?",
        "What is the meaning of 'All the world's a stage'?"
      ]
    },
    {
      id: 5,
      title: "Introduction to Programming",
      status: "active",
      desc: "Covers basic Python syntax and problem solving",
      questions: 10,
      duration: "60 min",
      due: "2024-02-10",
      completed: "12/30",
      tags: ["Computer Science", "Python"],
      questionsList: [
        "What is a variable in Python?",
        "How do you write a comment in Python?",
        "What is the output of print(2 + 3 * 4)?",
        "Define a function in Python",
        "What does 'if' statement do?",
        "Explain a 'for' loop",
        "How do you create a list?",
        "What is a dictionary in Python?",
        "Explain the difference between '==' and '='",
        "Write a Python program to add two numbers"
      ]
    },
    {
      id: 6,
      title: "Geometry Challenge",
      status: "draft",
      desc: "Covers angles, triangles, and circle theorems",
      questions: 10,
      duration: "35 min",
      due: "2024-02-20",
      completed: "0/28",
      tags: ["Math 103"],
      questionsList: [
        "Calculate the sum of angles in a triangle",
        "Define an isosceles triangle",
        "What is the area of a circle?",
        "Explain the Pythagorean theorem",
        "Define a right-angled triangle",
        "What is the circumference of a circle?",
        "Find the missing angle in a triangle if two angles are 50° and 60°",
        "Define acute, obtuse, and right angles",
        "What is a tangent of a circle?",
        "Calculate the perimeter of a square with side 5"
      ]
    },
    {
      id: 7,
      title: "Environmental Science Basics",
      status: "active",
      desc: "Covers ecosystems, climate, and conservation",
      questions: 10,
      duration: "40 min",
      due: "2024-02-18",
      completed: "20/30",
      tags: ["Science 202"],
      questionsList: [
        "Define ecosystem",
        "What is biodiversity?",
        "Name three types of renewable energy",
        "Explain global warming",
        "What is deforestation?",
        "Describe the water cycle",
        "What is a food chain?",
        "Name two greenhouse gases",
        "Explain conservation of natural resources",
        "What is pollution?"
      ]
    },
    {
      id: 8,
      title: "Grammar and Vocabulary",
      status: "active",
      desc: "Tests grammar rules, synonyms, and antonyms",
      questions: 10,
      duration: "55 min",
      due: "2024-03-01",
      completed: "15/25",
      tags: ["English 101"],
      questionsList: [
        "Define a noun",
        "Give an example of a verb",
        "What is an adjective?",
        "Find the synonym of 'happy'",
        "Find the antonym of 'cold'",
        "Correct the sentence: 'She don't like apples.'",
        "Identify the subject in: 'John runs fast.'",
        "What is a preposition?",
        "Write a sentence using an adverb",
        "Correct the tense: 'I go to school yesterday.'"
      ]
    },
    {
      id: 9,
      title: "Economics Principles",
      status: "draft",
      desc: "Quiz on supply, demand, and basic market concepts",
      questions: 10,
      duration: "50 min",
      due: "2024-03-10",
      completed: "0/18",
      tags: ["Economics A"],
      questionsList: [
        "Define supply",
        "Define demand",
        "What is market equilibrium?",
        "Explain the law of demand",
        "Explain the law of supply",
        "What is opportunity cost?",
        "Define inflation",
        "What is GDP?",
        "Explain scarcity",
        "Give an example of a price ceiling"
      ]
    },
    {
      id: 10,
      title: "Chemistry Reactions",
      status: "active",
      desc: "Assessment on acids, bases, and chemical reactions",
      questions: 10,
      duration: "60 min",
      due: "2024-03-15",
      completed: "8/25",
      tags: ["Chemistry 101"],
      questionsList: [
        "Define an acid",
        "Define a base",
        "What is a neutralization reaction?",
        "Write the equation for HCl + NaOH",
        "Define oxidation",
        "Define reduction",
        "What is a catalyst?",
        "Explain endothermic reaction",
        "Explain exothermic reaction",
        "What is a chemical equation?"
      ]
    }
  ];

  const quiz = quizzes.find((q) => q.id === parseInt(id));

  if (!quiz) return <div className="mt-4">Quiz not found!</div>;

  return (
    <div className="d-flex justify-content-center">
      <div className="my-2" style={{ width: "700px" }}>
        <Card className="p-4 shadow-1">
          <h3>{quiz.title} <Badge bg={quiz.status}>{quiz.status}</Badge></h3>
          <p className="text-secondary">{quiz.desc}</p>
          <p>
            <strong>Questions:</strong> {quiz.questions} <br />
            <strong>Duration:</strong> {quiz.duration} <br />
            <strong>Due Date:</strong> {quiz.due} <br />
            <strong>Completed:</strong> {quiz.completed}
          </p>
          <div className="mb-1">
            {quiz.tags.map((t) => (
              <Badge key={t} bg="light" text="dark" className="me-2">{t}</Badge>
            ))}
          </div>

          <Card className="p-3 shadow-1 my-2">
            <h5>Sample Questions Assigned</h5>
            <ol>
              {quiz.questionsList.map((q, idx) => (
                <li key={idx}>{q}</li>
              ))}
            </ol>
          </Card>

          <Button variant="dark" className="mt-2" onClick={() => navigate(-1)}>
            ← Back
          </Button>
        </Card>
      </div>
    </div>
  );
}


/* ---- PROGRESS ---- */
function ProgressPage() {
  // 🔹 Demo Data (replace with API data later)
  const weeklyActivity = [
    { day: "Mon", active: 32 },
    { day: "Tue", active: 41 },
    { day: "Wed", active: 23 },
    { day: "Thu", active: 59 },
    { day: "Fri", active: 43 },
    { day: "Sat", active: 39 },
    { day: "Sun", active: 34 },
  ];

  const subjectPerformance = [
    { subject: "Math", score: 78 },
    { subject: "Science", score: 85 },
    { subject: "English", score: 72 },
    { subject: "History", score: 90 },
  ];

  const students = [
    {
      id: 1,
      name: "Alice Johnson",
      email: "alice.j@student.edu",
      lessons: 8,
      totalLessons: 10,
      quizzes: 5,
      totalQuizzes: 6,
      avgScore: 92,
      status: "Ahead",
      lastActivity: "2 hours ago",
    },
    {
      id: 2,
      name: "Bob Smith",
      email: "bob.s@student.edu",
      lessons: 6,
      totalLessons: 10,
      quizzes: 4,
      totalQuizzes: 6,
      avgScore: 78,
      status: "On Track",
      lastActivity: "1 day ago",
    },
    {
      id: 3,
      name: "Carol Davis",
      email: "carol.d@student.edu",
      lessons: 4,
      totalLessons: 10,
      quizzes: 2,
      totalQuizzes: 6,
      avgScore: 60,
      status: "Behind",
      lastActivity: "3 days ago",
    },
    {
      id: 4,
      name: "David Miller",
      email: "david.m@student.edu",
      lessons: 9,
      totalLessons: 10,
      quizzes: 6,
      totalQuizzes: 6,
      avgScore: 95,
      status: "Ahead",
      lastActivity: "1 hour ago",
    },
    {
      id: 5,
      name: "Emma Wilson",
      email: "emma.w@student.edu",
      lessons: 7,
      totalLessons: 10,
      quizzes: 5,
      totalQuizzes: 6,
      avgScore: 84,
      status: "On Track",
      lastActivity: "5 hours ago",
    },
    {
      id: 6,
      name: "Frank Harris",
      email: "frank.h@student.edu",
      lessons: 5,
      totalLessons: 10,
      quizzes: 3,
      totalQuizzes: 6,
      avgScore: 68,
      status: "Behind",
      lastActivity: "2 days ago",
    },
    {
      id: 7,
      name: "Grace Lee",
      email: "grace.l@student.edu",
      lessons: 10,
      totalLessons: 10,
      quizzes: 6,
      totalQuizzes: 6,
      avgScore: 99,
      status: "Ahead",
      lastActivity: "30 minutes ago",
    },
    {
      id: 8,
      name: "Henry Clark",
      email: "henry.c@student.edu",
      lessons: 6,
      totalLessons: 10,
      quizzes: 4,
      totalQuizzes: 6,
      avgScore: 80,
      status: "On Track",
      lastActivity: "8 hours ago",
    },
    {
      id: 9,
      name: "Isabella Moore",
      email: "isabella.m@student.edu",
      lessons: 3,
      totalLessons: 10,
      quizzes: 1,
      totalQuizzes: 6,
      avgScore: 55,
      status: "Behind",
      lastActivity: "5 days ago",
    },
    {
      id: 10,
      name: "Jack Thompson",
      email: "jack.t@student.edu",
      lessons: 8,
      totalLessons: 10,
      quizzes: 5,
      totalQuizzes: 6,
      avgScore: 90,
      status: "Ahead",
      lastActivity: "4 hours ago",
    },
    {
      id: 11,
      name: "Katie Anderson",
      email: "katie.a@student.edu",
      lessons: 7,
      totalLessons: 10,
      quizzes: 4,
      totalQuizzes: 6,
      avgScore: 82,
      status: "On Track",
      lastActivity: "12 hours ago",
    },
    {
      id: 12,
      name: "Leo Martinez",
      email: "leo.m@student.edu",
      lessons: 5,
      totalLessons: 10,
      quizzes: 3,
      totalQuizzes: 6,
      avgScore: 70,
      status: "Behind",
      lastActivity: "4 days ago",
    },
    {
      id: 13,
      name: "Mia Perez",
      email: "mia.p@student.edu",
      lessons: 9,
      totalLessons: 10,
      quizzes: 6,
      totalQuizzes: 6,
      avgScore: 96,
      status: "Ahead",
      lastActivity: "1 hour ago",
    },
    {
      id: 14,
      name: "Noah Wright",
      email: "noah.w@student.edu",
      lessons: 6,
      totalLessons: 10,
      quizzes: 4,
      totalQuizzes: 6,
      avgScore: 79,
      status: "On Track",
      lastActivity: "20 hours ago",
    },
    {
      id: 15,
      name: "Olivia Scott",
      email: "olivia.s@student.edu",
      lessons: 4,
      totalLessons: 10,
      quizzes: 2,
      totalQuizzes: 6,
      avgScore: 62,
      status: "Behind",
      lastActivity: "6 days ago",
    },
  ];


  const completionData = [
    { name: "Completed", value: 68, color: "#28a745" },
    { name: "In Progress", value: 22, color: "#ffc107" },
    { name: "Not Started", value: 10, color: "#dc3545" },
  ];

  return (
    <div className="mt-4">
      <h3 className="mb-4">Class Progress Tracking</h3>

      {/* ===== Stats Cards ===== */}
      <Row className="mb-4">
        <Col>
          <StatsCard label="Total Students" value="85" icon="👥" />
        </Col>
        <Col>
          <StatsCard label="Avg Completion" value="68%" icon="📚" />
        </Col>
        <Col>
          <StatsCard label="Avg Performance" value="81%" icon="🏆" />
        </Col>
        <Col>
          <StatsCard label="Active Today" value="32" icon="⏳" />
        </Col>
      </Row>

      {/* ===== Charts ===== */}
      <Row>
        <Col md={6}>
          <Card className="p-3 mb-3">
            <b>Weekly Activity</b>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart
                data={weeklyActivity}
                margin={{ top: 20, right: 20, bottom: 5, left: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="active"
                  stroke="#0d6efd"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </Col>

        <Col md={6}>
          <Card className="p-3 mb-3">
            <b>Subject Performance</b>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart
                data={subjectPerformance}
                margin={{ top: 20, right: 20, bottom: 5, left: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="subject" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="score" fill="#28a745" barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </Col>
      </Row>

      {/* ===== Student Progress + Completion Overview ===== */}
      <Row className="mt-4">
        {/* Left - Student List */}
        <Col md={8}>
          {students.map((s) => (
            <Card key={s.id} className="p-3 mb-3 student shadow-1">
              <div className="d-flex align-items-center">
                <div
                  className="rounded-circle bg-secondary text-white d-flex align-items-center justify-content-center me-3"
                  style={{ width: 50, height: 50 }}
                >
                  {s.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div style={{ flex: 1 }} className="">
                  <h5 className="mb-1">{s.name}</h5>
                  <div className="text-secondary small">{s.email}</div>
                  <div className="d-flex flex-wrap mt-2">
                    <div className="me-3">
                      Lessons: {s.lessons}/{s.totalLessons}
                    </div>
                    <div className="me-3">
                      Quizzes: {s.quizzes}/{s.totalQuizzes}
                    </div>
                    <div className="me-3">Avg Score: {s.avgScore}%</div>
                  </div>
                  <div className="text-secondary small">
                    Last activity: {s.lastActivity}
                  </div>
                </div>
                <Badge
                  bg={
                    s.status === "Ahead"
                      ? "success"
                      : s.status === "On Track"
                        ? "primary"
                        : "danger"
                  }
                  className="ms-2"
                >
                  {s.status}
                </Badge>
              </div>
            </Card>
          ))}
        </Col>

        {/* Right - Completion Overview */}
        <Col md={4}>
          <Card className="p-3">
            <h6>Completion Overview</h6>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={completionData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={90}
                  label
                >
                  {completionData.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <ul className="list-unstyled small">
              {completionData.map((c) => (
                <li key={c.name} className="mb-1">
                  <span
                    style={{
                      display: "inline-block",
                      width: 12,
                      height: 12,
                      backgroundColor: c.color,
                      marginRight: 6,
                    }}
                  />
                  {c.name}: {c.value}%
                </li>
              ))}
            </ul>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

/* ---- UPLOAD / CREATE ---- */
function UploadLessonPage() {
  const navigate = useNavigate();
  const [lessonFile, setLessonFile] = useState(null);

  const handleFileChange = (e) => {
    setLessonFile(e.target.files[0]);
  };

  const handleUpload = () => {
    if (!lessonFile) {
      alert("Please select a PDF file to upload!");
      return;
    }
    // You can handle your upload logic here (e.g., API call)
    console.log("Uploading:", lessonFile);
    navigate("/teacher/dashboard");
  };

  return (
    <div className="container-fluid mt-3">
      <Card className="p-4 shadow" style={{ maxWidth: 600, margin: "auto" }}>
        <h3>Upload New Lesson</h3>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Lesson Title</Form.Label>
            <Form.Control type="text" placeholder="Enter lesson title" />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter lesson description"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Subject</Form.Label>
            <Form.Select>
              <option>Mathematics</option>
              <option>Biology</option>
              <option>Literature</option>
              <option>Physics</option>
              <option>Chemistry</option>
              <option>History</option>
              <option>Computer Science</option>
              <option>Geography</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Upload PDF</Form.Label>
            <Form.Control
              type="file"
              accept="application/pdf"
              onChange={handleFileChange}
            />
          </Form.Group>

          <div className="d-flex justify-content-end">
            <Button
              variant="secondary"
              className="me-2"
              onClick={() => navigate("/teacher/dashboard")}
            >
              Cancel
            </Button>
            <Button variant="primary" onClick={handleUpload}>
              Upload
            </Button>
          </div>
        </Form>
      </Card>
    </div>
  );
}


function CreateQuizPage() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [questions, setQuestions] = useState([
    { question: "", optionA: "", optionB: "", optionC: "", optionD: "", answer: "" },
  ]);

  const addQuestion = () =>
    setQuestions([
      ...questions,
      { question: "", optionA: "", optionB: "", optionC: "", optionD: "", answer: "" },
    ]);

  const updateQuestion = (index, field, value) => {
    const updated = [...questions];
    updated[index][field] = value;
    setQuestions(updated);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Quiz Data:", { title, questions });
    // ➜ Here you would send data to backend or Firebase
    navigate("/teacher/dashboard");
  };

  return (
    <div className="container-fluid mt-3">
      <Card className="p-4 shadow my-3" style={{ maxWidth: 800, margin: "auto" }}>
        <h3>Create New Quiz</h3>
        <Form onSubmit={handleSubmit}>
          {/* Quiz title */}
          <Form.Group className="mb-3">
            <Form.Label>Quiz Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter quiz title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </Form.Group>

          {/* Dynamic question blocks */}
          {questions.map((q, i) => (
            <Card key={i} className="mb-3 p-3">
              <Form.Group className="mb-2">
                <Form.Label>Question {i + 1}</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Type question"
                  value={q.question}
                  onChange={(e) => updateQuestion(i, "question", e.target.value)}
                  required
                />
              </Form.Group>
              {["A", "B", "C", "D"].map((opt) => (
                <Form.Group key={opt} className="mb-2">
                  <Form.Label>Option {opt}</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder={`Option ${opt}`}
                    value={q[`option${opt}`]}
                    onChange={(e) =>
                      updateQuestion(i, `option${opt}`, e.target.value)
                    }
                    required
                  />
                </Form.Group>
              ))}
              <Form.Group>
                <Form.Label>Correct Answer (A/B/C/D)</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="e.g. A"
                  value={q.answer}
                  onChange={(e) => updateQuestion(i, "answer", e.target.value)}
                  required
                />
              </Form.Group>
            </Card>
          ))}

          <Button variant="secondary" className="me-2" onClick={addQuestion}>
            + Add Question
          </Button>
          <Button variant="primary" type="submit">
            Save Quiz
          </Button>
          <Button
            variant="outline-dark"
            className="ms-2"
            onClick={() => navigate("/teacher/dashboard")}
          >
            Cancel
          </Button>
        </Form>
      </Card>
    </div>
  );
}

/* -------------------- ADMIN -------------------- */
function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Save admin email to localStorage
    localStorage.setItem("admin", JSON.stringify({ email }));
    navigate("/admin/dashboard");
  };

  const demoAccounts = [
    { label: "Admin 1", email: "admin@demo.com", password: "admin123" },
    { label: "Admin 2", email: "admin2@demo.com", password: "admin123" },
  ];

  const useDemo = (account) => {
    localStorage.setItem("admin", JSON.stringify({ email: account.email }));
    navigate("/admin/dashboard"); // ➡️ Go straight to dashboard
    window.location.reload();
  };

  return (
    <div className="d-flex flex-column justify-content-center align-items-center p-4">
      {/* ---- Login Box ---- */}
      <div className="container p-4 shadow rounded bg-white my-4" style={{ maxWidth: 400 }}>
        <h2 className="mb-1">Admin Login</h2>
        <Form onSubmit={handleLogin}>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </Form.Group>
          <Button type="submit" variant="primary" className="w-100">
            Login
          </Button>
        </Form>
      </div>

      {/* ---- Demo Accounts ---- */}
      <div className="shadow py-4 px-5 rounded">
        <h5 className="mb-3">Demo Accounts</h5>
        {demoAccounts.map((acc) => (
          <div
            key={acc.label}
            className="d-flex justify-content-between align-items-center mb-2 border p-2 rounded"
            style={{ minWidth: 200 }}
          >
            <span>{acc.label}</span>
            <Button
              size="sm"
              variant="outline-primary"
              onClick={() => useDemo(acc)}
            >
              Use
            </Button>
          </div>
        ))}
      </div>

    </div>
  );
}

function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("admin");
    navigate("/admin/login");
  };

  // ✅ Teacher Data
  // ✅ Teacher Data
  const teachers = [
    {
      id: 1,
      name: "Sarah Johnson",
      email: "sarah.johnson@riverside.edu",
      phone: "(555) 123-4567",
      school: "Riverside High School",
      subject: "Mathematics",
      since: 2023,
      students: 85,
      lessons: 24,
      status: "active",
      skills: ["Algebra", "Geometry", "Calculus"],
    },
    {
      id: 2,
      name: "Michael Chen",
      email: "michael.chen@central.edu",
      phone: "(555) 234-5678",
      school: "Central Elementary",
      subject: "Science",
      since: 2022,
      students: 120,
      lessons: 18,
      status: "active",
      skills: ["Biology", "Chemistry"],
    },
    {
      id: 3,
      name: "Priya Singh",
      email: "priya.singh@greenwood.edu",
      phone: "(555) 345-6789",
      school: "Greenwood Academy",
      subject: "English",
      since: 2021,
      students: 95,
      lessons: 30,
      status: "active",
      skills: ["Grammar", "Literature", "Creative Writing"],
    },
    {
      id: 4,
      name: "David Miller",
      email: "david.miller@northview.edu",
      phone: "(555) 456-7890",
      school: "Northview High",
      subject: "History",
      since: 2020,
      students: 110,
      lessons: 20,
      status: "active",
      skills: ["World History", "Civics"],
    },
    {
      id: 5,
      name: "Emily Davis",
      email: "emily.davis@lakeside.edu",
      phone: "(555) 567-8901",
      school: "Lakeside Middle School",
      subject: "Computer Science",
      since: 2023,
      students: 70,
      lessons: 15,
      status: "inactive",
      skills: ["Python", "Web Development"],
    },
    {
      id: 6,
      name: "Carlos Martinez",
      email: "carlos.martinez@southfield.edu",
      phone: "(555) 678-9012",
      school: "Southfield Elementary",
      subject: "Physical Education",
      since: 2019,
      students: 150,
      lessons: 40,
      status: "active",
      skills: ["Fitness", "Sports Training"],
    },
  ];

  // ✅ Student Data
  const students = [
    {
      id: 1,
      name: "Alice Johnson",
      email: "alice.johnson@student.edu",
      school: "Riverside High School",
      grade: "11th",
      enrolled: "2023-08-15",
      lessons: { done: 18, total: 24 },
      quizzes: { done: 8, total: 10 },
      avgScore: 92,
      parentEmail: "parent.johnson@email.com",
      parentPhone: "(555) 123-4566",
      status: "active",
    },
    {
      id: 2,
      name: "Bob Smith",
      email: "bob.smith@student.edu",
      school: "Central Elementary",
      grade: "5th",
      enrolled: "2022-09-01",
      lessons: { done: 10, total: 20 },
      quizzes: { done: 5, total: 8 },
      avgScore: 85,
      parentEmail: "parent.smith@email.com",
      parentPhone: "(555) 987-6543",
      status: "active",
    },
    {
      id: 3,
      name: "Liam Brown",
      email: "liam.brown@student.edu",
      school: "Greenwood Academy",
      grade: "8th",
      enrolled: "2021-06-12",
      lessons: { done: 22, total: 30 },
      quizzes: { done: 10, total: 12 },
      avgScore: 88,
      parentEmail: "parent.brown@email.com",
      parentPhone: "(555) 222-3344",
      status: "active",
    },
    {
      id: 4,
      name: "Sophia Patel",
      email: "sophia.patel@student.edu",
      school: "Northview High",
      grade: "10th",
      enrolled: "2022-01-05",
      lessons: { done: 15, total: 25 },
      quizzes: { done: 7, total: 10 },
      avgScore: 90,
      parentEmail: "parent.patel@email.com",
      parentPhone: "(555) 333-4455",
      status: "active",
    },
    {
      id: 5,
      name: "Ethan Wilson",
      email: "ethan.wilson@student.edu",
      school: "Lakeside Middle School",
      grade: "7th",
      enrolled: "2023-02-20",
      lessons: { done: 12, total: 18 },
      quizzes: { done: 4, total: 6 },
      avgScore: 78,
      parentEmail: "parent.wilson@email.com",
      parentPhone: "(555) 444-5566",
      status: "inactive",
    },
    {
      id: 6,
      name: "Olivia Garcia",
      email: "olivia.garcia@student.edu",
      school: "Southfield Elementary",
      grade: "4th",
      enrolled: "2020-11-10",
      lessons: { done: 25, total: 30 },
      quizzes: { done: 12, total: 15 },
      avgScore: 95,
      parentEmail: "parent.garcia@email.com",
      parentPhone: "(555) 555-6677",
      status: "active",
    },
  ];


  // ✅ Recent Activity (for Overview)
  const recentActivity = [
    { id: 1, text: "New teacher registered", detail: "John Smith at Riverside High", time: "1 hour ago" },
    { id: 2, text: "School enrollment updated", detail: "Central Elementary +25 students", time: "3 hours ago" },
    { id: 3, text: "System maintenance completed", detail: "Database optimization finished", time: "6 hours ago" },
    { id: 4, text: "New school onboarded", detail: "Greenwood Academy joined the system", time: "1 day ago" },
  ];

  // ✅ System Status
  const systemStatus = {
    server: "Operational",
    db: "Excellent",
    response: "142ms",
    storage: "65% of 1TB",
    sessions: "1,247",
  };

  // ✅ Download Helper
  const downloadReport = (type) => {
    const data = type === "teachers" ? teachers : students;

    // Create CSV header from object keys
    const keys = Object.keys(data[0]);
    const csvRows = [
      keys.join(","), // header
      ...data.map(row => keys.map(k => JSON.stringify(row[k] ?? "")).join(",")),
    ];
    const csv = csvRows.join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${type}_report.csv`;
    link.click();
  };


  return (
    <div className="container-fluid mt-3">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Admin Dashboard</h2>
        <Button variant="outline-danger" onClick={handleLogout}>
          Sign Out
        </Button>
      </div>

      {/* Tabs */}
      <Nav variant="tabs" activeKey={activeTab} className="mb-3">
        {["overview", "teachers", "students", "reports"].map((tab) => (
          <Nav.Item key={tab}>
            <Nav.Link eventKey={tab} onClick={() => setActiveTab(tab)}>
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </Nav.Link>
          </Nav.Item>
        ))}
      </Nav>

      {/* Overview */}
      {activeTab === "overview" && (
        <>
          {/* Quick Actions */}
          <Row className="mb-4">
            <Col>
              <button className="w-100 p-3 btn btn-dark">
                🏫 School Overview
              </button>
            </Col>
            <Col>
              <button className="w-100 p-3 btn btn-outline-dark shadow" onClick={() => setActiveTab("teachers")}>
                👨‍🏫 Manage Teachers
              </button>
            </Col>
            <Col>
              <button className="w-100 p-3 btn btn-outline-dark shadow" onClick={() => setActiveTab("students")}>
                👩‍🎓 Manage Students
              </button>
            </Col>
            <Col>
              <button className="w-100 p-3 btn btn-outline-dark shadow" onClick={() => setActiveTab("reports")}>
                📊 View Reports
              </button>
            </Col>
          </Row>


          <Row className="mt-3">
            {/* Recent Activity */}
            <Col md={6}>
              <Card className="p-4 shadow">
                <h5>Recent Activity</h5>
                {recentActivity.map((a) => (
                  <Card key={a.id} className="mb-2 p-3 shadow-1">
                    <strong>{a.text}</strong>
                    <div className="text-muted small">{a.detail} • {a.time}</div>
                  </Card>
                ))}
              </Card>
            </Col>

            {/* System Status */}
            <Col md={6}>
              <Card className="p-4 shadow">
                <h5>System Status</h5>
                <div>Server Status: <span className="text-success">{systemStatus.server}</span></div>
                <div>Database Health: <span className="text-success">{systemStatus.db}</span></div>
                <div>API Response Time: <span className="text-warning">{systemStatus.response}</span></div>
                <div>Storage Usage: <span className="text-primary">{systemStatus.storage}</span></div>
                <div>Active Sessions: <strong>{systemStatus.sessions}</strong></div>
              </Card>
            </Col>
          </Row>
        </>
      )}

      {/* Teachers */}
      {activeTab === "teachers" && (
        <div className="mx-3">
          <h3 className="mb-3 mt-4">Teacher Management</h3>
          {teachers.map((t) => (
            <Card key={t.id} className="p-3 mb-3 quiz shadow-1">
              <div className="d-flex align-items-center">
                <div
                  className="rounded-circle bg-secondary text-white d-flex align-items-center justify-content-center me-3"
                  style={{ width: 50, height: 50 }}
                >
                  {t.name.split(" ").map((n) => n[0]).join("")}
                </div>
                <div style={{ flex: 1 }}>
                  <h5 className="mb-1">{t.name} <Badge bg="success">{t.status}</Badge></h5>
                  <div className="text-secondary small">{t.email} • {t.phone}</div>
                  <div>{t.school} • {t.subject}</div>
                  <div className="mt-1 small">Students: {t.students} • Lessons: {t.lessons} • Since {t.since}</div>
                  <div className="mt-2">
                    {t.skills.map((s) => (
                      <Badge key={s} bg="light" text="dark" className="me-1">{s}</Badge>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Students */}
      {activeTab === "students" && (
        <div className="mx-3">
          <h3 className="mb-3 mt-4">Student Management</h3>
          {students.map((s) => (
            <Card key={s.id} className="p-3 mb-3 quiz shadow-1">
              <div className="d-flex align-items-center">
                <div
                  className="rounded-circle bg-secondary text-white d-flex align-items-center justify-content-center me-3"
                  style={{ width: 50, height: 50 }}
                >
                  {s.name.split(" ").map((n) => n[0]).join("")}
                </div>
                <div style={{ flex: 1 }}>
                  <h5 className="mb-1">{s.name} <Badge bg="success">{s.status}</Badge></h5>
                  <div className="text-secondary small">{s.email}</div>
                  <div>{s.school} • Grade {s.grade}</div>
                  <div className="mt-1 small">Enrolled: {s.enrolled}</div>
                  <div className="mt-2 small">
                    Lessons: {s.lessons.done}/{s.lessons.total} •
                    Quizzes: {s.quizzes.done}/{s.quizzes.total} •
                    Avg Score: {s.avgScore}%
                  </div>
                  <div className="mt-2 small">
                    Parent: {s.parentEmail} • {s.parentPhone}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Reports */}
      {activeTab === "reports" && (
        <div className="px-3 py-2">
          <h4 className="mb-4">Reports</h4>
          <div className="d-flex gap-4">
            <Card className="p-3 shadow-1">
              <h5>📑 Teacher Reports</h5>
              <Button variant="outline-success" onClick={() => downloadReport("teachers")}>
                Download Teacher Report
              </Button>
            </Card>
            <Card className="p-3 shadow-1">
              <h5>📑 Student Reports</h5>
              <Button variant="outline-success" onClick={() => downloadReport("students")}>
                Download Student Report
              </Button>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}

/* -------------------- LANDING -------------------- */
function LandingPage() {
  return (
    <div className="">
      <div className="container text-center pt-5 mt-5">
        <h1>Welcome to School Nabha</h1>
        <p>use the below button to login as Teacher or Admin.</p>
        <p>↓</p>
        <div className="d-flex justify-content-center gap-3 mt-4">
          <Nav.Link as={Link} to="/teacher/login">
            <button className="btn btn-outline-dark px-4">
              Teacher Login
            </button>
          </Nav.Link>

          <Nav.Link as={Link} to="/admin/login">
            <button className="btn btn-outline-dark px-4">
              Admin Login
            </button>
          </Nav.Link>
        </div>
      </div>
    </div>
  );
}

/* -------------------- APP -------------------- */
export default function App() {
  const teacherLoggedIn = !!localStorage.getItem("teacher");
  const adminLoggedIn = !!localStorage.getItem("admin");
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/teacher/login" element={<TeacherLogin />} />
        <Route
          path="/teacher/dashboard"
          element={
            teacherLoggedIn ? <TeacherDashboard /> : <Navigate replace to="/teacher/login" />
          }
        />
        <Route
          path="/teacher/upload-lesson"
          element={
            teacherLoggedIn ? <UploadLessonPage /> : <Navigate replace to="/teacher/login" />
          }
        />
        <Route
          path="/teacher/create-quiz"
          element={
            teacherLoggedIn ? <CreateQuizPage /> : <Navigate replace to="/teacher/login" />
          }
        />


        <Route path="/lesson/:id" element={<LessonPreviewPage />} />
        <Route path="/quizzes/preview/:id" element={<QuizPreviewPage />} />

        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin/dashboard"
          element={
            adminLoggedIn ? <AdminDashboard /> : <Navigate replace to="/admin/login" />
          }
        />
        <Route path="*" element={<Navigate replace to="/" />} />
      </Routes>
    </Router>
  );
}