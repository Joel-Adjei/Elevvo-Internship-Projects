import { Briefcase, CheckSquare, Clock, DollarSign, Users,  } from "lucide-react";
import profilePic from "../assets/Mine.jpg";

export const MOCK_STATS = {
    totalProjects: 18,
    earningsThisMonth: 4500.75,
    tasksDue: 5,
};
  
export const MOCK_PROJECTS = [
    { id: 1, name: 'E-commerce Redesign', client: 'Aperture Systems', deadline: '2024-11-15', status: 'In Progress', progress: 65, totalCost: 7500 },
    { id: 2, name: 'Marketing Copy Audit', client: 'Black Mesa Corp', deadline: '2024-10-30', status: 'Pending Review', progress: 90, totalCost: 1200 },
    { id: 3, name: 'Mobile App Wireframes', client: 'Global Dynamics', deadline: '2024-12-05', status: 'Completed', progress: 100, totalCost: 3200 },
    { id: 4, name: 'SaaS Platform Backend', client: 'Innovate Solutions', deadline: '2025-01-20', status: 'In Progress', progress: 30, totalCost: 15000 },
    { id: 5, name: 'Brand Identity Guide', client: 'Future Labs', deadline: '2024-10-18', status: 'Late', progress: 80, totalCost: 800 },
    { id: 6, name: 'Blog Content Strategy', client: 'Blue Sky Agency', deadline: '2024-11-01', status: 'Completed', progress: 100, totalCost: 2100 },
];
  
export const MOCK_ACTIVITIES = [
    { id: 1, text: 'Invoice #0018 for $7,500 approved.', icon: DollarSign, color: 'text-green-500', time: '5 mins ago' },
    { id: 2, text: 'New task added to E-commerce Redesign.', icon: CheckSquare, color: 'text-yellow-500', time: '1 hour ago' },
    { id: 3, text: 'Client "Black Mesa" viewed project status.', icon: Users, color: 'text-blue-500', time: '3 hours ago' },
    { id: 4, text: 'Deadline update for SaaS Platform Backend.', icon: Clock, color: 'text-red-500', time: '1 day ago' },
    { id: 5, text: 'You completed Mobile App Wireframes.', icon: Briefcase, color: 'text-indigo-500', time: '2 days ago' },
];
  
export const MONTHLY_EARNINGS_DATA = [
    { name: 'Jul', earnings: 3500, projects: 4 },
    { name: 'Aug', earnings: 4200, projects: 5 },
    { name: 'Sep', earnings: 5100, projects: 6 },
    { name: 'Oct', earnings: 4500, projects: 5 },
];
  
export const TASK_DISTRIBUTION_DATA = [
    { name: 'Design', value: 400 },
    { name: 'Development', value: 300 },
    { name: 'Content', value: 200 },
    { name: 'Admin', value: 100 },
];

export const COLORS = ['#FACC15', '#0F172A', '#60A5FA', '#10B981']; // Gold, Navy, Blue, Green


export const USER_PROFILE = {
    name: 'Joel Adjei',
    email: 'joeladjei@email.com',
    password: '',
    profileImage: profilePic,
};