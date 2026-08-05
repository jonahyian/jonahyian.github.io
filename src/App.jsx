import { Button } from "@/components/ui/button"
import { Sparkles, GitBranch } from "lucide-react"

export default function App() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center p-6 space-y-6">
      <div className="flex items-center space-x-2 text-primary">
        <Sparkles className="w-8 h-8 animate-pulse text-indigo-500" />
        <h1 className="text-3xl font-bold tracking-tight">Clean React + shadcn/ui</h1>
      </div>
      <p className="text-muted-foreground text-center max-w-md">
        Clean initial template with Vite, React 19, Tailwind CSS, and shadcn/ui. Ready for development!
      </p>
      <div className="flex items-center space-x-4">
        <Button onClick={() => alert("shadcn/ui Button Works!")}>
          Click Me
        </Button>
        <Button variant="outline" asChild>
          <a href="https://github.com/jonahyian/jonahyian.github.io" target="_blank" rel="noreferrer">
            <GitBranch className="w-4 h-4 mr-2" /> GitHub
          </a>
        </Button>
      </div>
    </div>
  )
}
