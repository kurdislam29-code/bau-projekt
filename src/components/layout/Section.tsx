import { Container } from "@/components/layout/Container";
import { cn } from "@/lib/cn";

type ContainerProps = React.ComponentProps<typeof Container>;

export function Section({
  id,
  className,
  children,
  ...props
}: ContainerProps & { id?: string }) {
  return (
    <section id={id} className={cn("py-16 md:py-20", className)}>
      <Container {...props}>{children}</Container>
    </section>
  );
}
