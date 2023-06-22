export interface FilterProps {
	title?: string;
	onOpen: () => void,
	search?: string,
	setSearch?: (s: string) => void,
	only_active?: boolean,
	setOnlyActive?: (b: boolean) => void;
};