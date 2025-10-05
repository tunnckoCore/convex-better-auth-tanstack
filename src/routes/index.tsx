import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Route as RouteIcon,
  Server,
  Shield,
  Sparkles,
  Waves,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const Route = createFileRoute("/")({
  component: App,
});

function App() {
  const features = [
    {
      icon: <Zap className="h-12 w-12 text-primary" />,
      title: "Powerful Server Functions",
      description:
        "Write server-side code that seamlessly integrates with your client components. Type-safe, secure, and simple.",
    },
    {
      icon: <Server className="h-12 w-12 text-primary" />,
      title: "Flexible Server Side Rendering",
      description:
        "Full-document SSR, streaming, and progressive enhancement out of the box. Control exactly what renders where.",
    },
    {
      icon: <RouteIcon className="h-12 w-12 text-primary" />,
      title: "API Routes",
      description:
        "Build type-safe API endpoints alongside your application. No separate backend needed.",
    },
    {
      icon: <Shield className="h-12 w-12 text-primary" />,
      title: "Strongly Typed Everything",
      description:
        "End-to-end type safety from server to client. Catch errors before they reach production.",
    },
    {
      icon: <Waves className="h-12 w-12 text-primary" />,
      title: "Full Streaming Support",
      description:
        "Stream data from server to client progressively. Perfect for AI applications and real-time updates.",
    },
    {
      icon: <Sparkles className="h-12 w-12 text-primary" />,
      title: "Next Generation Ready",
      description:
        "Built from the ground up for modern web applications. Deploy anywhere JavaScript runs.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      <section className="relative overflow-hidden px-6 py-20 text-center">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-primary/5 to-accent/10" />
        <div className="relative mx-auto max-w-5xl">
          <div className="mb-6 flex items-center justify-center gap-6">
            <img
              alt="TanStack Logo"
              className="h-24 w-24 md:h-32 md:w-32"
              src="/tanstack-circle-logo.png"
            />
            <h1 className="font-bold text-6xl text-white md:text-7xl">
              <span className="text-muted-foreground">TANSTACK</span>{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                START
              </span>
            </h1>
          </div>
          <p className="mb-4 font-light text-2xl text-muted-foreground md:text-3xl">
            The framework for next generation AI applications
          </p>
          <p className="mx-auto mb-8 max-w-3xl text-lg text-muted-foreground">
            Full-stack framework powered by TanStack Router for React and Solid.
            Build modern applications with server functions, streaming, and type
            safety.
          </p>
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-center gap-2">
              <Button asChild className="shadow-lg" size="lg">
                <a
                  href="https://tanstack.com/start"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Documentation
                </a>
              </Button>
              <Button asChild className="shadow-lg" size="lg">
                <Link to="/sign-up">Sign Up [failing]</Link>
              </Button>
            </div>
            <p className="mt-2 text-muted-foreground text-sm">
              Begin your TanStack Start journey by editing{" "}
              <code className="rounded bg-muted px-2 py-1 text-primary">
                /src/routes/index.tsx
              </code>
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <Card
              className="group transition-all duration-300 hover:shadow-lg hover:shadow-primary/10"
              key={feature.title}
            >
              <CardHeader>
                <div className="mb-4">{feature.icon}</div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
