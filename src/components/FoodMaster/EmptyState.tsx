
import { Database } from "lucide-react";

export const EmptyState = () => {
  return (
    <div className="text-center py-12">
      <Database className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
      <h3 className="text-xl font-semibold mb-2">No foods found</h3>
      <p className="text-muted-foreground">
        Try adjusting your search terms or category filter
      </p>
    </div>
  );
};
