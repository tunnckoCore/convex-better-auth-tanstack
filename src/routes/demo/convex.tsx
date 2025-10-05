import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery } from "convex/react";
import { Check, Circle, Plus, Trash2 } from "lucide-react";
import { useCallback, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { api } from "@/convex/_generated/api";
import type { Id } from "@/convex/_generated/dataModel";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/demo/convex")({
  ssr: false,
  component: ConvexTodos,
});

function ConvexTodos() {
  const todos = useQuery(api.todos.list);
  const addTodo = useMutation(api.todos.add);
  const toggleTodo = useMutation(api.todos.toggle);
  const removeTodo = useMutation(api.todos.remove);

  const [newTodo, setNewTodo] = useState("");

  const handleAddTodo = useCallback(async () => {
    if (newTodo.trim()) {
      await addTodo({ text: newTodo.trim() });
      setNewTodo("");
    }
  }, [addTodo, newTodo]);

  const handleToggleTodo = useCallback(
    async (id: Id<"todos">) => {
      await toggleTodo({ id });
    },
    [toggleTodo]
  );

  const handleRemoveTodo = useCallback(
    async (id: Id<"todos">) => {
      await removeTodo({ id });
    },
    [removeTodo]
  );

  const completedCount = todos?.filter((todo) => todo.completed).length || 0;
  const totalCount = todos?.length || 0;

  return (
    <div
      className="flex min-h-screen items-center justify-center p-4"
      style={{
        background:
          "linear-gradient(135deg, #667a56 0%, #8fbc8f 25%, #90ee90 50%, #98fb98 75%, #f0fff0 100%)",
      }}
    >
      <div className="w-full max-w-2xl space-y-6">
        {/* Header Card */}
        <Card className="border-green-200/50 bg-white/95 shadow-2xl backdrop-blur-sm">
          <CardHeader className="text-center">
            <CardTitle className="font-bold text-4xl text-green-800">
              Convex Todos
            </CardTitle>
            <CardDescription className="text-green-600 text-lg">
              Powered by real-time sync
            </CardDescription>
            {totalCount > 0 && (
              <div className="mt-4 flex justify-center space-x-6 text-sm">
                <span className="font-medium text-green-700">
                  {completedCount} completed
                </span>
                <span className="text-muted-foreground">
                  {totalCount - completedCount} remaining
                </span>
              </div>
            )}
          </CardHeader>
        </Card>

        {/* Add Todo Card */}
        <Card className="border-green-200/50 bg-white/95 shadow-xl backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex gap-3">
              <Input
                className="flex-1 border-green-200 bg-white/80 transition-colors focus:border-green-400"
                onChange={(e) => setNewTodo(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleAddTodo();
                  }
                }}
                placeholder="What needs to be done?"
                value={newTodo}
              />
              <Button
                className="bg-gradient-to-r from-green-500 to-green-600 shadow-lg hover:from-green-600 hover:to-green-700 hover:shadow-xl"
                disabled={!newTodo.trim()}
                onClick={handleAddTodo}
              >
                <Plus className="mr-2 h-4 w-4" />
                Add
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Todos List */}
        <Card className="border-green-200/50 bg-white/95 shadow-xl backdrop-blur-sm">
          {todos ? (
            todos.length === 0 ? (
              <CardContent className="p-12 text-center">
                <Circle className="mx-auto mb-4 h-12 w-12 text-green-300" />
                <CardTitle className="mb-2 text-green-800 text-xl">
                  No todos yet
                </CardTitle>
                <CardDescription className="text-green-600">
                  Add your first todo above to get started!
                </CardDescription>
              </CardContent>
            ) : (
              <CardContent className="p-0">
                {todos.map((todo, index) => (
                  <div key={todo._id}>
                    <div
                      className={cn(
                        "flex items-center gap-4 p-4 transition-colors hover:bg-green-50/50",
                        todo.completed && "opacity-75"
                      )}
                      style={{
                        animationDelay: `${index * 50}ms`,
                      }}
                    >
                      <Button
                        className={cn(
                          "h-6 w-6 flex-shrink-0 rounded-full border-2 p-0 transition-all duration-200",
                          todo.completed
                            ? "border-green-500 bg-green-500 text-white hover:bg-green-600"
                            : "border-green-300 bg-transparent text-transparent hover:border-green-400 hover:text-green-400"
                        )}
                        onClick={() => handleToggleTodo(todo._id)}
                        size="sm"
                        variant="outline"
                      >
                        <Check className="h-3 w-3" />
                      </Button>

                      <span
                        className={cn(
                          "flex-1 text-lg transition-all duration-200",
                          todo.completed
                            ? "text-muted-foreground line-through"
                            : "text-foreground"
                        )}
                      >
                        {todo.text}
                      </span>

                      <Button
                        className="flex-shrink-0 text-red-400 hover:bg-red-50 hover:text-red-600"
                        onClick={() => handleRemoveTodo(todo._id)}
                        size="sm"
                        variant="ghost"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    {index < todos.length - 1 && <Separator />}
                  </div>
                ))}
              </CardContent>
            )
          ) : (
            <CardContent className="p-8 text-center">
              <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-2 border-green-500 border-b-transparent" />
              <CardDescription className="text-green-600">
                Loading todos...
              </CardDescription>
            </CardContent>
          )}
        </Card>

        {/* Footer */}
        <div className="text-center">
          <p className="text-green-700/80 text-sm">
            Built with Convex • Real-time updates • Always in sync
          </p>
        </div>
      </div>
    </div>
  );
}
