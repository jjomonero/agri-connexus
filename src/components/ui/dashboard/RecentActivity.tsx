import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

const activities = [
  {
    id: 1,
    type: "contract",
    title: "New Contract Signed",
    description: "Contract #123 with Farm Fresh Co.",
    time: "2 hours ago",
  },
  {
    id: 2,
    type: "order",
    title: "Order Delivered",
    description: "Order #456 delivered to Green Market",
    time: "5 hours ago",
  },
  {
    id: 3,
    type: "user",
    title: "New Supplier Registered",
    description: "Organic Farms Ltd. joined the platform",
    time: "1 day ago",
  },
];

const RecentActivity = () => {
  return (
    <Card className="p-6">
      <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
      <ScrollArea className="h-[300px]">
        <div className="space-y-4">
          {activities.map((activity) => (
            <div
              key={activity.id}
              className="flex items-start gap-4 p-3 hover:bg-gray-50 rounded-lg transition-colors"
            >
              <div className="flex-1">
                <h3 className="font-medium">{activity.title}</h3>
                <p className="text-sm text-gray-500">{activity.description}</p>
                <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </Card>
  );
};

export default RecentActivity;