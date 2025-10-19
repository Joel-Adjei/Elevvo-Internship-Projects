import Card from "../components/ui/Card";
import { Briefcase, DollarSign, CheckSquare, TrendingUp, PieChart, List, Clock, Users } from "lucide-react";
import { MOCK_STATS, MOCK_ACTIVITIES,COLORS, MONTHLY_EARNINGS_DATA, TASK_DISTRIBUTION_DATA } from "../utils/data";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RechartsPieChart, Pie, Cell, Legend } from 'recharts';
import { useEffect } from "react";



const Overview = () => {
    const StatCard = ({ title, value, icon: Icon, color }) => (
      <Card className={`flex h-[160px] items-center ${color} border-t-4 border-yellow-400`}>
        <div className="p-3 mr-4 rounded-full bg-yellow-100 text-yellow-600">
          <Icon size={24} />
        </div>
        <div>
          <p className="text-sm font-medium text-slate-500">{title}</p>
          <p className="text-2xl font-bold text-slate-900">{value}</p>
        </div>
      </Card>
    );

    useEffect(()=>{
      document.title = "Overview - Pro Dash";
      window.scrollTo(0,0);
    } ,[]);
  
    const formatCurrency = (amount) => `$${amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}`;
  
    return (
      <div className="space-y-8 pt-4">
        <div className="grid  grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard
            title="Total Projects"
            value={MOCK_STATS.totalProjects}
            icon={Briefcase}
            color="bg-white"
          />
          <StatCard
            title="Earnings This Month"
            value={formatCurrency(MOCK_STATS.earningsThisMonth)}
            icon={DollarSign}
            color="bg-white"
          />
          <StatCard
            title="Tasks Due"
            value={MOCK_STATS.tasksDue}
            icon={CheckSquare}
            color="bg-white"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <h2 className="text-xl font-semibold text-slate-900 mb-4 flex items-center"><TrendingUp size={18} className="mr-2 text-yellow-500"/> Monthly Earning Trend</h2>
            <div style={{ width: '100%', height: 300 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={MONTHLY_EARNINGS_DATA} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f4f8" />
                  <XAxis dataKey="name" stroke="#64748b" />
                  <YAxis stroke="#64748b" tickFormatter={(value) => `$${value/1000}k`} />
                  <Tooltip
                    formatter={(value, name, props) => [formatCurrency(value), name === 'earnings' ? 'Earnings' : 'Projects']}
                    contentStyle={{ backgroundColor: 'rgb(255 255 255 / 90%)', border: '1px solid #e2e8f0', borderRadius: '8px' }}
                  />
                  <Bar dataKey="earnings" name="Earnings" fill="#0F172A" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="projects" name="Projects" fill="#FACC15" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
  
          <Card className="flex flex-col items-center">
            <h2 className="text-xl font-semibold text-slate-900 mb-4 flex items-center"><PieChart size={18} className="mr-2 text-yellow-500"/> Task Distribution</h2>
            <div style={{ width: '100%', height: 300 }}>
              <ResponsiveContainer width="100%" height="100%">
                <RechartsPieChart margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                  <Pie
                    data={TASK_DISTRIBUTION_DATA}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                    nameKey="name"
                  >
                    {TASK_DISTRIBUTION_DATA.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                     formatter={(value, name) => [value, name]}
                     contentStyle={{ backgroundColor: 'rgb(255 255 255 / 90%)', border: '1px solid #e2e8f0', borderRadius: '8px' }}
                  />
                  <Legend layout="horizontal" verticalAlign="bottom" align="center" />
                </RechartsPieChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>
  
        <Card>
          <h2 className="text-xl font-semibold text-slate-900 mb-4 flex items-center"><List size={18} className="mr-2 text-yellow-500"/> Recent Activity</h2>
          <div className="space-y-4">
            {MOCK_ACTIVITIES.map((activity, index) => (
              <div key={index} className="flex items-start p-3 border-b border-slate-100 last:border-b-0 hover:bg-slate-50 rounded-lg transition-colors duration-150">
                <div className="flex-shrink-0 p-2 rounded-full bg-slate-50 mr-4">
                  <activity.icon size={18} className={activity.color} />
                </div>
                <div className="flex-grow">
                  <p className="text-sm text-slate-800">{activity.text}</p>
                  <p className="text-xs text-slate-500 mt-0.5 flex items-center"><Clock size={12} className="mr-1"/> {activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    );
};
  
export default Overview;