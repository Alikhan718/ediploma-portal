import React from "react";
import {Button, TableCellBody, TableCellHead} from "@src/components";
import {Box, Table, TableBody, TableHead, TableRow, Typography} from "@mui/material";
import {ReactComponent as ArrowDownIcon} from '@src/assets/icons/arrowDown.svg';

interface IProductTable {
	tableHead: any[],
	tableBody: any[],
	menuSections: any[],
	attributeGroups: any[],
	handleSort: any
}

export const ProductTable: React.FC<IProductTable> = (props) => {

	const [defaultAttributeNames, setDefaultAttributeNames] = React.useState<any>({});
	const {tableBody, tableHead, menuSections, attributeGroups} = props;

	const getSectionName = (sections: any, section_id: string): string => {
		const sects = sections.filter((el: any) => el.id === section_id);
		if (sects.length) return sects[0].name;
		return "";
	};
	
	// console.log("attributeGroups", attributeGroups);
	// console.log("defaultAttributeNames", defaultAttributeNames);

	// React.useEffect(() => {
	// 	attributeGroups.map((attributeGroup) => {
	// 		console.log("attributeGroup", attributeGroup);
	// 		if (attributeGroup.attribute_object) {
	// 			attributeGroup.attribute_object.map((attribute: any) => {
	// 				setDefaultAttributeNames({...defaultAttributeNames, attribute: attribute.name});
	// 				console.log(defaultAttributeNames);
	// 			});
	// 		}
	// 	});
	// }, [attributeGroups]);

	return (
		<Table>
			<TableHead>
				<TableRow>
					{tableHead.map(th => (
						<TableCellHead key={th.id}>
							<Button
								onClick={() => {
								}}
								endIcon={<ArrowDownIcon/>}
								variant='contained'
								color='neutral'>
								{th.content}
							</Button>
						</TableCellHead>
					))}
				</TableRow>
			</TableHead>
			<TableBody sx={{margin: '10px',}}>
				{Array.isArray(tableBody) && tableBody.map((tr: any) => (
					<TableRow
						sx={{
							filter: tr.is_deleted ? "grayscale(100%)" : "",
							opacity: tr.is_deleted ? "0.5" : "1"
						}}
						key={`${tr.id}%${tr.menu_id}`}
						// onClick={tr.is_deleted ? undefined : (e: any): void => {
						// 	console.log("menuSections", menuSections, "filter", menuSections.filter((el) => el.id == tr.section))
						// }}
					>
						<TableCellBody>
							<Box display='flex' alignItems={"start"}>

								<img
									style={{
										width: '100%',
										maxWidth: '80px',
										height: "80px",
										display: 'block',
										borderRadius: '10px',
										marginRight: '1rem',
										background: "#eee"
									}}
									src={tr.images}
									alt={tr.name ? tr.name[0].Value : ""}/>

								<Box>
									<Typography variant='h4' fontWeight='600' mb='8px'> {tr.name ? tr.name[0].Value : ""} </Typography>
									<Typography variant='h3'
									            fontWeight='400'> {tr.description ? tr.description[0].Value : ""} </Typography>
									<Typography variant='caption' fontSize="16px" color="darkgreen" fontWeight='400'> Цена: </Typography>
									<Typography variant='caption' fontSize="16px"
									            fontWeight='400'> {tr.price ? tr.price[0].Value : ""} </Typography>
								</Box>
							</Box>

						</TableCellBody>
						<TableCellBody> {menuSections && getSectionName(menuSections, tr.section)}</TableCellBody>
						<TableCellBody> {tr.is_available ? "Валидный" : "Невалидный"}</TableCellBody>
						<TableCellBody> {tr.id}</TableCellBody>
						<TableCellBody> {tr.parent_group_id}</TableCellBody>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
};
