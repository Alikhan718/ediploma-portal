import React from "react";

export interface LabelProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	label: string;
	helper?: string;
}