// src/components/dashboard/ActivityGraph.tsx
import { walletStore } from '@/store/walletStore';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";


const ActivityGraph = () => {
 const getWeeklyActivity = () => {
   const weeks = [];
   const now = new Date();
   
   for (let w = 0; w < 52; w++) {
     const weekStart = new Date(now);
     weekStart.setDate(now.getDate() - (now.getDay() + 7 * w));
     weekStart.setHours(0,0,0,0);
     
     const weekEnd = new Date(weekStart);
     weekEnd.setDate(weekStart.getDate() + 7);

     const transactions = walletStore.getTransactions().filter(t => {
       const tDate = new Date(t.timestamp);
       return tDate >= weekStart && tDate < weekEnd;
     });
     
     const total = transactions.reduce((sum, t) => sum + t.amount, 0);
     weeks.push({ start: weekStart, total });
   }
   return weeks.reverse();
 };

 const getActivityLevel = (total: number) => {
   if (total === 0) return 0;
   if (total <= 10) return 1;
   if (total <= 20) return 2; 
   if (total <= 30) return 3;
   return 4;
 };

 return (
   <Card>
     <CardHeader>
       <CardTitle>Weekly Activity</CardTitle>
     </CardHeader>
     <CardContent>
       <div className="grid grid-cols-7 gap-1 p-4">
         {getWeeklyActivity().map((week, i) => (
           <div
             key={i}
             className={`w-3 h-3 rounded-sm border border-gray-200 ${
               getActivityLevel(week.total) === 0 ? 'bg-gray-100' :
               getActivityLevel(week.total) === 1 ? 'bg-green-200' :
               getActivityLevel(week.total) === 2 ? 'bg-green-400' :
               getActivityLevel(week.total) === 3 ? 'bg-green-600' :
               'bg-green-800'
             }`}
             title={`Week of ${week.start.toLocaleDateString()}: ${week.total} points`}
           />
         ))}
       </div>
     </CardContent>
   </Card>
 );
};

export default ActivityGraph;
