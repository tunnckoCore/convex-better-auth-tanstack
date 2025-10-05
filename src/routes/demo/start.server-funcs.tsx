import fs from "node:fs/promises";
import { createFileRoute, useRouter } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { Plus } from "lucide-react";
import { useCallback, useState } from "react";
import { z } from "zod";
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

const filePath = "todos.json";

async function readTodos(): Promise<{ id: number; name: string }[]> {
  return JSON.parse(
    await fs.readFile(filePath, "utf-8").catch(() =>
      JSON.stringify(
        [
          { id: 1, name: "Get groceries" },
          { id: 2, name: "Buy a new phone" },
        ],
        null,
        2
      )
    )
  );
}

const getTodos = createServerFn({
  method: "GET",
}).handler(async () => await readTodos());

const addTodo = createServerFn({ method: "POST" })
  .inputValidator(z.string().min(1).max(100))
  .handler(async ({ data }) => {
    const todos = await readTodos();
    todos.push({ id: todos.length + 1, name: data });
    await fs.writeFile(filePath, JSON.stringify(todos, null, 2));
    return todos;
  });

export const Route = createFileRoute("/demo/start/server-funcs")({
  component: Home,
  loader: async () => await getTodos(),
});

function Home() {
  const router = useRouter();
  let todos = Route.useLoaderData();

  const [todo, setTodo] = useState("");

  const submitTodo = useCallback(async () => {
    todos = await addTodo({ data: todo });
    setTodo("");
    router.invalidate();
  }, [addTodo, todo]);

  return (
    <div
      className="flex min-h-screen items-center justify-center p-4"
      style={{
        backgroundImage:
          "radial-gradient(50% 50% at 20% 60%, #23272a 0%, #18181b 50%, #000000 100%)",
      }}
    >
      <div className="w-full max-w-2xl space-y-6">
        <Card className="border-white/10 bg-black/50 text-white shadow-xl backdrop-blur-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Start Server Functions</CardTitle>
            <CardDescription className="text-white/80">
              Todo Example with Server-Side Persistence
            </CardDescription>
            <Badge className="mx-auto w-fit" variant="secondary">
              {todos?.length || 0} todos
            </Badge>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              {todos?.map((t) => (
                <Card
                  className="border-white/20 bg-white/10 shadow-md backdrop-blur-sm"
                  key={t.id}
                >
                  <CardContent className="p-3">
                    <span className="text-lg text-white">{t.name}</span>
                  </CardContent>
                </Card>
              ))}
              {todos?.length === 0 && (
                <Card className="border-white/20 bg-white/5">
                  <CardContent className="p-6 text-center">
                    <CardDescription className="text-white/60">
                      No todos yet. Add one below to get started!
                    </CardDescription>
                  </CardContent>
                </Card>
              )}
            </div>

            <div className="flex gap-2">
              <Input
                className="border-white/20 bg-white/10 text-white placeholder:text-white/60 focus:border-transparent focus:ring-2 focus:ring-blue-400"
                onChange={(e) => setTodo(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    submitTodo();
                  }
                }}
                placeholder="Enter a new todo..."
                value={todo}
              />
              <Button
                className="bg-blue-500 hover:bg-blue-600 disabled:bg-blue-500/50"
                disabled={todo.trim().length === 0}
                onClick={submitTodo}
              >
                <Plus className="mr-2 h-4 w-4" />
                Add
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
