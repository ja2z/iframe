interface IframeComponentProps {
    src: string;
    title: string;
    className?: string;
    onLoad?: () => void;
    onError?: (error: string) => void;
}
declare const IframeComponent: ({ src, title, className, onLoad, onError }: IframeComponentProps) => import("react/jsx-runtime").JSX.Element;
export default IframeComponent;
