import { useMutation, useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { Plus, RefreshCw } from "lucide-react";
import { useCallback, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";

export const Route = createFileRoute("/demo/tanstack-query")({
  component: TanStackQueryDemo,
});

type Todo = {
  id: number;
  name: string;
};

function TanStackQueryDemo() {
  const { data, refetch, isLoading, isFetching } = useQuery<Todo[]>({
    queryKey: ["todos"],
    queryFn: () => fetch("/demo/api/tq-todos").then((res) => res.json()),
    initialData: [],
  });

  const { mutate: addTodo, isPending } = useMutation({
    mutationFn: (xtodo: string) =>
      fetch("/demo/api/tq-todos", {
        method: "POST",
        body: JSON.stringify(xtodo),
      }).then((res) => res.json()),
    onSuccess: () => refetch(),
  });

  const [todo, setTodo] = useState("");

  const submitTodo = useCallback(async () => {
    await addTodo(todo);
    setTodo("");
  }, [addTodo, todo]);

  return (
    <div
      className="flex min-h-screen items-center justify-center p-4"
      style={{
        backgroundImage:
          "radial-gradient(50% 50% at 80% 20%, #3B021F 0%, #7B1028 60%, #1A000A 100%)",
      }}
    >
      <div className="w-full max-w-2xl space-y-6">
        <Card className="border-white/10 bg-black/50 text-white shadow-xl backdrop-blur-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">TanStack Query</CardTitle>
            <CardDescription className="text-white/80">
              Server State Management with Caching & Synchronization
            </CardDescription>
            <div className="flex items-center justify-center gap-2">
              <Badge className="w-fit" variant="secondary">
                {data?.length || 0} todos
              </Badge>
              {isFetching && (
                <Badge className="w-fit" variant="outline">
                  <RefreshCw className="mr-1 h-3 w-3 animate-spin" />
                  Syncing
                </Badge>
              )}
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              {isLoading ? (
                <div className="space-y-2">
                  {[...new Array(3)].map((_, i) => (
                    <Card
                      className="border-white/20 bg-white/10"
                      key={`skeleton-${Math.random()}-${Date.now()}-${i}`}
                    >
                      <CardContent className="p-3">
                        <Skeleton className="h-6 w-full bg-white/20" />
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <>
                  {data?.map((t) => (
                    <Card
                      className="border-white/20 bg-white/10 shadow-md backdrop-blur-sm"
                      key={t.id}
                    >
                      <CardContent className="p-3">
                        <span className="text-lg text-white">{t.name}</span>
                      </CardContent>
                    </Card>
                  ))}
                  {data?.length === 0 && (
                    <Card className="border-white/20 bg-white/5">
                      <CardContent className="p-6 text-center">
                        <CardDescription className="text-white/60">
                          No todos yet. Add one below to get started!
                        </CardDescription>
                      </CardContent>
                    </Card>
                  )}
                </>
              )}
            </div>

            <div className="flex gap-2">
              <Input
                className="border-white/20 bg-white/10 text-white placeholder:text-white/60 focus:border-transparent focus:ring-2 focus:ring-blue-400"
                disabled={isPending}
                onChange={(e) => setTodo(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !isPending) {
                    submitTodo();
                  }
                }}
                placeholder="Enter a new todo..."
                value={todo}
              />
              <Button
                className="bg-blue-500 hover:bg-blue-600 disabled:bg-blue-500/50"
                disabled={todo.trim().length === 0 || isPending}
                onClick={submitTodo}
              >
                {isPending ? (
                  <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Plus className="mr-2 h-4 w-4" />
                )}
                {isPending ? "Adding..." : "Add"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
