import { Button } from "@/components/ui/button"
import { Download, FileText } from "lucide-react"

export function Resume() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl rounded-2xl border border-border bg-card p-8 text-center shadow-lg sm:p-12">
          <div className="mb-6 inline-flex rounded-full bg-primary/10 p-4">
            <FileText className="h-12 w-12 text-primary" />
          </div>
          <h2 className="mb-4 text-3xl font-bold text-foreground sm:text-4xl">Download My Resume</h2>
          <p className="mb-8 text-pretty text-lg text-muted-foreground">
            Get a detailed overview of my experience, skills, and education. Available in PDF format for your
            convenience.
          </p>
          <Button size="lg" className="group" asChild>
            <a href="/resume_final.pdf" download>
              <Download className="mr-2 h-5 w-5 transition-transform group-hover:translate-y-1" />
              Download Resume (PDF)
            </a>
          </Button>
        </div>
      </div>
    </section>
  )
}


// className="cursor-pointer group border-2 border-primary/20 bg-transparent backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:border-primary hover:bg-primary/10"