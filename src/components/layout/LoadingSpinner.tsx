import { EcellLogo } from '@/components/icons/EcellLogo';
import { Progress } from '@/components/ui/progress';

type LoadingIndicatorProps = {
  fullPage?: boolean;
};

export function LoadingIndicator({ fullPage = false }: LoadingIndicatorProps) {
    const indicatorContent = (
         <div className="flex w-full max-w-sm flex-col items-center gap-4">
          <div className='flex items-center gap-4'>
            <EcellLogo className="h-16 w-16" />
            <div className='flex flex-col text-left w-64'>
                <p className="text-lg font-bold text-foreground">E-Cell IICT</p>
                <p className="text-muted-foreground">Processing your request...</p>
            </div>
          </div>
          <Progress value={50} className="w-full animate-pulse" />
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
