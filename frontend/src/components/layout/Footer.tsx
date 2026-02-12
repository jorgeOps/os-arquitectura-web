import { Container } from "@/components/ui/Container";

export function Footer() {
  return (
    <footer className="border-t py-8">
      <Container>
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} O.S. Arquitectura. Todos los derechos reservados.
          </p>
          <div className="flex gap-6 text-sm">
            <a href="#" className="hover:underline">
              Instagram
            </a>
            <a href="#" className="hover:underline">
              LinkedIn
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
