export interface OrderStatusProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	children?: React.ReactNode;
	appearance?: 'ready' | 'accepted' | 'new' | 'delivered' | 'courier';
}