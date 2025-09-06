import { EcellLogo } from '@/components/icons/EcellLogo';

type LoadingSpinnerProps = {
  fullPage?: boolean;
};

export function LoadingSpinner({ fullPage = false }: LoadingSpinnerProps) {
    const indicatorContent = (
         <div className="flex flex-col items-center gap-4 text-center">
            <EcellLogo className="h-20 w-20 animate-spin" />
            <p className="font-semibold text-muted-foreground">Loading...</p>
        </div>
    )

  if (fullPage) {
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background/80 backdrop-blur-sm">
       {indicatorContent}
      </div>
    );
  }
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      {indicatorContent}
    </div>
  );
}
